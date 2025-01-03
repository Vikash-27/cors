const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
const cors = require('cors');

const app = express();
const PORT = 3001;

app.use(express.json());
app.use(cors());

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});

app.use('/api/proxy/swiggy/dapi', createProxyMiddleware({
  target: 'https://www.swiggy.com',
  changeOrigin: true,
  pathRewrite: {
    '^/api/proxy/swiggy/dapi': '/dapi',
  },
}));

app.get('/', (req, res) => {
  res.send('<h1>Welcome to the Food Delivery App</h1>');
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});