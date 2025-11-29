require('dotenv').config();
const express = require('express');
const connectDB = require('./config/db');

const app = express();
const port = process.env.PORT || 5000;

// Connexion à MongoDB
connectDB();

// Middleware
app.use(express.json());

// Exemple route
app.get('/', (req, res) => {
    res.send('Hello world!');
});

// Démarrer le serveur
app.listen(port, () => console.log(`Serveur démarré sur le port ${port}`));
