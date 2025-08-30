// Test script to verify appointment API endpoints
const fetch = require('node-fetch');

async function testAppointmentAPI() {
    console.log('🔍 Testing Appointment API endpoints...\n');
    
    const baseUrl = 'http://localhost:3001';
    
    try {
        // Test 1: Check if appointment routes are available
        console.log('1. Testing appointment routes availability...');
        const response = await fetch(`${baseUrl}/`);
        const data = await response.json();
        
        if (data.endpoints && data.endpoints.appointments) {
            console.log('   ✅ Appointment endpoints are available');
            console.log('   📋 Available endpoints:', data.endpoints.appointments);
        } else {
            console.log('   ❌ Appointment endpoints not found');
        }
        console.log('');
        
        // Test 2: Test appointment creation (without auth - should fail)
        console.log('2. Testing appointment creation without auth...');
        try {
            const createResponse = await fetch(`${baseUrl}/appointments/create`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    hospitalId: '1',
                    hospitalName: 'Test Hospital',
                    hospitalAddress: 'Test Address',
                    departmentId: 'cardiology',
                    doctorId: '1',
                    doctorName: 'Dr. Test',
                    doctorSpecialization: 'Cardiologist',
                    patientName: 'Test Patient',
                    patientAge: '30',
                    patientPhone: '1234567890',
                    symptoms: 'Test symptoms',
                    selectedDate: '2024-01-15',
                    selectedTime: '10:00 AM',
                    consultationFee: 1000,
                    transactionId: 'TEST123'
                })
            });
            
            if (createResponse.status === 401) {
                console.log('   ✅ Authentication required (expected)');
            } else {
                console.log(`   ⚠️ Unexpected status: ${createResponse.status}`);
            }
        } catch (error) {
            console.log('   ❌ Error testing appointment creation:', error.message);
        }
        console.log('');
        
        // Test 3: Test getting user appointments (without auth - should fail)
        console.log('3. Testing get user appointments without auth...');
        try {
            const userResponse = await fetch(`${baseUrl}/appointments/user`);
            
            if (userResponse.status === 401) {
                console.log('   ✅ Authentication required (expected)');
            } else {
                console.log(`   ⚠️ Unexpected status: ${userResponse.status}`);
            }
        } catch (error) {
            console.log('   ❌ Error testing get user appointments:', error.message);
        }
        console.log('');
        
        console.log('✅ Appointment API tests completed!');
        console.log('\n🔧 Next steps:');
        console.log('1. Start the server: npm start (in server directory)');
        console.log('2. Test with authentication token');
        console.log('3. Create appointments through the hospital booking flow');
        
    } catch (error) {
        console.error('❌ Appointment API test failed:', error.message);
        console.log('\n🔧 Troubleshooting tips:');
        console.log('1. Make sure the server is running on port 3001');
        console.log('2. Check if appointment routes are properly configured');
        console.log('3. Verify MongoDB connection');
    }
}

testAppointmentAPI();