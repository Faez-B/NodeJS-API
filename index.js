require('dotenv').config();
require('express-async-errors');
const express = require('express');
const db = require('./Tache');
const Joi = require('joi');
const jwt = require('jsonwebtoken');

const app = express();

app.use(express.json());

const port = process.env.PORT;

const userSchemaJoi = Joi.object({
    email: Joi.string().required(),
	username: Joi.string().min(2).max(50),
	motdepasse: Joi.string().min(2).max(100).required(),
});

const tacheSchemaJoi = Joi.object({
    description: Joi.string().min(2).max(100).required(),
	faite: Joi.boolean(),
	creerPar: Joi.number().required(),
});

app.get("/taches", (req, res) =>{

    res.status(200).send(db.getAll());

})

app.get("/tache/:id", (req, res) =>{
    const id = parseInt(req.params.id);

    if(db.getOneById(id)) res.send(db.getOneById(id));
    else {
        res.status(404).send({});
        throw new Error ("Tache inconnue");
    } 
        
})

app.post("/taches", (req, res) =>{
    const payload = req.body;

    db.insert(payload);

    res.status(201).send({...req.body, faite : false});
})

app.put("/tache/:id", (req, res) =>{
    const id = parseInt(req.params.id);
    const payload = req.body;

    const actuel_faite = (db.getOneById(id)).faite ;

    db.update(id, {...payload, faite : actuel_faite});
    res.status(201).send(db.getOneById(id));
})

app.delete("/tache/:id", (req, res) =>{
    const id = parseInt(req.params.id);

    db.delete(id);
    res.status(200).send(db.getAll());
})








if (process.env.NODE_ENV !== 'test') {
    app.listen(port, () => {
        console.log("Listening on port " + port);
    })
}


module.exports = app;

