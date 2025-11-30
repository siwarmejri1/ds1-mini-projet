const express = require('express');
const router = express.Router();

const { 
  createProject,
    myProjects,
    allProjects,
    searchtriProjects
} = require('../controllers/projectController');

const { authenticate, isManager } = require('../middleware/auth');


// route mte3 les projet ( creation, liste, tri+recherche )
router.post('/create', authenticate, createProject);
router.get('/mine', authenticate, myProjects);
router.get('/all', authenticate, isManager, allProjects);
router.get('/search',authenticate, searchtriProjects);



module.exports = router;
