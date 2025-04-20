/** @format */

import handleFetch from './handleFetch';

export const getAllSkateboards = async () => {
  const [allSkateboards, error] = await handleFetch('/api/skateboards/');
  return [allSkateboards, error];
};

export const getSkateboardById = async (id) => {
  const [skateboard, error] = await handleFetch(`/api/skateboards/${id}`);
  return [skateboard, error];
};

export const createSkateboard = async (newSkateboard) => {
  const options = {
    method: 'POST',
    headers: { 'Content-type': 'application/json' },
    body: JSON.stringify({ newSkateboard }),
  };

  const [createdSkateboard, error] = await handleFetch(
    `/api/skateboards/`,
    options
  );
  return [createdSkateboard, error];
};

export const deleteSkateboard = async (id) => {
  const options = {
    method: 'DELETE',
  };
  const [success, error] = await handleFetch(`/api/skateboards/${id}`, options);
  return [success, error];
};

export const updateSkateboard = async (id, updates) => {
  const options = {
    method: 'PATCH',
    headers: { 'Content-type': 'application/json' },
    body: JSON.stringify(updates),
  };

  const [updatedSkateboard, error] = await handleFetch(
    `/api/skateboards/${id}`,
    options
  );
  return [updatedSkateboard, error];
};
