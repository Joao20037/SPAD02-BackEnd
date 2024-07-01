
const Joi = require('joi');

const filterSchema = Joi.object({
    column: Joi.string().required(),
    gt: Joi.alternatives().try(Joi.string(), Joi.number()),
    gte: Joi.alternatives().try(Joi.string(), Joi.number()),
    lt: Joi.alternatives().try(Joi.string(), Joi.number()),
    lte: Joi.alternatives().try(Joi.string(), Joi.number()),
    equal: Joi.alternatives().try(Joi.string(), Joi.number()),
});


const requestWSSchema = Joi.object({
    baseTable: Joi.string().required(),
    tables: Joi.array().items(Joi.string()).required(),
    columns: Joi.array().items(Joi.string()).required(),
    aggregation: Joi.string(),
    aggregationColumn: Joi.string(),
    filter: Joi.array().items(filterSchema)
});


const responseWSSchema = Joi.object({
    tableContent: Joi.object({
        headers: Joi.array().items(Joi.string()).required(),
        rows: Joi.array().items(Joi.object().pattern(Joi.string(), Joi.alternatives().try(Joi.string(), Joi.number()))).required()
    }).required()
});

module.exports = {
    requestWSSchema,
    responseWSSchema
};
