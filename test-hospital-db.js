const mongoose = require('mongoose');
const hospitalConnection = require('./server/Models/hospitalDb');

// Test data for appointment
const testAppointment = {
  userId: new mongoose.Types.ObjectId(),
  hospitalId: "HOSP001",
  hospitalName: "Test Hospital",
  hospitalAddress: "123 Test Street, Test City",
  departmentId: "DEPT001",
  doctorId: "DOC001",
  doctorName: "Dr. Test Doctor",
  doctorSpecialization: "Cardiology",
  patientName: "Test Patient",
  patientAge: "30",
  patientPhone: "1234567890",
  symptoms: "Chest pain",
  selectedDate: "2024-01-15",
  selectedTime: "10:00 AM",
  consultationFee: 500,
  transactionId: "TXN001",
  status: "confirmed",
  paymentStatus: "paid"
};

async function testHospitalDB() {
  try {
    // Wait for connection
    await new Promise((resolve) => {
      if (hospitalConnection.readyState === 1) {
        resolve();
      } else {
        hospitalConnection.once('connected', resolve);
      }
    });

    console.log('✅ Connected to Hospital_DB successfully');

    // Test creating a collection
    const db = hospitalConnection.db;
    const collections = await db.listCollections().toArray();
    console.log('📋 Available collections:', collections.map(c => c.name));

    // Test inserting appointment data
    const appointmentCollection = db.collection('appointments');
    const result = await appointmentCollection.insertOne(testAppointment);
    console.log('✅ Appointment inserted successfully:', result.insertedId);

    // Test retrieving appointment data
    const retrievedAppointment = await appointmentCollection.findOne({ _id: result.insertedId });
    console.log('✅ Appointment retrieved successfully:', retrievedAppointment);

    // Test counting appointments
    const appointmentCount = await appointmentCollection.countDocuments();
    console.log('📊 Total appointments in collection:', appointmentCount);

    console.log('🎉 All tests passed! Hospital_DB is working correctly.');

  } catch (error) {
    console.error('❌ Error testing Hospital_DB:', error);
  } finally {
    // Close connection
    await hospitalConnection.close();
    console.log('🔌 Connection closed');
    process.exit(0);
  }
}

// Run the test
testHospitalDB();
