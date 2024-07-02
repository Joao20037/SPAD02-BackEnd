const express = require("express");
const router = express.Router();
const { requestWSSchema, responseWSSchema } = require('../validators/validation');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();


const dynamicQuery = async (requestData) => {
    const { baseTable, tables, columns, aggregation, aggregationColumn, filter } = requestData;

    // Base query
    let query = prisma[baseTable].findMany({
        select: columns.reduce((acc, column) => {
            acc[column] = true;
            return acc;
        }, {})
    });

    // Joins
    if (tables && tables.length > 0) {
        tables.forEach(table => {
            if (table === 'company') {
                query.include = { company: true };
            } else if (table === 'job') {
                query.include = { job: true };
            } else if (table === 'profile') {
                query.include = { profile: true };
            }
        });
    }

    // Filters
    if (filter && filter.length > 0) {
        query.where = filter.reduce((acc, f) => {
            if (f.gt !== undefined) acc[f.column] = { gt: f.gt };
            if (f.gte !== undefined) acc[f.column] = { gte: f.gte };
            if (f.lt !== undefined) acc[f.column] = { lt: f.lt };
            if (f.lte !== undefined) acc[f.column] = { lte: f.lte };
            if (f.equal !== undefined) acc[f.column] = f.equal;
            return acc;
        }, {});
    }

    // Aggregation
    if (aggregation && aggregationColumn) {
        const aggregationColumnAlias = aggregationColumn.split('.').pop();
        const result = await prisma[baseTable].aggregate({
            _count: { [aggregationColumnAlias]: true },
            _sum: { [aggregationColumnAlias]: true },
            _avg: { [aggregationColumnAlias]: true },
            _min: { [aggregationColumnAlias]: true },
            _max: { [aggregationColumnAlias]: true },
        });
        return result;
    }

    return prisma[baseTable].findMany(query);
};

router.post('/', async (req, res) => {
    const { error, value: requestData } = requestWSSchema.validate(req.body);

    res.set('Access-Control-Allow-Origin', '*');

    if (error) {
        return res.status(400).json({ error: error.details[0].message });
    }

    try {
        const rows = await dynamicQuery(requestData);

        if (rows.length === 0) {
            return res.json({ message: 'Nenhum resultado encontrado.' });
        }

        const responseData = {
            tableContent: {
                headers: Object.keys(rows[0]).map(key => ({
                    key: key,
                    label: `${baseTable}.${key}`
                })),
                rows: rows
            }
        };

        res.json(responseData);
    } catch (err) {
        console.error('Database query error:', err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

module.exports = router;
