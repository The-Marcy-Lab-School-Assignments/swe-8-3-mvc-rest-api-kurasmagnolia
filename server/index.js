/** @format */

////////////////////////
// Imports
////////////////////////

const express = require('express');
const path = require('path');
const getId = require('./utils/getId');

////////////////////////
// Constants
////////////////////////

const app = express();

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
