import prisma from '@/lib/prisma';
import { removeImageFromCloudinary } from '@/utils/cloudinary';
import parseSearchParams from '@/utils/parseSearchParams';
import { getSession } from 'next-auth/react';

/**
 *
 * @param {import('next').NextApiRequest} req
 * @param {import('next').NextApiResponse} res
 */
const handler = async (req, res) => {
  if (req.method === 'GET') return await handlerGET(req, res);

  const session = await getSession({ req });
  if (session?.user?.role !== 'admin') return res.status(403).json({ status: 'error', message: 'Unauthorized' });

  switch (req.method) {
    case 'DELETE':
      return await handlerDELETE(req, res);
    default:
      return res.status(405).json({ status: 'error', message: `Method ${req.method} not allowed` });
  }
};

const handlerGET = async (req, res) => {
  const { slug, user_id } = req.query;

  try {
    const extracurricular = await prisma.extracurricular.findUnique({
      where: {
        slug,
      },
      include: {
        users: {
          where: { status: 'accepted' },
          include: {
            user: {
              select: {
                name: true,
                class: true,
                image: true,
              },
            },
          },
        },
      },
    });

    if (!extracurricular) {
      return res.status(404).json({ status: 'error', message: 'Extracurricular not found' });
    }

    let status = null;
    if (user_id) {
      const useronec = await prisma.usersOnExtracurriculars.findUnique({
        where: {
          user_id_extracurricular_id: {
            user_id,
            extracurricular_id: extracurricular.id,
          },
        },
        select: { status: true },
      });
      status = useronec?.status;
    }
    return res.status(200).json({ status: 'success', data: { ...extracurricular, status } });
  } catch (err) {
    res.status(500).json({ status: 'error', message: err.message });
  }
};

const handlerDELETE = async (req, res) => {
  const { slug: id } = req.query;

  if (!id) return res.status(400).json({ status: 'error', message: 'Missing id' });
  try {
    const ec = await prisma.extracurricular.delete({ where: { id } });

    if (ec.card_image) {
      await removeImageFromCloudinary(parseSearchParams(ec.card_image).get('public_id'));
    }
    if (ec.header_image) {
      await removeImageFromCloudinary(parseSearchParams(ec.header_image).get('public_id'));
    }

    return res.status(200).json({ status: 'success', data: ec });
  } catch (err) {
    res.status(500).json({ status: 'error', message: err.message });
  }
};

export default handler;
