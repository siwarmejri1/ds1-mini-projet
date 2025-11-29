const mongoose = require('mongoose');
//naamlou fonction besh nconnectiou bel base 
const connectDB = async () => { 
    try {
        await mongoose.connect(process.env.MONGO_URI, {  
            useNewUrlParser: true, 
            useUnifiedTopology: true, 
        });
        console.log("MongoDB connecté avec succès"); // ken connectina ça va l message hedha yodhher fel console
    } catch (error) {
        console.error("Erreur de connexion MongoDB :", error.message); // ken fama erreur lmessage hedha yodhher fel console 
        process.exit(1); // hedha ywaqef l applicqation ken fama erreur 
    }
};

module.exports = connectDB;
