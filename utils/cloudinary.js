import { v2 as cloudinary } from 'cloudinary';

export const saveImageToCloudinary = async (filepath, upload_dir) => {
  try {
    return await cloudinary.uploader.upload(filepath, {
      folder: upload_dir,
    });
  } catch (err) {
    throw err;
  }
};

export const removeImageFromCloudinary = async (public_id) => {
  try {
    return await cloudinary.uploader.destroy(public_id);
  } catch (err) {
    throw err;
  }
};
