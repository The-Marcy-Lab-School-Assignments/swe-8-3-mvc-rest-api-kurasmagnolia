/** @format */

import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import {
  getSkateboardById,
  updateSkateboard,
  deleteSkateboard,
} from '../adapters/skateboardAdapters';

const SkateboardDetails = () => {
  const [skateboard, setSkateboard] = useState({});

  const [selectedField, setSelectedField] = useState('');
  const [fieldValue, setFieldValue] = useState('');
  const [updateMessage, setUpdateMessage] = useState('');
  const { id } = useParams();
  const navigate = useNavigate();

  // on load, get the skateboard by its id
  useEffect(() => {
    const doFetch = async () => {
      const [foundSkateboard, error] = await getSkateboardById(id);
      if (foundSkateboard) {
        setSkateboard(foundSkateboard);
      }
    };
    doFetch();
  }, [id]);

  // when the delete button is pressed, send a DELETE request
  const handleDeleteSkateboard = async () => {
    await deleteSkateboard(id);
    navigate('/');
  };

  // Form logic for updating a single field
  const handleUpdateSkateboard = async (e) => {
    e.preventDefault();
    if (!selectedField || fieldValue.trim() === '') return;

    const updates = {
      [selectedField]:
        selectedField === 'price' ? parseFloat(fieldValue) : fieldValue,
    };
    const [updatedSkateboard, error] = await updateSkateboard(id, updates);
    if (!error && updatedSkateboard) {
      setSkateboard(updatedSkateboard);
      setSelectedField('');
      setFieldValue('');
      setUpdateMessage('SKATEBOARD UPDATED!');

      setTimeout(() => {
        setUpdateMessage('');
      }, 3000);
    }
  };
  const handleFieldSelection = (e) => {
    setSelectedField(e.target.value);
    setFieldValue(''); // reset the input value when field changes
  };

  const handleFieldChange = (e) => {
    setFieldValue(e.target.value);
  };

  const updatableFields = [
    'name',
    'brand',
    'type',
    'style',
    'color',
    'size',
    'price',
    'image',
  ];

  return (
    <>
      <Link to="/">Go Home</Link>
      <h1>Skateboard Details</h1>
      {skateboard.image && (
        <img
          src={skateboard.image}
          alt={skateboard.name}
          style={{ width: '300px' }}
        />
      )}
      <p>
        Name: <b>{skateboard.name}</b>
      </p>
      <p>
        ID: <b>{skateboard.id}</b>
      </p>
      <p>
        Brand: <b>{skateboard.brand}</b>
      </p>
      <p>
        Type: <b>{skateboard.type}</b>
      </p>
      <p>
        Style: <b>{skateboard.style}</b>
      </p>
      <p>
        Color: <b>{skateboard.color}</b>
      </p>
      <p>
        Size: <b>{skateboard.size}</b>
      </p>
      <p>
        Price: <b>{skateboard.price}</b>
      </p>
      {updateMessage && (
        <p className="update-message">
          <b>{updateMessage}</b>
        </p>
      )}
      <form onSubmit={handleUpdateSkateboard}>
        <label htmlFor="field">Select a field to update:</label>
        <select
          name="field"
          id="field"
          value={selectedField}
          onChange={handleFieldSelection}
        >
          <option value="">-- Select --</option>
          {updatableFields.map((field) => (
            <option key={field} value={field}>
              {field.charAt(0).toUpperCase() + field.slice(1)}
            </option>
          ))}
        </select>

        {selectedField && (
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              marginTop: '10px',
            }}
          >
            <label htmlFor="fieldValue" style={{ flexShrink: 0 }}>
              {selectedField.charAt(0).toUpperCase() + selectedField.slice(1)}:
            </label>
            <input
              type={selectedField === 'price' ? 'number' : 'text'}
              id="fieldValue"
              name="fieldValue"
              value={fieldValue}
              onChange={handleFieldChange}
              style={{ flexGrow: 1 }}
            />
            <button
              type="submit"
              disabled={!selectedField || fieldValue.trim() === ''}
              style={{ marginLeft: 'auto' }}
            >
              Submit Update
            </button>
          </div>
        )}
      </form>
      <button onClick={handleDeleteSkateboard} className="danger">
        Delete Skateboard
      </button>
    </>
  );
};

export default SkateboardDetails;
