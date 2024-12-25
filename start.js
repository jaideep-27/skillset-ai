const { spawn } = require('child_process');
const path = require('path');

// Increase memory limit and set development environment
const env = Object.assign({}, process.env, {
  NODE_ENV: 'development',
  BROWSER: 'none', // Prevent auto-opening browser
  PORT: 3001
});

// Start the development server with increased memory
const startServer = spawn('node', [
  '--max-old-space-size=8192', // 8GB memory limit
  path.join(__dirname, 'node_modules', 'react-scripts', 'scripts', 'start.js')
], {
  env,
  stdio: 'inherit'
});

startServer.on('error', (err) => {
  console.error('Failed to start server:', err);
  process.exit(1);
});

process.on('SIGINT', () => {
  startServer.kill('SIGINT');
  process.exit(0);
});
