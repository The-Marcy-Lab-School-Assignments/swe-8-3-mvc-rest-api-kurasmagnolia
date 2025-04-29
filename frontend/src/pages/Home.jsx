/** @format */

import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  getAllSkateboards,
  createSkateboard,
} from '../adapters/skateboardAdapters';

const Home = () => {
  const [skateboards, setSkateboards] = useState([]);
  const [newSkateboard, setNewSkateboard] = useState({
    name: '',
    brand: '',
    type: '',
    style: '',
    color: '',
    size: '',
    price: '',
    image: '',
  });
  const [newlyAddedSkateboard, setNewlyAddedSkateboard] = useState({});

  useEffect(() => {
    const doFetch = async () => {
      const [allSkateboards, error] = await getAllSkateboards();
      if (!error) setSkateboards(allSkateboards);
    };
    doFetch();
  }, [newlyAddedSkateboard]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewSkateboard((prev) => ({
      ...prev,
      [name]: name === 'price' ? parseFloat(value) : value,
    }));
  };

  const handleCreateSkateboard = async (e) => {
    e.preventDefault();
    const [createdSkateboard, error] = await createSkateboard(newSkateboard);
    if (!error) {
      setNewlyAddedSkateboard(createdSkateboard);
      setNewSkateboard({
        name: '',
        brand: '',
        type: '',
        style: '',
        color: '',
        size: '',
        price: '',
        image: '',
      });
    }
  };

  return (
    <>
      <h1>Welcome to King's Skateboard Hub!</h1>
      <h2>Submit one of your favorite skateboards!</h2>
      <h3>
        P.S: For images, copy the "Image address" of it and paste it in the
        Image URL field!
      </h3>

      <form onSubmit={handleCreateSkateboard}>
        <label>
          Name:{' '}
          <input
            name="name"
            value={newSkateboard.name}
            onChange={handleInputChange}
          />
        </label>
        <br />
        <label>
          Brand:{' '}
          <input
            name="brand"
            value={newSkateboard.brand}
            onChange={handleInputChange}
          />
        </label>
        <br />
        <label>
          Type:{' '}
          <input
            name="type"
            value={newSkateboard.type}
            onChange={handleInputChange}
          />
        </label>
        <br />
        <label>
          Style:{' '}
          <input
            name="style"
            value={newSkateboard.style}
            onChange={handleInputChange}
          />
        </label>
        <br />
        <label>
          Color:{' '}
          <input
            name="color"
            value={newSkateboard.color}
            onChange={handleInputChange}
          />
        </label>
        <br />
        <label>
          Size:{' '}
          <input
            name="size"
            value={newSkateboard.size}
            onChange={handleInputChange}
          />
        </label>
        <br />
        <label>
          Price:{' '}
          <input
            name="price"
            type="number"
            step="0.01"
            value={newSkateboard.price}
            onChange={handleInputChange}
          />
        </label>
        <br />
        <label>
          Image URL:{' '}
          <input
            name="image"
            value={newSkateboard.image}
            onChange={handleInputChange}
          />
        </label>
        <br />
        <button type="submit" style={{ marginTop: '10px' }}>
          Submit
        </button>
      </form>

      <h3>List of skateboards:</h3>
      <ul>
        {skateboards.map((skateboard) => (
          <li key={skateboard.id}>
            <Link to={`/skateboards/${skateboard.id}`}>
              {skateboard.name} (${skateboard.price})
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
};

export default Home;
