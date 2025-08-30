#!/usr/bin/env node

const { spawn } = require('child_process');
const path = require('path');

console.log('🚀 Starting HealthCare+ Full Stack Application...\n');

// Start server
console.log('📡 Starting server...');
const server = spawn('npm', ['start'], {
    cwd: path.join(__dirname, 'server'),
    stdio: 'inherit',
    shell: true
});

// Wait a bit for server to start, then start client
setTimeout(() => {
    console.log('🌐 Starting client...');
    const client = spawn('npm', ['run', 'dev'], {
        cwd: path.join(__dirname, 'client'),
        stdio: 'inherit',
        shell: true
    });

    client.on('error', (error) => {
        console.error('❌ Client error:', error);
    });
}, 3000);

server.on('error', (error) => {
    console.error('❌ Server error:', error);
});

// Handle cleanup
process.on('SIGINT', () => {
    console.log('\n🛑 Shutting down...');
    server.kill();
    process.exit(0);
});

console.log('✅ Both server and client are starting...');
console.log('🔗 Server will be available at: http://localhost:3000');
console.log('🔗 Client will be available at: http://localhost:3000 (or similar)');
console.log('📱 Open the client URL in your browser to use the app');
console.log('\n💡 Press Ctrl+C to stop both services\n');