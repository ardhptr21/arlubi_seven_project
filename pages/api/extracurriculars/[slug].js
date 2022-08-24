import prisma from '@/lib/prisma';

/**
 *
 * @param {import('next').NextApiRequest} req
 * @param {import('next').NextApiResponse} res
 */
const handler = async (req, res) => {
  if (req.method !== 'GET') {
    return res.status(405).json({ status: 'error', message: `Method ${req.method} not allowed` });
  }

  const { slug, user_id } = req.query;

  try {
    const extracurricular = await prisma.extracurricular.findUnique({
      where: {
        slug,
      },
      include: {
        users: {
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

export default handler;
