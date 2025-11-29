// middleware/auth.js
const jwt = require('jsonwebtoken');
const User = require('../models/User');

// middleware besh nverifiou byh token jwt mteena 
exports.authenticate = async (req, res, next) => {
  try {
    console.log(' Vérification du token...');
    
    // besh nrecuperiou token 
    const authHeader = req.header('Authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ 
        message: 'Accès refusé. Token manquant ou format invalide.' 
      });
    }

    const token = authHeader.replace('Bearer ', '');
    
    // besh nverifiou o ndecodiou token mteena 
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'secret_fallback');
    console.log(' Token décodé:', decoded);
    
    // besh nlawjou aal user fel base mteena 
    const user = await User.findById(decoded.id).select('-motDePasse');
    if (!user) {
      return res.status(401).json({ 
        message: 'Token invalide. Utilisateur non trouvé.' 
      });
    }

    //  besh nzydou l user mteena lel objet request
    req.user = user;
    console.log(' Utilisateur authentifié:', user.login);
    next();
    
  } catch (error) {
    console.log(' Erreur authentication:', error.message);
    res.status(401).json({ 
      message: 'Token invalide ou expiré.' 
    });
  }
};

// middleware besh nverifiou byh ely l user mteena manager 
exports.isManager = (req, res, next) => {
  console.log(' Vérification rôle manager...');
  
  if (req.user && req.user.role === 'manager') {
    console.log(' Accès manager autorisé');
    next();
  } else {
    console.log(' Accès manager refusé');
    res.status(403).json({ 
      message: 'Accès refusé. Rôle manager requis.' 
    });
  }
};