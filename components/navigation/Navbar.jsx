import Link from 'next/link';
import Section from '../base/Section';
import ButtonFill from '../button/ButtonFill';
import ButtonOutline from '../button/ButtonOutline';
import { useSession } from 'next-auth/react';

export default function Navbar() {
  const { data: session, status } = useSession();
  return (
    <Section>
      <nav className="flex flex-col md:flex-row justify-between md:items-start items-center">
        <Link href="/">
          <a className="flex items-center gap-3">
            <div className="text-center md:text-left mb-5 md:mb-0">
              <h2 className="text-2xl font-extrabold text-gray-800">Arlubi Seven</h2>
              <p className="text-gray-600 text-xs">SMK Negeri 7 Semarang</p>
            </div>
          </a>
        </Link>
        <div className="space-x-5">
          {status !== 'authenticated' ? (
            <div className="flex gap-5">
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
            </div>
          ) : (
            <div className="flex gap-5 items-center">
              <div className="flex justify-center items-center gap-3">
                {session.user.image ? (
                  <div
                    style={{ backgroundImage: `url(${session.user.image})` }}
                    className="h-12 w-12 bg-gray-200 rounded-full bg-cover bg-center"
                  ></div>
                ) : (
                  <div className="h-12 w-12 bg-blue-200 rounded-full text-3xl justify-center items-center flex font-bold">
                    {session.user.name[0]}
                  </div>
                )}
                <div className="-space-y-1 hidden md:block">
                  <p className="font-medium">{session.user.name}</p>
                  {session.user.role === 'user' && <small className="text-xs block">{session.user.class}</small>}
                </div>
              </div>
              <Link href={session.user.role === 'admin' ? '/dashboard' : '/dashboard/setelan'}>
                <a>
                  <ButtonFill>Dashboard</ButtonFill>
                </a>
              </Link>
            </div>
          )}
        </div>
      </nav>
    </Section>
  );
}
