require('dotenv').config();
const express = require('express');
const connectDB = require('./config/db');
const projectRoutes = require('./src/routes/projectRoutes');
const taskRoutes = require('./src/routes/taskRoutes');

//hnee aamlna initialisation mtaa l app express
const app = express();
const port = process.env.PORT || 5000;

//  l connexion mtaa l base de données 
connectDB();
app.use(express.json());


// route te3 projects w tasks
app.use('/projects', projectRoutes);
app.use('/tasks', taskRoutes);



//besh ndemarriou l app
app.listen(port, () => {
  console.log(` Serveur démarré sur le port ${port}`);
   console.log(` URL: http://localhost:${port}`);
});
