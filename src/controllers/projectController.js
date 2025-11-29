const Project = require("../models/Project");
const User = require("../models/User");

// fonction te3 la création d'un projet
exports.createProject = async (req, res) => {
  try {
    const { nom, description, statut } = req.body;

    if (!nom) {
      return res
        .status(400)
        .json({ message: "Le nom du projet est obligatoire" });
    }

    const project = new Project({
      nom,
      description,
      proprietaire: req.user._id,
      statut: statut || "en cours",
    });

    await project.save();
    res.status(201).json(project);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// liste mte3 les pjets du propriétaire 
exports.myProjects = async (req, res) => {
  try {
    const projects = await Project.find({ proprietaire: req.user._id });
    res.json(projects);

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// liste mte3 les projets koll (manager only)
exports.allProjects = async (req, res) => {
  try {
    const projects = await Project.find().populate("proprietaire", "-motDePasse");
    res.json(projects);

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};