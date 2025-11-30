// middleware/auth.js
// Pour test temporaire sans JWT

exports.authenticate = async (req, res, next) => {
  try {
    // ⚠️ MOCK TEMPORAIRE : utilisateur fictif
    req.user = {
      _id: "692b4063fccf9b4b0b1e2600", // ObjectId fictif
      login: "fatma",
      role: "manager" // ou "manager" si tu veux tester les routes manager
    };

    console.log('Utilisateur mocké pour test :', req.user.login);
    next();
  } catch (error) {
    console.log('Erreur authentication:', error.message);
    res.status(401).json({ message: 'Erreur authentification' });
  }
};

// Middleware pour vérifier si c'est manager (optionnel)
exports.isManager = (req, res, next) => {
  if (req.user && req.user.role === 'manager') {
    console.log('Accès manager autorisé');
    next();
  } else {
    console.log('Accès manager refusé');
    res.status(403).json({ message: 'Accès refusé. Rôle manager requis.' });
  }
};
