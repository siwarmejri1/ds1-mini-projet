const Task = require("../models/Task");
const Project = require("../models/Project");
// création d'une tache
exports.createTask = async (req, res) => {
  try {
    const { titre, description, statut, deadline, projetAssocie } = req.body;

    //champs obligatoire
    if (!titre) {
      return res.status(400).json({ message: "Le champ 'titre' est obligatoire" });
    }
    if (!projetAssocie) {
      return res.status(400).json({ message: "Le champ 'projet Associe' est obligatoire" });
    }

    // nverifiw projet mawjoud ou nn
    const projectFound = await Project.findById(projetAssocie);
    if (!projectFound) {
      return res.status(404).json({ message: "Projet introuvable" });
    }

    // champs mte3 statut
    const allowedStatus = ["todo", "doing", "done"]; // verification lel statut
    if (statut && !allowedStatus.includes(statut)) {
      return res.status(400).json({ message: "Statut invalide" });
    }

    const task = await Task.create({
      titre,
      description,
      statut,
      deadline,
      projetAssocie    
    });

    res.status(201).json(task);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// assigner une tache l ay utilisateur (manager only)
exports.assignTask = async (req, res) => {
  try {
    const { taskId } = req.params;
    const { userId } = req.body;


    const task = await Task.findById(taskId);
    if (!task) return res.status(404).json({ message: "Tâche introuvable" });

    // nverifiw role mte3 manager 
    if (req.user.role !== "manager") {
      return res.status(403).json({ message: "Accès interdit (manager uniquement)" });
    }

    task.utilisateurAssigne = userId;
    await task.save();

    res.json({ message: "Tâche assignée avec succès", task });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


// tri+recherche mte3 les taches
exports.searchTasks = async (req, res) => {
  const { sort, order = "asc", search, statut, projetAssocie } = req.query;

   // filtrage selon rôle : si manager ychouf kol, sinon ychouf  les tâches assignées lih khw
  let query = req.user.role === "manager" ? {} : { utilisateurAssigne: req.user._id };

  // recherche par titre ?search=xy
  if (search) {
    query.titre = { $regex: search, $options: "i" };
  }

  // filtre par statut et par association projet 
  //  ?statut=todo/doing/done
  if (statut) {
    query.statut = statut;
  }

  if (projetAssocie) {
    query.projetAssocie = projetAssocie;
  }

  // tri par champ + ordre croissant/decroissant
  let sortOption = {};
  if (sort) {
    sortOption[sort] = order === "desc" ? -1 : 1;
  }

  const tasks = await Task.find(query)
    .populate("projetAssocie", "nom statut")
    .populate("utilisateurAssigne", "nom")
    .sort(sortOption);

  res.json(tasks);
};


// liste mte3 les tâches assignées li l utilisateur connecté
exports.myTasks = async (req, res) => {
  try {
    const tasks = await Task.find({ utilisateurAssigne: req.user._id })
      .populate("projetAssocie", "nom statut")
      .populate("utilisateurAssigne", "nom");
    res.json(tasks);

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// liste mte3 kol les tâches (manager only)
exports.allTasks = async (req, res) => {
  try {
    if (req.user.role !== "manager") {
      return res.status(403).json({ message: "Accès interdit (manager uniquement)" });
    }

    const tasks = await Task.find()
      .populate("projetAssocie", "nom statut")
      .populate("utilisateurAssigne", "nom");
    res.json(tasks);

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};