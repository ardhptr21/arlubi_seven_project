import axios from 'axios';
const BASE_API_URL = process.env.BASE_API_URL || 'http://localhost:3000';

export const uploadImage = async (image, path) => {
  const formData = new FormData();
  formData.append('image', image);
  formData.append('path', path);

  try {
    const res = await axios.post(`${BASE_API_URL}/api/images/upload`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    return res.data.data;
  } catch (err) {
    throw err;
  }
};
