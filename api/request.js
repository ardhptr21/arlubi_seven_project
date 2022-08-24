import axios from 'axios';

const BASE_API_URL = process.env.BASE_API_URL || 'http://localhost:3000';

export const getRequests = async () => {
  try {
    const res = await axios.get(`${BASE_API_URL}/api/request`);
    return res.data.data;
  } catch (err) {
    throw err;
  }
};

export const changeStatus = async (user_id, extracurricular_id, status) => {
  try {
    const res = await axios.put(`${BASE_API_URL}/api/request`, { user_id, extracurricular_id, status });
    return res.data.data;
  } catch (err) {
    throw err;
  }
};
