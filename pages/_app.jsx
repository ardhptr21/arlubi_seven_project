import '../styles/globals.css';

function App({ Component, pageProps }) {
  return (
    <main className="py-10">
      <Component {...pageProps} />
    </main>
  );
}

export default App;
