import prisma from '@/lib/prisma';

/**
 *
 * @param {import("next").NextApiRequest} req
 * @param {import("next").NextApiResponse} res
 */
const handler = async (req, res) => {
  switch (req.method) {
    case 'GET':
      return await handlerGET(req, res);
    default:
      return res.status(405).json({ status: 'error', message: `Method ${req.method} not allowed` });
  }
};

/**
 *
 * @param {import('next').NextApiRequest} req
 * @param {import('next').NextApiResponse} res
 */
const handlerGET = async (req, res) => {
  const { s } = req.query;
  try {
    const extracurriculars = await prisma.extracurricular.findMany({
      where: {
        name: {
          contains: s,
        },
      },
    });
    return res.status(200).json({ status: 'success', data: extracurriculars });
  } catch (err) {
    return res.status(500).json({ status: 'error', message: err.message });
  }
};

export default handler;
