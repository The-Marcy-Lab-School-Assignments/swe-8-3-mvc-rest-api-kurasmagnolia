/** @format */
// imports
const Skateboard = require('../models/Skateboards');

////////////////////////
// Controllers
////////////////////////

// Get all skateboards (READ)
const serveSkateboards = (req, res) => {
  const skateboardsList = Skateboard.listSkateboards();
  res.send(skateboardsList);
};

// Get one skateboard (READ)
const serveSkateboard = (req, res) => {
  const { id } = req.params;
  const skateboard = Skateboard.findSkateboard(Number(id));

  if (!skateboard) {
    return res.status(404).send({
      message: `There was no skateboard found with the id ${id}.`,
    });
  }
  res.send(skateboard);
};

// Create a new skateboard (CREATE)
const createSkateboard = (req, res) => {
  const { skateboardName } = req.body;
  if (!skateboardName) {
    return res
      .status(400)
      .send({ message: 'Invalid Skateboard Info. Please try again!' });
  }

  const newSkateboard = Skateboard.createSkateboard(skateboardName);
  res.send(newSkateboard);
};

// const updateSkateboard = (req, res) => {
//   const { property } = req.body;

//   if (!property) {
//     return res.status(400).send({ message: 'Invalid Property' });
//   }

//   const updatedSkateboard = Skateboard.editSkateboardProperty();
// };

const deleteSkateboard = (req, res) => {
  const { id } = req.params;
  const didDelete = Skateboard.deleteSkateboard(Number(id));

  if (!didDelete) {
    return res.status(404).send({
      message: `No skateboard was found with the id ${id}`,
    });
  }
  res.sendStatus(204);
};

module.exports = {
  serveSkateboards,
  serveSkateboard,
  createSkateboard,
  updateSkateboard,
  deleteSkateboard,
};
