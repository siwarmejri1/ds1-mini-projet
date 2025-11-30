const express = require("express");
const router = express.Router();

const { 
    createTask, 
    assignTask,
    searchTasks,
    myTasks,
    allTasks
 } = require("../controllers/taskController");

const { authenticate, isManager } = require("../middleware/auth");

router.post("/create", authenticate, createTask);
router.patch("/:taskId/assign", authenticate, isManager, assignTask);
router.get("/search", authenticate, searchTasks);

// liste mes tâches
router.get("/mine", authenticate, myTasks);

// liste toutes les tâches (manager seulement)
router.get("/all", authenticate, allTasks);

module.exports = router;
