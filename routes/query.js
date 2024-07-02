const express = require("express");
const router = express.Router();
const { requestWSSchema, responseWSSchema } = require('../validators/validation');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const getForeignKey = (baseTable, relatedTable) => {
    const relations = {
        profile: {
            company: 'company_id'
        },
        job: {
            company: 'company_id'
        },
        // Adicione outras relações aqui conforme necessário
    };
    return relations[baseTable] ? relations[baseTable][relatedTable] : null;
};

const dynamicQuery = async (requestData) => {
    const { baseTable, tables, columns, aggregation, aggregationColumn, filter } = requestData;

    // Base query
    let baseQuery = {
        select: columns.reduce((acc, column) => {
            acc[column.split('.').pop()] = true;
            return acc;
        }, {})
    };

    // Filters
    if (filter && filter.length > 0) {
        baseQuery.where = filter.reduce((acc, f) => {
            const [table, column] = f.column.split('.');
            if (!acc[table]) {
                acc[table] = {};
            }
            if (f.gt !== undefined) acc[table][column] = { gt: f.gt };
            if (f.gte !== undefined) acc[table][column] = { gte: f.gte };
            if (f.lt !== undefined) acc[table][column] = { lt: f.lt };
            if (f.lte !== undefined) acc[table][column] = { lte: f.lte };
            if (f.equal !== undefined) acc[table][column] = f.equal;
            return acc;
        }, {});
    }

    // Adjusting the `where` clause to use foreign keys
    for (const table of tables) {
        const foreignKey = getForeignKey(baseTable, table);
        if (foreignKey && baseQuery.where && baseQuery.where[table]) {
            const relatedIds = await prisma[table].findMany({
                where: baseQuery.where[table],
                select: { id: true }
            });
            baseQuery.where[foreignKey] = {
                in: relatedIds.map(item => item.id)
            };
            delete baseQuery.where[table];
        }
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

    // Execute base query
    const baseResult = await prisma[baseTable].findMany(baseQuery);

    // Include related tables
    if (tables && tables.length > 0) {
        for (let i = 0; i < baseResult.length; i++) {
            for (const table of tables) {
                const foreignKey = getForeignKey(table, baseTable);
                if (foreignKey) {
                    const relatedData = await prisma[table].findMany({
                        where: {
                            [foreignKey]: baseResult[i].id
                        }
                    });
                    baseResult[i][table] = relatedData;
                }
            }
        }
    }

    return baseResult;
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
                    label: `${requestData.baseTable}.${key}`
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
