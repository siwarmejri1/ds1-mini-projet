const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(
      process.env.MONGODB_URI || 'mongodb://localhost:27017/ds1-mini-projet'
    );
     console.log(` MongoDB connecté: ${conn.connection.host}`);
     console.log(` Base de données: ${conn.connection.name}`);
     console.log("MongoDB connecté avec succès");  // ken connectina ça va l message hedha yodhher fel console
    } catch (error) {
        console.error("Erreur de connexion MongoDB :", error.message); // sinon ken fama erreur message d'erreur yben fel console
        process.exit(1); 
    }
};

module.exports = connectDB;