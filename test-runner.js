#!/usr/bin/env node

const { execSync } = require('child_process');
const path = require('path');

console.log('🧪 Running Test Suite for Modelia 2.0\n');

// Test backend
console.log('📦 Testing Backend...');
try {
  execSync('cd backend && npm test', { stdio: 'inherit' });
  console.log('✅ Backend tests passed!\n');
} catch (error) {
  console.log('❌ Backend tests failed!\n');
  process.exit(1);
}

// Test frontend
console.log('⚛️  Testing Frontend...');
try {
  execSync('cd frontend && npm test', { stdio: 'inherit' });
  console.log('✅ Frontend tests passed!\n');
} catch (error) {
  console.log('❌ Frontend tests failed!\n');
  process.exit(1);
}

console.log('🎉 All tests passed!');
