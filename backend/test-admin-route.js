// Test script for admin routes
const axios = require('axios');
require('dotenv').config();

// Replace with your actual JWT token
const TOKEN = process.env.TEST_TOKEN || 'your_jwt_token_here';

const baseURL = 'http://localhost:5001/api';

// Test routes
const routes = [
    { url: '/courses', method: 'get', needsAuth: false },
    { url: '/courses/admin-test', method: 'get', needsAuth: false },
    { url: '/courses/admin/courses', method: 'get', needsAuth: true },
    { url: '/courses/debug/test', method: 'get', needsAuth: false }
];

async function testRoutes() {
    console.log('Starting route tests...');

    for (const route of routes) {
        try {
            const config = {
                headers: {}
            };

            if (route.needsAuth) {
                config.headers['Authorization'] = `Bearer ${TOKEN}`;
            }

            console.log(`Testing ${route.method.toUpperCase()} ${baseURL}${route.url}`);
            console.log('Auth header:', route.needsAuth ? 'Yes' : 'No');

            const response = await axios[route.method](`${baseURL}${route.url}`, config);

            console.log(`✅ SUCCESS: ${route.method.toUpperCase()} ${route.url}`);
            console.log(`Status: ${response.status}`);
            console.log('Response:', response.data);
        } catch (error) {
            console.log(`❌ FAILED: ${route.method.toUpperCase()} ${route.url}`);

            if (error.response) {
                console.log(`Status: ${error.response.status}`);
                console.log('Error response:', error.response.data);
            } else {
                console.log('Error:', error.message);
            }
        }

        console.log('----------------------------');
    }

    console.log('Tests completed');
}

testRoutes(); 