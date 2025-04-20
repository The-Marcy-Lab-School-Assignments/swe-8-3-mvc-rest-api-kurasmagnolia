/** @format */

////////////////////////
// Imports
////////////////////////

const express = require('express');
const path = require('path');
const {
  serveSkateboards,
  serveSkateboard,
  createSkateboard,
  updateSkateboard,
  deleteSkateboard,
} = require('./controllers/skateboardControllers');

////////////////////////
// Constants
////////////////////////

const PORT = 8080;
const app = express();
const pathToFrontendDist = path.join(__dirname, '../frontend/dist');

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
// Endpoints
////////////////////////
app.get('/api/skateboards', serveSkateboards);
app.get('/api/skateboards/:id', serveSkateboard);
app.post('/api/skateboards', createSkateboard);
app.patch('/api/skateboards/:id', updateSkateboard);
app.delete('/api/skateboards/:id', deleteSkateboard);

// NOT WORKING: causing an error
// app.get('*', (req, res, next) => {
//   if (req.originalUrl.startsWith('/api')) return next();
//   res.sendFile(pathToFrontendDist);
// });

////////////////////////
// Listener
////////////////////////
app.listen(PORT, () => console.log(`listening at http://localhost:${PORT}`));
