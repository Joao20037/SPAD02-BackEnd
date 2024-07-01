const express = require("express")
const router = express.Router()

// route url/test/
router.get('/', (req, res) => {
    const json_send = {id:10};
    res.json(json_send);
    console.log(json_send);
});


// exportando rota
module.exports = router;