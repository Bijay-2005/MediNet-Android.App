// Test script to verify server connection
const fetch = require('node-fetch');

async function testServerConnection() {
    console.log('🔍 Testing server connection...\n');
    
    const baseUrl = 'http://localhost:3001';
    
    try {
        // Test 1: Ping endpoint
        console.log('1. Testing /ping endpoint...');
        const pingResponse = await fetch(`${baseUrl}/ping`);
        console.log(`   Status: ${pingResponse.status}`);
        const pingData = await pingResponse.text();
        console.log(`   Response: ${pingData}\n`);
        
        // Test 2: Root endpoint
        console.log('2. Testing root endpoint...');
        const rootResponse = await fetch(`${baseUrl}/`);
        console.log(`   Status: ${rootResponse.status}`);
        const rootData = await rootResponse.json();
        console.log(`   Response:`, rootData, '\n');
        
        // Test 3: Test endpoint
        console.log('3. Testing /test endpoint...');
        const testResponse = await fetch(`${baseUrl}/test`);
        console.log(`   Status: ${testResponse.status}`);
        const testData = await testResponse.json();
        console.log(`   Response:`, testData, '\n');
        
        console.log('✅ All tests passed! Server is working correctly.');
        
    } catch (error) {
        console.error('❌ Server connection test failed:', error.message);
        console.log('\n🔧 Troubleshooting tips:');
        console.log('1. Make sure the server is running: npm start (in server directory)');
        console.log('2. Check if port 3001 is available');
        console.log('3. Verify the server started without errors');
    }
}

testServerConnection(); 