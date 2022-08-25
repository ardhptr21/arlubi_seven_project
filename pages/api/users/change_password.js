import { getSession } from 'next-auth/react';
import bcrypt from 'bcrypt';
import passwordValidator from '@/validator/passwordValidator';
import joiErrorParser from '@/utils/joiErrorParser';
import prisma from '@/lib/prisma';

const handler = async (req, res) => {
  if (req.method !== 'PUT') return res.status(405).json({ error: `Method ${req.method} not allowed` });

  const session = await getSession({ req });
  if (!session?.user?.role === 'admin') {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  const { old_password, new_password, confirm_new_password, id } = req.body;

  const { error } = passwordValidator.validate(
    { old_password, new_password, confirm_new_password },
    { abortEarly: false }
  );

  if (error) {
    return res.status(400).json({ status: 'error', errors: joiErrorParser(error) });
  }

  try {
    const user = await prisma.user.findUnique({ where: { id } });
    const isMatch = await bcrypt.compare(old_password, user.password);
    if (!isMatch) {
      return res.status(400).json({ status: 'error', errors: { old_password: 'Old password is incorrect' } });
    }

    const hashing = await bcrypt.hash(new_password, 10);

    await prisma.user.update({
      where: { id },
      data: { password: hashing },
    });

    return res.status(200).json({ status: 'success', message: 'Password changed successfully' });
  } catch (err) {
    res.status(500).json({ status: 'error', error: err.message });
  }
};

export default handler;
