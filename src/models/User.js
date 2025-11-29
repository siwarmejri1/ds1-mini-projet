// models/User.js
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

// sna3na schéma user (kifech n7otou données mtaa user)
const userSchema = new mongoose.Schema({
  nom: { 
    type: String, 
    required: [true, 'Le nom est obligatoire'] 
  },
  login: { 
    type: String, 
    required: [true, 'Le login est obligatoire'], 
    unique: true 
  },
  motDePasse: { 
    type: String, 
    required: [true, 'Le mot de passe est obligatoire'] 
  },
  role: { 
    type: String, 
    enum: ['user', 'manager'], 
    default: 'user' 
  },
  dateCreation: { 
    type: Date, 
    default: Date.now 
  }
});

//  qbal mansajelou l'utilisateur, besh ncryptiou l  mot de passe
userSchema.pre('save', async function(next) {
  if (!this.isModified('motDePasse')) return next(); 
  this.motDePasse = await bcrypt.hash(this.motDePasse, 12); 
  next();
});

//  methode bch netaaakedou ken l mot de passe shih o ela le
userSchema.methods.correctPassword = async function(candidatePassword, userPassword) {
  return await bcrypt.compare(candidatePassword, userPassword); // Tcomparer ken mot de passe mte3ek s7i7 wela le
};

module.exports = mongoose.model('User', userSchema); 