const mongoose = require('mongoose');

// sna3na schema mta3 tasks
const taskSchema = new mongoose.Schema({
  titre: { type: String, required: true },
  description: { type: String },
  statut: { type: String, enum: ['todo', 'doing', 'done'], default: 'todo' },
  deadline: { type: Date },
  projetAssocie: { type: mongoose.Schema.Types.ObjectId, ref: 'Project', required: true },
  utilisateurAssigne: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  dateCreation: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Task', taskSchema);