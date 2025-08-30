const mongoose = require('mongoose');
const hospitalConnection = require('./server/Models/hospitalDb');

// Connect to the old database (auth-db)
const oldDbUrl = "mongodb+srv://sahookumarbijay146:7iJKhs59ilrawBNN@cluster0.fyl5xdv.mongodb.net/auth-db?retryWrites=true&w=majority&appName=Cluster0";
const oldConnection = mongoose.createConnection(oldDbUrl);

async function migrateAppointments() {
  try {
    console.log('🔄 Starting appointment migration...');

    // Wait for both connections
    await Promise.all([
      new Promise((resolve) => {
        if (oldConnection.readyState === 1) resolve();
        else oldConnection.once('connected', resolve);
      }),
      new Promise((resolve) => {
        if (hospitalConnection.readyState === 1) resolve();
        else hospitalConnection.once('connected', resolve);
      })
    ]);

    console.log('✅ Connected to both databases');

    // Get old appointments collection
    const oldDb = oldConnection.db;
    const oldAppointments = oldDb.collection('appointments');

    // Get new appointments collection
    const newDb = hospitalConnection.db;
    const newAppointments = newDb.collection('appointments');

    // Count existing appointments in old database
    const oldCount = await oldAppointments.countDocuments();
    console.log(`📊 Found ${oldCount} appointments in old database`);

    if (oldCount === 0) {
      console.log('ℹ️ No appointments to migrate');
      return;
    }

    // Get all appointments from old database
    const appointments = await oldAppointments.find({}).toArray();
    console.log(`📋 Retrieved ${appointments.length} appointments`);

    // Insert appointments into new database
    if (appointments.length > 0) {
      const result = await newAppointments.insertMany(appointments);
      console.log(`✅ Successfully migrated ${result.insertedCount} appointments`);
    }

    // Verify migration
    const newCount = await newAppointments.countDocuments();
    console.log(`📊 New database now contains ${newCount} appointments`);

    if (newCount === oldCount) {
      console.log('🎉 Migration completed successfully!');
    } else {
      console.log('⚠️ Migration may have issues - count mismatch');
    }

  } catch (error) {
    console.error('❌ Migration failed:', error);
  } finally {
    // Close connections
    await Promise.all([
      oldConnection.close(),
      hospitalConnection.close()
    ]);
    console.log('🔌 All connections closed');
    process.exit(0);
  }
}

// Run migration
migrateAppointments();
