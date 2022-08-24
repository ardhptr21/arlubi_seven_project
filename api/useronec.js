import axios from 'axios';

const BASE_API_URL = process.env.BASE_API_URL || 'http://localhost:3000';

export const sendRequest = async (user_id, ec_id) => {
  try {
    const res = axios.post(`${BASE_API_URL}/api/useronec`, { user_id, ec_id });
    return res.data;
  } catch (err) {
    throw err;
  }
};
