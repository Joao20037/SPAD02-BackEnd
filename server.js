const express = require('express');
const app = express();

// Pagina root
app.get('/', (req, res) => {
    res.send('<h1>Hello, Express.js Server!</h1>');
});

//definindo rotas
const routeTeste = require("./routes/routeTeste");
const Query = require("./routes/query");

// atribuindo rotas
app.use('/test', routeTeste);
app.use('/query', Query);

// porta que vai ser usada
const port = process.env.PORT || 3000;
// ouvindo na porta
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});