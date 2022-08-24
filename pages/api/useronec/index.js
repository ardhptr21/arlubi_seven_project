import prisma from '@/lib/prisma';
import { getSession } from 'next-auth/react';

const handler = async (req, res) => {
  const session = await getSession({ req: req });
  if (!session) {
    return res.status(401).json({ status: 'error', message: 'Unauthenticated' });
  }

  switch (req.method) {
    case 'POST':
      return await handlerPOST(req, res);
    default:
      return res.status(405).json({ status: 'error', message: `Method ${req.method} not allowed` });
  }
};

/**
 *
 * @param {import('next').NextApiRequest} req
 * @param {import('next').NextApiResponse} res
 */
const handlerPOST = async (req, res) => {
  const { user_id, ec_id } = req.body;
  try {
    await prisma.user.update({
      where: { id: user_id },
      data: {
        extracurriculars: {
          connectOrCreate: {
            where: {
              user_id_extracurricular_id: {
                user_id: user_id,
                extracurricular_id: ec_id,
              },
            },
            create: {
              extracurricular_id: ec_id,
            },
          },
        },
      },
    });

    return res.status(200).json({ status: 'success', message: 'Berhasil mengajukan bergabung' });
  } catch (err) {
    return res.status(500).json({ status: 'error', message: err.message });
  }
};

export default handler;
