import '../styles/globals.css';
import 'react-toastify/dist/ReactToastify.css';
import { SessionProvider } from 'next-auth/react';
import NextNProgress from 'nextjs-progressbar';

import { ToastContainer } from 'react-toastify';

function App({ Component, pageProps: { session, ...pageProps } }) {
  return (
    <>
      <NextNProgress color="#4f14e5" />
      <SessionProvider session={session}>
        <Component {...pageProps} />
      </SessionProvider>
      <ToastContainer />
    </>
  );
}

export default App;
