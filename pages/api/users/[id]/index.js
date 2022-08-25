import { getSession } from 'next-auth/react';
import prisma from '@/lib/prisma';
import excludeFields from 'utils/excludeFields';
import userValidator from '@/validator/userValidator';
import joiErrorParser from 'utils/joiErrorParser';

const handler = async (req, res) => {
  const session = await getSession({ req: req });
  if (!session) {
    return res.status(401).json({ status: 'error', message: 'Unauthorized' });
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

/**
 *
 * @param {import('next').NextApiRequest} req
 * @param {import('next').NextApiResponse} res
 */
const handlerGET = async (req, res) => {
  const id = req.query.id;
  try {
    let user = await prisma.user.findUnique({ where: { id } });
    user = excludeFields(user, 'password');

    if (!user) {
      return res.status(404).json({ status: 'error', message: 'User not found' });
    }

    return res.status(200).json({ status: 'success', data: user });
  } catch (err) {
    return res.status(500).json({ status: 'error', message: err.message });
  }
};

/**
 *
 * @param {import('next').NextApiRequest} req
 * @param {import('next').NextApiResponse} res
 */
const handlerPUT = async (req, res) => {
  const { name, class: userClass, nis } = req.body;
  const id = req.query.id;
  const { error } = userValidator.validate({ name, class: userClass, nis }, { abortEarly: false });
  const errors = joiErrorParser(error);

  delete errors.password;
  delete errors.email;

  if (Object.keys(errors).length) {
    return res.status(400).json({ status: 'error', errors });
  }

  try {
    const user = await prisma.user.update({
      where: { id },
      data: { name, class: userClass, nis },
    });
    return res.status(200).json({ status: 'success', data: user });
  } catch (err) {
    return res.status(500).json({ status: 'error', message: err.message });
  }
};

export default handler;
