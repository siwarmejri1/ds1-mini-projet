require('dotenv').config();
const express = require('express');
const connectDB = require('./config/db');
const projectRoutes = require('./src/routes/projectRoutes');
const taskRoutes = require('./src/routes/taskRoutes');

//hnee aamlna initialisation mtaa l app express
const app = express();
const port = process.env.PORT || 5000;

//  l connexion mtaa l base de données 
//  l connexion mtaa l base de données 
connectDB();
app.use(express.json());
//route besh ntesstiou byh 
app.get('/', (req, res) => {
  res.json({ 
    message: ' API User Authentication is working!',
    status: 'Server is running',
    database: 'MongoDB connecting...',
    endpoints: {
      register: 'POST /api/users/register',
      login: 'POST /api/users/login', 
      profile: 'GET /api/users/profile'
    }
  });
});
// l route mtaa l api 
app.use('/api/users', userRoutes);


// route te3 projects w tasks
app.use('/projects', projectRoutes);
app.use('/tasks', taskRoutes);



//besh ndemarriou l app
app.listen(port, () => {
  console.log(` Serveur démarré sur le port ${port}`);
   console.log(` URL: http://localhost:${port}`);
});
