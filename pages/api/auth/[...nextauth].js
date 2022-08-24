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
  callbacks: {
    async session({ session, user, token }) {
      let userFind = await prisma.user.findUnique({ where: { id: token.sub } });
      session.user.id = userFind.id;
      session.user.email = userFind.email;

      if (userFind.role) {
        session.user.role = userFind.role;
      } else {
        session.user.name = userFind.name;
        session.user.class = userFind.class;
        session.user.nis = userFind.nis;
        session.user.image = userFind.image;
      }
      return session;
    },
  },
  providers: [
    CredentialsProvider({
      credentials: {
        email: { label: 'Email', type: 'text', placeholder: 'Your Email' },
        password: { label: 'Password', type: 'password', placeholder: 'Your Password' },
      },
      async authorize(credentials) {
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
