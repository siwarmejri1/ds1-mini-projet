const mongoose = require('mongoose');
//naamlou fonction besh nconnectiou bel base 
const connectDB = async () => { 
    try {
        await mongoose.connect(process.env.MONGO_URI, {  // houny qaadin nhawlou nconnectiou bel base 
            useNewUrlParser: true, // hnee nesstamlou fel parser jdid mtaa mongodb
            useUnifiedTopology: true, 
        });
        console.log("MongoDB connecté avec succès"); // ken connectina ça va l message hedha yodhher fel console
    } catch (error) {
        console.error("Erreur de connexion MongoDB :", error.message); // ken fama erreur lmessage hedha yodhher fel console 
        process.exit(1); // hedha ywaqef l applicqation ken fama erreur 
    }
};

module.exports = connectDB; // hedhy tkhalina nexportiou l fonction ly sna3neha 