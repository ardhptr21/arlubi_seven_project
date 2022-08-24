import Link from 'next/link';
import Section from '../base/Section';
import ButtonFill from '../button/ButtonFill';
import ButtonOutline from '../button/ButtonOutline';
import { useSession } from 'next-auth/react';

export default function Navbar() {
  const { data: session, status } = useSession();
  return (
    <Section>
      <nav className="flex justify-between">
        <Link href="/">
          <a className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-full bg-indigo-300"></div>
            <div>
              <h2 className="font-bold text-gray-800">Ekstrakurikuler</h2>
              <p className="text-gray-600 text-xs">1 Ekstrakurikuler</p>
            </div>
          </a>
        </Link>
        <div className="space-x-5">
          {status !== 'authenticated' ? (
            <>
              <Link href="/auth/masuk">
                <a>
                  <ButtonFill>Masuk</ButtonFill>
                </a>
              </Link>
              <Link href="/auth/daftar">
                <a>
                  <ButtonOutline>Daftar</ButtonOutline>
                </a>
              </Link>
            </>
          ) : (
            <Link href="/dashboard">
              <a className="flex justify-center items-center gap-3">
                <div className="h-12 w-12 bg-gray-200 rounded-full"></div>
                <p className="font-medium">{session.user.name}</p>
              </a>
            </Link>
          )}
        </div>
      </nav>
    </Section>
  );
}
