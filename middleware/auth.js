import { getSession } from 'next-auth/react';

export const authenticated = (gssp) => {
  return async (ctx) => {
    const session = await getSession({ req: ctx.req });

    if (!session) {
      return {
        redirect: {
          destination: '/auth/masuk',
          permanent: false,
        },
      };
    }

    return await gssp(ctx);
  };
};

export const notAuthenticated = (gssp) => {
  return async (ctx) => {
    const session = await getSession({ req: ctx.req });

    if (session) {
      return {
        redirect: {
          destination: '/',
          permanent: false,
        },
      };
    }

    return await gssp(ctx);
  };
};
