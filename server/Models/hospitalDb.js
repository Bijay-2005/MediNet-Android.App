const mongoose = require('mongoose');

// Connection string for Hospital_DB
const hospitalMongoUrl = "mongodb+srv://sahookumarbijay146:7iJKhs59ilrawBNN@cluster0.fyl5xdv.mongodb.net/Hospital_DB?retryWrites=true&w=majority&appName=Cluster0";

// Create a separate connection for Hospital_DB
const hospitalConnection = mongoose.createConnection(hospitalMongoUrl, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

hospitalConnection.on('connected', () => {
  console.log('Connected to Hospital_DB MongoDB');
});

hospitalConnection.on('error', (err) => {
  console.log('Error connecting to Hospital_DB MongoDB:', err);
});

hospitalConnection.on('disconnected', () => {
  console.log('Disconnected from Hospital_DB MongoDB');
});

module.exports = hospitalConnection;
