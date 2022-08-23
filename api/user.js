import axios from 'axios';

const BASE_API_URL = process.env.BASE_API_URL || 'http://localhost:3000';

export const getUser = async (id) => {
  try {
    const res = await axios.get(`${BASE_API_URL}/api/users/${id}`);
    return res.data.data;
  } catch (err) {
    throw err;
  }
};

export const updateUser = async (credentials, id) => {
  try {
    const res = await axios.put(`${BASE_API_URL}/api/users/${id}`, credentials);
    return [res.data.data, null];
  } catch (err) {
    if (!err?.response?.data?.errors) {
      throw err;
    }
    return [null, err?.response?.data?.errors];
  }
};

export const addUser = async (credentials) => {
  try {
    const res = await axios.post(`${BASE_API_URL}/api/users`, credentials);
    return [res.data.data, null];
  } catch (err) {
    if (!err?.response?.data?.errors) {
      throw err;
    }
    return [null, err?.response?.data?.errors];
  }
};
