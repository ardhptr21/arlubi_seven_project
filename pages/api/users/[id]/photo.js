import { getSession } from 'next-auth/react';
import formidable from '@/utils/formidable';
import { removeImageFromCloudinary, saveImageToCloudinary } from '@/utils/cloudinary';
import prisma from '@/lib/prisma';
import parseSearchParams from '@/utils/parseSearchParams';

export const config = {
  api: {
    bodyParser: false,
  },
};

const handler = async (req, res) => {
  if (req.method !== 'PATCH') {
    return res.status('405').json({ status: 'error', message: `Method ${req.method} not allowed` });
  }

  const session = getSession({ req });
  if (!session) {
    return res.status(401).json({ status: 'error', message: `Method ${req.method} not allowed` });
  }

  const id = req.query.id;

  try {
    const {
      files: { image },
    } = await formidable(req);

    const { public_id, secure_url } = await saveImageToCloudinary(image.filepath, 'user_photos');

    const user_before = await prisma.user.findUnique({ where: { id }, select: { image: true } });

    let data = await prisma.user.update({
      where: { id },
      data: {
        image: `${secure_url}?public_id=${public_id}`,
      },
      select: { image: true },
    });

    if (user_before.image) {
      await removeImageFromCloudinary(parseSearchParams(user_before.image).get('public_id'));
    }
    return res.status(200).json({ status: 'success', data: data.image });
  } catch (err) {
    return res.status(500).json({ status: 'error', message: err.message });
  }
};

export default handler;
