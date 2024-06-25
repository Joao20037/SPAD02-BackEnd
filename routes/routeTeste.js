const express = require("express")
const router = express.Router()

// route url/test/
router.get('/', (req, res) => {
    res.send("<h1>Route teste page</h1>");
});


// exportando rota
module.exports = router;