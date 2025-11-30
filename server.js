require('dotenv').config();
const express = require('express');
const connectDB = require('./config/db');
const projectRoutes = require('./src/routes/projectRoutes');
const taskRoutes = require('./src/routes/taskRoutes');

const app = express();
const port = process.env.PORT || 5000;

// Connexion à MongoDB
connectDB();

// Middleware
app.use(express.json());

// route
app.use('/projects', projectRoutes);
app.use('/tasks', taskRoutes);


// Démarrer le serveur
app.listen(port, () => console.log(`Serveur démarré sur le port ${port}`));
