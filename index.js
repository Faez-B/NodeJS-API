require('dotenv').config();
require('express-async-errors');
const express = require('express');
const db = require('./Tache');
const Joi = require('joi');
const jwt = require('jsonwebtoken');
const bcrypt = require("bcrypt");
const users = require('./Users');
const dbUsers = require('./Users');
const mongoose = require('mongoose');

mongoose.connect(`mongodb://localhost:27017/${process.env.BDD}`);

const app = express();

app.use(express.json());

const port = process.env.PORT;

const userSchemaJoi = Joi.object({
    email: Joi.string().required(),
	username: Joi.string().min(2).max(50),
	motdepasse: Joi.string().min(2).required(),
});

const tacheSchemaJoi = Joi.object({
    description: Joi.string().min(2).max(100).required(),
	faite: Joi.boolean(),
	creerPar: Joi.number().required(),
});

const userSchemaMongoose = new mongoose.Schema({
    email: String,
	username: String,
	motdepasse: String,
});

const tacheSchemaMongoose = new mongoose.Schema({
    description: String,
	faite: Boolean,
	creerPar: Number,
});

const Tache = mongoose.model('Tache', tacheSchemaMongoose);
const User = mongoose.model('User', userSchemaMongoose);


// TACHES

app.get("/taches", (req, res) =>{

    res.status(200).send(db.getAll());

})

app.get("/tache/:id", (req, res) =>{
    const id = parseInt(req.params.id);

    if(db.getOneById(id)) {
        res.send(db.getOneById(id));
        // Mongo

    }
    else {
        res.status(404).send({});
        throw new Error ("Tache inconnue");
    } 
        
})

app.post("/taches", async(req, res) =>{
    const payload = req.body;

    db.insert(payload);

    res.status(201).send({...req.body, faite : false});
    // Mongo
    const tache = new Tache(payload);
    try {
        const resultat = await tache.save()
    } catch (e) {}
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


// USERS
app.post("/signin", async (req, res) =>{
    const data = req.body;
    
    const { value: login, error } = userSchemaJoi.validate(data);
    
    if (error) res.status(400).send({ erreur : error.details[0].message });
    
    const {found, user} = users.findByEmail(login.email);
    
    if (!found) {
        return res.status(400).send({ erreur: "Identifiant invalide" });
    }
    const id = user.id;

    const passwordIsValid = await bcrypt.compare(req.body.motdepasse, user.motdepasse);
    
    if (!passwordIsValid)
    return res.status(400).send({ erreur: "Mot de Passe Invalide" });
    
    // Si mot de passe valide, on crée le token de connexion
    const token = jwt.sign({ id }, process.env.UN_SECRET_JWT);
    res.header("x-auth-token", token).status(200).send({ username: user.username });
})

app.post("/signup", async (req, res) =>{
    const data = req.body;
    
    const { value: login, error } = userSchemaJoi.validate(data);
    
    if (error) res.status(400).send({ erreur : error.details[0].message });
    
    const {found} = users.findByEmail(login.email);
    
    if (found) {
        return res.status(400).send({ erreur: "Email déjà utilisé, veuillez vous connecter" });
    }
    else {
		const salt = await bcrypt.genSalt(10);
		const mdpHash = await bcrypt.hash(login.motdepasse, salt);
		login.motdepasse = mdpHash;
		
		dbUsers.insert(login);

		// 201 : PUT, POST
		res.status(201).json({
			email: login.email,
            username: login.username
		})
        // Mongo
        const user = new User(data);
        try {
            const resultat = await user.save()
        } catch (e) {}
	}
})




if (process.env.NODE_ENV !== 'test') {
    app.listen(port, () => {
        console.log("Listening on port " + port);
    })
}


module.exports = app;

