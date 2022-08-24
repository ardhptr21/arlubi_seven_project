const { default: prisma } = require('@/lib/prisma');
const { getSession } = require('next-auth/react');

const handler = async (req, res) => {
  const session = getSession({ req });

  if (!session) {
    return res.status(401).json({ status: 'error', message: 'Unauthenticated' });
  }

  switch (req.method) {
    case 'GET':
      return await handlerGET(req, res);
    case 'PUT':
      return await handlerPUT(req, res);
    default:
      return res.status(405).json({ status: 'error', message: `Method ${req.method} not allowed` });
  }
};

const handlerGET = async (req, res) => {
  try {
    const requests = await prisma.usersOnExtracurriculars.findMany({
      where: {
        status: 'pending',
      },
      include: {
        user: {
          select: {
            name: true,
            class: true,
            image: true,
          },
        },
        extracurricular: {
          select: {
            name: true,
          },
        },
      },
    });

    return res.status(200).json({ status: 'success', data: requests });
  } catch (err) {
    return res.status(500).json({ status: 'error', message: err.message });
  }
};

export const handlerPUT = async (req, res) => {
  const { user_id, extracurricular_id, status = 'accepted' } = req.body;
  try {
    const userOnEc = await prisma.usersOnExtracurriculars.update({
      where: {
        user_id_extracurricular_id: {
          user_id,
          extracurricular_id,
        },
      },
      data: {
        status,
      },
    });

    return res.status(200).json({ status: 'success', data: userOnEc });
  } catch (err) {
    return res.status(500).json({ status: 'error', message: err.message });
  }
};

export default handler;
