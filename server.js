const express = require('express');
const app = express();

app.get('/', (req, res) => {
    res.send('<h1>Hello, Express.js Server!</h1>');
});

//definindo rotas
const routeTeste = require("./routes/routeTeste");

// atribuindo rotas
app.use('/test', routeTeste);

// porta que vai ser usada
const port = process.env.PORT || 3000;
// ouvindo na porta
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});