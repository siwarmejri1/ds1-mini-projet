// controllers/authController.js
const User = require('../models/User');
const jwt = require('jsonwebtoken');

//  
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '1h' 
  });
};

//  inscription mtaa user jdid 
exports.register = async (req, res) => {
  try {
    const { nom, login, motDePasse, role } = req.body;

    // besh nverifiou ken l user maoujoud deja o ela lee
    const userExists = await User.findOne({ login });
    if (userExists) {
      return res.status(400).json({ 
        message: 'Un utilisateur avec ce login existe déjà' 
      });
    }

    // besh nassn3ou l user e jdid 
    const user = await User.create({
      nom,
      login,
      motDePasse, 
      role: role || 'user' // role mteeou user par defaut 
    });

    // besh ngeneriou token 
    const token = generateToken(user._id);

    // lbody mtaa response 
    res.status(201).json({
      message: 'Utilisateur créé avec succès',
      user: {
        id: user._id,
        nom: user.nom,
        login: user.login,
        role: user.role,
        dateCreation: user.dateCreation
      },
      token
    });

  } catch (error) {
    res.status(500).json({ 
      message: 'Erreur lors de l\'inscription',
      error: error.message 
    });
  }
};

// ki yji l user besh yaamel login
exports.login = async (req, res) => {
  try {
    const { login, motDePasse } = req.body;

    // nverifiou ken l user aatana l login o l password 
    if (!login || !motDePasse) {
      return res.status(400).json({ 
        message: 'Login et mot de passe requis' 
      });
    }

    // nlawjou aaal login o lpassword fel base mteena 
    const user = await User.findOne({ login }).select('+motDePasse');
    if (!user) {
      return res.status(401).json({ 
        message: 'Login ou mot de passe incorrect' 
      });
    }

    // besh nverifiou l mot de passe
    const isPasswordCorrect = await user.correctPassword(motDePasse, user.motDePasse);
    if (!isPasswordCorrect) {
      return res.status(401).json({ 
        message: 'Login ou mot de passe incorrect' 
      });
    }

    // besh ngeneriou token 
    const token = generateToken(user._id);

    // l body mtaa  response 
    res.json({
      message: 'Connexion réussie',
      user: {
        id: user._id,
        nom: user.nom,
        login: user.login,
        role: user.role,
        dateCreation: user.dateCreation
      },
      token
    });

  } catch (error) {
    res.status(500).json({ 
      message: 'Erreur lors de la connexion',
      error: error.message 
    });
  }
};

// besh nrecuperiou byha l user 
exports.getProfile = async (req, res) => {
  try {
    // req.user tzedet bel  middleware authenticate
    const user = await User.findById(req.user.id);
    
    res.json({
      user: {
        id: user._id,
        nom: user.nom,
        login: user.login,
        role: user.role,
        dateCreation: user.dateCreation
      }
    });
  } catch (error) {
    res.status(500).json({ 
      message: 'Erreur lors de la récupération du profil',
      error: error.message 
    });
  }
};