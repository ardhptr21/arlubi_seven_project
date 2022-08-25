import axios from 'axios';

const BASE_API_URL = process.env.BASE_API_URL || 'http://localhost:3000';

export const getExtracurriculars = async (s = '', user_id = '') => {
  try {
    const res = await axios.get(`${BASE_API_URL}/api/extracurriculars?s=${s}&user_id=${user_id}`);
    return res.data.data;
  } catch (err) {
    throw err;
  }
};

export const getExtracurricular = async (slug, user_id = '') => {
  try {
    const res = await axios.get(`${BASE_API_URL}/api/extracurriculars/${slug}?user_id=${user_id}`);
    return res.data.data;
  } catch (err) {
    throw err;
  }
};

export const addExtraCurricular = async (extracurricular) => {
  try {
    const res = await axios.post(`${BASE_API_URL}/api/extracurriculars`, extracurricular);
    return [res.data.data, null];
  } catch (err) {
    if (!err?.response?.data?.errors) {
      throw err;
    }
    return [null, err?.response?.data?.errors];
  }
};

export const deleteExtraCurricular = async (id) => {
  try {
    const res = await axios.delete(`${BASE_API_URL}/api/extracurriculars/${id}`);
    return res.data.data;
  } catch (err) {
    throw err;
  }
};

export const updateExtraCurricular = async (id, extracurricular) => {
  try {
    const res = await axios.put(`${BASE_API_URL}/api/extracurriculars/${id}`, extracurricular);
    return [res.data.data, null];
  } catch (err) {
    if (!err?.response?.data?.errors) {
      throw err;
    }
    return [null, err?.response?.data?.errors];
  }
};
