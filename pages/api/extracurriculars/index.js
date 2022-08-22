import prisma from '@/lib/prisma';
import extracurricularValidator from '@/validator/extracurricularValidator';
import joiErrorParser from 'utils/joiErrorParser';

/**
 *
 * @param {import("next").NextApiRequest} req
 * @param {import("next").NextApiResponse} res
 */
const handler = async (req, res) => {
  switch (req.method) {
    case 'GET':
      return await handlerGET(req, res);
    case 'POST':
      return await handlerPOST(req, res);
    case 'DELETE':
      return await handlerDELETE(req, res);
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

/**
 *
 * @param {import('next').NextApiRequest} req
 * @param {import('next').NextApiResponse} res
 */
const handlerPOST = async (req, res) => {
  const { name, short, long, header_image } = req.body;

  const { error, value } = extracurricularValidator.validate({ name, short, long, header_image });

  if (error) return res.status(400).json({ status: 'error', errors: joiErrorParser(error) });

  const slug = name.toLowerCase().replace(/ /g, '-');

  try {
    const extracurricular = await prisma.extracurricular.create({ data: { ...value, slug } });
    return res.status(201).json({ status: 'success', data: extracurricular });
  } catch (err) {
    return res.status(500).json({ status: 'error', message: err.message });
  }
};

/**
 *
 * @param {import('next').NextApiRequest} req
 * @param {import('next').NextApiResponse} res
 */
const handlerDELETE = async (req, res) => {
  const id = req.body.id;

  if (!id) {
    return res.status(400).json({ status: 'error', message: 'id is required' });
  }

  try {
    const extracurricular = await prisma.extracurricular.delete({ where: { id } });
    return res.status(200).json({ status: 'success', data: extracurricular });
  } catch (err) {
    return res.status(500).json({ status: 'error', message: err.message });
  }
};

export default handler;
