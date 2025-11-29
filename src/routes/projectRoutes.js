const express = require('express');
const router = express.Router();

const { 
  createProject,
    myProjects,
    allProjects
} = require('../controllers/projectController');

const { authenticate, isManager } = require('../middleware/auth');


// route mte3 creation projet
router.post('/create', authenticate, createProject);
router.get('/mine', authenticate, myProjects);
router.get('/all', authenticate, isManager, allProjects);



module.exports = router;
