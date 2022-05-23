const express = require('express');
require('dotenv').config();
const db = require('./Tache');

const app = express();

const port = process.env.PORT;

app.get("/taches", (req, res) =>{

    res.status(200).send(db.getAll());

})

app.get("/tache/:id", (req, res) =>{
    const id = parseInt(req.params.id);

    if(db.getOneById(id)) res.send(db.getOneById(id));
    else throw new Error ("Tache inconnue");
})

if (process.env.NODE_ENV !== 'test') {
    app.listen(port, () => {
        console.log("Listening on port " + port);
    })
}


module.exports = app;

