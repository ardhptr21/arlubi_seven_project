import userValidator from '@/validator/userValidator';
import prisma from '@/lib/prisma';
import joiErrorParser from 'utils/joiErrorParser';
import bcrypt from 'bcrypt';

const handler = async (req, res) => {
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
  const { name, email, nis, class: userClass, password, confirm_password } = req.body;

  const { value, error } = userValidator.validate(
    { name, email, nis, class: userClass, password },
    { abortEarly: false }
  );

  if (error) return res.status(400).json({ status: 'error', errors: joiErrorParser(error) });

  if (password !== confirm_password)
    return res.status(400).json({ status: 'error', errors: { confirm_password: 'Password does not same' } });

  try {
    value.password = await bcrypt.hash(value.password, 10);
    value.nis = value.nis.toString();
    const user = await prisma.user.create({ data: value });
    return res.status(201).json({ status: 'success', data: user });
  } catch (err) {
    return res.status(500).json({ status: 'error', message: err.message });
  }
};

export default handler;
