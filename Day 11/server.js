const express = require('express');
const connectDB = require('./config/db');

const app = express();
const PORT = 5000;

// Connect Database
connectDB();

// Middleware
app.use(express.json());

// Test Route
app.get('/', (req, res) => {
  res.send('Mobile Recharge Backend is running');
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
