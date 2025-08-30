const mongoose = require('mongoose');

console.log('🔧 Testing Hospital_DB connection...');

// Connection string for Hospital_DB
const hospitalMongoUrl = "mongodb+srv://sahookumarbijay146:7iJKhs59ilrawBNN@cluster0.fyl5xdv.mongodb.net/Hospital_DB?retryWrites=true&w=majority&appName=Cluster0";

console.log('📡 Attempting to connect to:', hospitalMongoUrl);

// Create a separate connection for Hospital_DB
const hospitalConnection = mongoose.createConnection(hospitalMongoUrl, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

hospitalConnection.on('connected', () => {
  console.log('✅ Connected to Hospital_DB MongoDB successfully!');
  
  // Test creating a collection
  const db = hospitalConnection.db;
  console.log('🗄️ Database name:', db.databaseName);
  
  // List collections
  db.listCollections().toArray()
    .then(collections => {
      console.log('📋 Available collections:', collections.map(c => c.name));
      
      // Test inserting a document
      const testCollection = db.collection('test');
      return testCollection.insertOne({ test: 'data', timestamp: new Date() });
    })
    .then(result => {
      console.log('✅ Test document inserted:', result.insertedId);
      
      // Close connection
      return hospitalConnection.close();
    })
    .then(() => {
      console.log('🔌 Connection closed');
      process.exit(0);
    })
    .catch(err => {
      console.error('❌ Error during testing:', err);
      hospitalConnection.close();
      process.exit(1);
    });
});

hospitalConnection.on('error', (err) => {
  console.error('❌ Error connecting to Hospital_DB MongoDB:', err);
  process.exit(1);
});

hospitalConnection.on('disconnected', () => {
  console.log('🔌 Disconnected from Hospital_DB MongoDB');
});

// Set timeout for connection
setTimeout(() => {
  console.log('⏰ Connection timeout - closing');
  hospitalConnection.close();
  process.exit(1);
}, 10000);
