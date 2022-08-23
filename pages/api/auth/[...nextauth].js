import NextAuth from 'next-auth/next';
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import prisma from '@/lib/prisma';
import CredentialsProvider from 'next-auth/providers/credentials';

const authHandler = (req, res) => NextAuth(req, res, options);

const options = {
  adapter: PrismaAdapter(prisma),
  secret: process.env.SECRET,
  session: {
    strategy: 'jwt',
  },
  providers: [
    CredentialsProvider({
      credentials: {
        email: { label: 'Email', type: 'text', placeholder: 'Your Email' },
        password: { label: 'password', type: 'password', placeholder: 'Your Password' },
      },
    }),
  ],
};

export default authHandler;
