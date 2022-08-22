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

  const { slug } = req.query;

  try {
    const extracurricular = await prisma.extracurricular.findUnique({
      where: {
        slug,
      },
    });

    if (!extracurricular) {
      return res.status(404).json({ status: 'error', message: 'Extracurricular not found' });
    }

    return res.status(200).json({ status: 'success', data: extracurricular });
  } catch (err) {
    res.status(500).json({ status: 'error', message: err.message });
  }
};

export default handler;
