import Section from '../base/Section';
import ButtonFill from '../button/ButtonFill';
import ButtonOutline from '../button/ButtonOutline';

export default function Navbar() {
  return (
    <Section>
      <nav className="flex justify-between">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-full bg-indigo-300"></div>
          <div>
            <h2 className="font-bold text-gray-800">Ekstrakurikuler</h2>
            <p className="text-gray-600 text-xs">12 Ekstrakurikuler</p>
          </div>
        </div>
        <div className="space-x-5">
          <ButtonFill>Masuk</ButtonFill>
          <ButtonOutline>Daftar</ButtonOutline>
        </div>
      </nav>
    </Section>
  );
}
