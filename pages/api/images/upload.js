import formidable from '@/utils/formidable';
import { saveImageToCloudinary } from '@/utils/cloudinary';
import { getSession } from 'next-auth/react';

export const config = {
  api: {
    bodyParser: false,
  },
};

const handler = async (req, res) => {
  if (req.method !== 'POST') return res.status(405).json({ status: '', message: 'Method not allowed' });
  const session = await getSession({ req });

  if (!session) {
    return res.status(401).json({ status: 'error', message: 'Unauthenticated' });
  }

  try {
    const { fields, files } = await formidable(req);
    const { public_id, secure_url } = await saveImageToCloudinary(files.image.filepath, fields.path);
    return res.status(200).json({ status: 'success', data: { public_id, secure_url } });
  } catch (err) {
    return res.status(500).json({ status: 'error', message: err.message });
  }
};

export default handler;
