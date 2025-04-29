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
  const { name, brand, type, style, color, size, price, image } = req.body;

  if (
    !name ||
    !brand ||
    !type ||
    !style ||
    !color ||
    !size ||
    !price ||
    !image
  ) {
    return res.status(400).send({
      message: 'Invalid Skateboard Info. Please fill out all required fields!',
    });
  }

  try {
    const newSkateboard = Skateboard.createSkateboard(
      name,
      brand,
      type,
      style,
      color,
      size,
      price,
      image
    );
    res.status(201).send(newSkateboard);
  } catch (error) {
    res.status(500).send({
      message: 'Something went wrong creating the skateboard.',
      error: error.message,
    });
  }
};

const updateSkateboard = (req, res) => {
  const { id } = req.params;
  const updates = req.body;

  if (!id || !updates || Object.keys(updates).length === 0) {
    return res.status(400).send({ message: 'Invalid update request.' });
  }

  const updatedSkateboard = Skateboard.editSkateboardProperty(
    Number(id),
    updates
  );

  if (!updatedSkateboard) {
    return res.status(404).send({ message: 'Skateboard not found.' });
  }

  res.send(updatedSkateboard);
};

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
