import Navbar from '@/components/navigation/Navbar';
import '../styles/globals.css';

function App({ Component, pageProps }) {
  return (
    <>
      <header className="mt-10">
        <Navbar />
      </header>
      <main className="py-10">
        <Component {...pageProps} />
      </main>
    </>
  );
}

export default App;
