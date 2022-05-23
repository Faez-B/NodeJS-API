const express = require('express');
require('dotenv').config();
const db = require('./Tache');

const app = express();

const port = process.env.PORT;

app.get("/taches", (req, res) =>{

    res.status(200).send(db.getAll());

})

app.listen(port, () => {
    console.log("Listening on port " + port);
})


