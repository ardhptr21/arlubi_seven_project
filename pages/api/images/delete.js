import { removeImageFromCloudinary } from '@/utils/cloudinary';
import { getSession } from 'next-auth/react';

const handler = async (req, res) => {
  if (req.method !== 'DELETE') return res.status(405).json({ status: 'error', message: 'Method not allowed' });

  const session = await getSession({ req });
  if (!session) return res.status(401).json({ status: 'error', message: 'Unauthenticated' });

  const public_id = req.body.public_id;

  if (!public_id) return res.status(400).json({ status: 'error', message: 'Missing public_id' });

  try {
    const result = await removeImageFromCloudinary(public_id);
    return res.status(200).json({ status: 'success', data: result });
  } catch (err) {
    return res.status(500).json({ status: 'error', message: err?.message });
  }
};

export default handler;
