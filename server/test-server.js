// Simple test script to verify server endpoints
const fetch = require('node-fetch'); // You might need to install: npm install node-fetch

const API_BASE_URL = 'http://localhost:3001/server';

async function testSignup() {
    try {
        console.log('Testing signup endpoint...');
        const response = await fetch(`${API_BASE_URL}/signup`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name: 'Test User',
                email: 'test@example.com',
                password: 'password123'
            }),
        });

        const data = await response.json();
        console.log('Signup response:', data);
        
        return data.success;
    } catch (error) {
        console.error('Signup test failed:', error.message);
        return false;
    }
}

async function testLogin() {
    try {
        console.log('Testing login endpoint...');
        const response = await fetch(`${API_BASE_URL}/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: 'test@example.com',
                password: 'password123'
            }),
        });

        const data = await response.json();
        console.log('Login response:', data);
        
        return data.success;
    } catch (error) {
        console.error('Login test failed:', error.message);
        return false;
    }
}

async function testServer() {
    console.log('Starting server tests...\n');
    
    // Test ping endpoint first
    try {
        const pingResponse = await fetch('http://localhost:3001/ping');
        const pingResult = await pingResponse.text();
        console.log('Ping test:', pingResult);
    } catch (error) {
        console.error('Server is not running or not accessible:', error.message);
        return;
    }

    // Test signup
    const signupSuccess = await testSignup();
    console.log('Signup test result:', signupSuccess ? 'PASS' : 'FAIL');
    
    // Test login
    const loginSuccess = await testLogin();
    console.log('Login test result:', loginSuccess ? 'PASS' : 'FAIL');
    
    console.log('\nServer tests completed.');
}

// Run tests
testServer();