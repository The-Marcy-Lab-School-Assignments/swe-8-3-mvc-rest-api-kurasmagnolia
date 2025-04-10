/** @format */

////////////////////////
// Imports
////////////////////////

const express = require('express');
const path = require('path');
const getId = require('./utils/getId');
const PORT = 8080;

////////////////////////
// Constants
////////////////////////

const app = express();
const pathToFrontendDist = path.join(__dirname, '../frontend/dist');

// Mock Database
const skateboards = [
  {
    name: '',
    id: getId(),
    brand: '',
    size: '',
    color: '',
    style: '',
    price: 0,
    image: '',
  },
  {
    name: '',
    id: getId(),
    brand: '',
    size: '',
    color: '',
    style: '',
    price: 0,
    image: '',
  },
  {
    name: '',
    id: getId(),
    brand: '',
    size: '',
    color: '',
    style: '',
    price: 0,
    image: '',
  },
];

////////////////////////
// Middleware
////////////////////////

const logRoutes = (req, res, next) => {
  const time = new Date().toLocaleString();
  req.time = time;
  console.log(`${req.method}: ${req.originalUrl} - ${time}`);
  next();
};

const serveStatic = express.static(pathToFrontendDist);

app.use(logRoutes); // Print out every incoming request
app.use(serveStatic); // Serve static public/ content
app.use(express.json());

////////////////////////
// Controllers
////////////////////////

////////////////////////
// Endpoints
////////////////////////

////////////////////////
// Listener
////////////////////////
app.listen(PORT, () => console.log(`listening at http://localhost:${PORT}`));
