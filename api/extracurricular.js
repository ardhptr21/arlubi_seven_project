import axios from 'axios';

const BASE_API_URL = process.env.BASE_API_URL || 'http://localhost:3000';

export const getExtracurriculars = async () => {
  try {
    const res = await axios.get(`${BASE_API_URL}/api/extracurriculars`);
    return res.data.data;
  } catch (err) {
    throw err;
  }
};

export const addExtraCurricular = async (extraCurricular) => {
  try {
    const res = await axios.post(`${BASE_API_URL}/api/extracurriculars`, extraCurricular);
    return [res.data, null];
  } catch (err) {
    return [null, err?.response?.data.errors];
  }
};
