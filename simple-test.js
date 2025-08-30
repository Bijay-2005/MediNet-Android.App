console.log('Starting simple test...');

try {
  const mongoose = require('mongoose');
  console.log('Mongoose loaded successfully');
  
  const hospitalConnection = require('./server/Models/hospitalDb');
  console.log('Hospital DB connection loaded successfully');
  
  console.log('Connection state:', hospitalConnection.readyState);
  
} catch (error) {
  console.error('Error:', error.message);
  console.error('Stack:', error.stack);
}
