// Import required modules
const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
const cors = require('cors');

// Create an Express app
const app = express();
const PORT = 3001;

// Middleware to parse JSON requests
app.use(express.json());

// Enable CORS
app.use(cors());

// Define CORS middleware
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});

// Define Swiggy API proxy route
app.use('/api/proxy/swiggy/dapi', createProxyMiddleware({
  target: 'https://www.swiggy.com',
  changeOrigin: true,
  pathRewrite: {
    '^/api/proxy/swiggy/dapi': '/dapi',
  },
}));

// Test route
app.get('/', (req, res) => {
  res.send('<h1>Welcome to the Food Delivery App</h1>');
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});