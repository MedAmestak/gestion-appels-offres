const mongoose = require('mongoose');

// Set the environment variables for your MongoDB connection
const url = process.env.MONGODB_URL || 'mongodb+srv://db_username:Qavpog-fydge7-xacwes@cluster0.ep8k8gb.mongodb.net/gestion-appels-offres?retryWrites=true&w=majority';

const connectToDB = async () => {
  try {
    await mongoose.connect(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Connected to MongoDB');
  } catch (err) {
    console.error('Error connecting to MongoDB:', err);
    throw err; // Rethrow the error to handle it in the calling code
  }
};

module.exports = { connectToDB };
