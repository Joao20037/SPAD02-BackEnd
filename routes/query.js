const express = require("express");
const router = express.Router();
const { requestWSSchema, responseWSSchema } = require('../validators/validation');
const mysql = require('mysql2/promise');

const pool = mysql.createPool({
    host: '25.59.203.106',
    user: 'unifei',
    database: 'linkedin_data',
    password: 'unifei',
    port: 3306,
});

const dynamicQuery = (requestData) => {
    const { baseTable, tables, columns, aggregation, aggregationColumn, filter } = requestData;
    console.log("Aopa");

    // base da query, primeiro FROM
    let query = `SELECT ${columns.join(', ')} FROM ${baseTable}`;

    // joins
    if (tables && tables.length > 0) {
        tables.forEach(table => {
            if (table === 'company') {
                query += ` JOIN company ON ${baseTable}.company_id = company.id`;
            } else if (table === 'job') {
                if (baseTable === 'company'){
                    query += ` JOIN job ON ${baseTable}.id = job.company_id`;
                } else {
                    query += ` JOIN job ON ${baseTable}.company_id = job.company_id`;
                }
            } else if (table === 'profile') {
                if (baseTable === 'company'){
                    query += ` JOIN profile ON ${baseTable}.id = profile.company_id`;
                } else {
                    query += ` JOIN profile ON ${baseTable}.company_id = profile.company_id`; // Alsip, IL
                }
            }
        });
    }

    // filtros
    if (filter && filter.length > 0) {
        const filterConditions = filter.map(f => {
            const conditions = [];
            if (f.gt !== undefined) conditions.push(`${f.column} > ${f.gt}`); // maior que
            if (f.gte !== undefined) conditions.push(`${f.column} >= ${f.gte}`); // maior ou igual que
            if (f.lt !== undefined) conditions.push(`${f.column} < ${f.lt}`); // menor que
            if (f.lte !== undefined) conditions.push(`${f.column} <= ${f.lte}`); // menor ou igual que
            if (f.equal !== undefined) conditions.push(`${f.column} = '${f.equal}'`); // igual
            return conditions.join(' AND ');
        });
        query += ` WHERE ${filterConditions.join(' AND ')}`;
    }

    // agregação
    if (aggregation && aggregationColumn) {
        const aggregationColumnAlias = aggregationColumn.split('.').pop();
        query = `SELECT ${aggregation}(subquery.${aggregationColumnAlias}) AS result FROM (${query}) AS subquery`;
    }

    return query;
};

router.post('/', async (req, res) => {
    console.log("to aqui");
    console.log("Corpo da requisição:", req.body);
    const { error, value: requestData } = requestWSSchema.validate(req.body);

    if (error) {
        return res.status(400).json({ error: error.details[0].message });
    }

    try {
        console.log("eu tentei");
        const query = dynamicQuery(requestData);
        console.log(query);

        const [rows, fields] = await pool.query(query);

        const responseData = {
        tableContent: {
            headers: fields.map(field => field.name),
            rows: rows
        }
        };

        const { error: responseError } = responseWSSchema.validate(responseData);
        if (responseError) {
        console.error('Invalid response data:', responseError.details[0].message);
        return res.status(500).json({ error: 'Internal Server Error' });
        }

        res.json(responseData);
    } catch (err) {
        console.error('Database query error:', err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

module.exports = router;
