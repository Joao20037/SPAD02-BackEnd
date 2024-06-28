const express = require("express")
const router = express.Router()
const { requestWSSchema, responseWSSchema } = require('../validators/validation');

// route url/query/
router.get('/', (req, res) => {

    const { error, value: requestData } = requestWSSchema.validate(req.body);

    if (error) {
        return res.status(400).json({ error: error.details[0].message });
    }

    console.log(req.body);
    // Descomentar todo codigo quando funcao tiver pronta
    // const responseData = FUNCAO DO GABRIEL

    //const { error: responseError } = responseWSSchema.validate(responseData);

    // if (responseError) {
    //     console.error('Invalid response data:', responseError.details[0].message);
    //     return res.status(500).json({ error: 'Internal Server Error' });
    // }

    // res.json(responseData);
});


// exportando rota
module.exports = router;