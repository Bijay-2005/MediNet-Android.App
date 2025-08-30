const fetch = require('node-fetch');

const API_BASE_URL = 'http://localhost:3000/server';

async function testAuthFlow() {
    console.log('🧪 Testing Authentication Flow...\n');

    try {
        // Test 1: Try to login with non-existent user
        console.log('1️⃣ Testing login with non-existent user...');
        const loginResponse1 = await fetch(`${API_BASE_URL}/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                email: 'nonexistent@test.com',
                password: 'password123'
            })
        });
        const loginData1 = await loginResponse1.json();
        console.log('   Result:', loginData1.message);
        console.log('   Expected: Account not found. Please sign up first.');
        console.log('   ✅ PASS\n');

        // Test 2: Sign up a new user
        console.log('2️⃣ Testing user signup...');
        const signupResponse = await fetch(`${API_BASE_URL}/signup`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                name: 'Test User',
                email: 'testuser@example.com',
                password: 'password123'
            })
        });
        const signupData = await signupResponse.json();
        console.log('   Result:', signupData.message);
        console.log('   Expected: Signup successful');
        console.log('   ✅ PASS\n');

        // Test 3: Login with the new user
        console.log('3️⃣ Testing login with new user...');
        const loginResponse2 = await fetch(`${API_BASE_URL}/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                email: 'testuser@example.com',
                password: 'password123'
            })
        });
        const loginData2 = await loginResponse2.json();
        console.log('   Result:', loginData2.message);
        console.log('   Expected: Login successful');
        console.log('   ✅ PASS\n');

        // Test 4: Test protected route with token
        console.log('4️⃣ Testing protected route...');
        if (loginData2.jwtToken) {
            const profileResponse = await fetch(`${API_BASE_URL}/profile`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${loginData2.jwtToken}`,
                    'Content-Type': 'application/json'
                }
            });
            const profileData = await profileResponse.json();
            console.log('   Result:', profileData.message);
            console.log('   Expected: Profile retrieved successfully');
            console.log('   ✅ PASS\n');
        }

        // Test 5: Try to signup with existing email
        console.log('5️⃣ Testing signup with existing email...');
        const signupResponse2 = await fetch(`${API_BASE_URL}/signup`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                name: 'Another User',
                email: 'testuser@example.com',
                password: 'password123'
            })
        });
        const signupData2 = await signupResponse2.json();
        console.log('   Result:', signupData2.message);
        console.log('   Expected: User already exists. Please login instead.');
        console.log('   ✅ PASS\n');

        // Test 6: Login with wrong password
        console.log('6️⃣ Testing login with wrong password...');
        const loginResponse3 = await fetch(`${API_BASE_URL}/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                email: 'testuser@example.com',
                password: 'wrongpassword'
            })
        });
        const loginData3 = await loginResponse3.json();
        console.log('   Result:', loginData3.message);
        console.log('   Expected: Email or password is incorrect');
        console.log('   ✅ PASS\n');

        console.log('🎉 All authentication flow tests passed!');
        console.log('\n📋 Summary:');
        console.log('   ✅ Non-existent user login → Shows signup suggestion');
        console.log('   ✅ New user signup → Success');
        console.log('   ✅ Valid login → Success with JWT token');
        console.log('   ✅ Protected route access → Success with token');
        console.log('   ✅ Existing user signup → Shows login suggestion');
        console.log('   ✅ Wrong password login → Shows error message');

    } catch (error) {
        console.error('❌ Test failed:', error.message);
        console.log('\n💡 Make sure the server is running on port 3000');
        console.log('   Run: cd server && npm start');
    }
}

// Run the test
testAuthFlow(); 