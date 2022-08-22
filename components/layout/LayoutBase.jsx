import Navbar from '../navigation/Navbar';

export default function LayoutBase({ children }) {
  return (
    <>
      <header className="mt-10">
        <Navbar />
      </header>
      <main className="py-10">{children}</main>
    </>
  );
}
