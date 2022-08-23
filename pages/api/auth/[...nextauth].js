import NextAuth from 'next-auth/next';
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import prisma from '@/lib/prisma';
import bcrypt from 'bcrypt';
import CredentialsProvider from 'next-auth/providers/credentials';

const authHandler = (req, res) => NextAuth(req, res, options);

const options = {
  adapter: PrismaAdapter(prisma),
  secret: process.env.SECRET,
  pages: {
    signIn: '/auth/masuk',
    newUser: '/',
  },
  session: {
    strategy: 'jwt',
  },
  providers: [
    CredentialsProvider({
      credentials: {
        email: { label: 'Email', type: 'text', placeholder: 'Your Email' },
        password: { label: 'Password', type: 'password', placeholder: 'Your Password' },
      },
      async authorize(credentials, req) {
        const user = await prisma.user.findUnique({
          where: { email: credentials.email },
        });
        if (!user) {
          return null;
        }
        const isMatch = await bcrypt.compare(credentials.password, user.password);
        if (!isMatch) {
          return null;
        }
        return user;
      },
    }),
  ],
};

export default authHandler;
