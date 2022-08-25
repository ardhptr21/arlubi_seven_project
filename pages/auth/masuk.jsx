import ButtonFill from '@/components/button/ButtonFill';
import Input from '@/components/form/Input';
import Link from 'next/link';
import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { notAuthenticated } from 'middleware/auth';
import Head from 'next/head';

export default function Masuk() {
  const [credentials, setCredentials] = useState({
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    signIn('credentials', credentials);
  };
  return (
    <>
      <Head>
        <title>Masuk</title>
      </Head>
      <div className="max-w-screen-xl px-4 py-16 mx-auto sm:px-6 lg:px-8">
        <div className="max-w-lg mx-auto" onSubmit={handleSubmit}>
          <h1 className="text-2xl font-bold text-center text-indigo-600 sm:text-3xl">Masuk ke Akun</h1>
          <p className="mt-1 text-center text-gray-600">Silahkan masuk ke akunmu terlebih dahulu</p>

          <form action="" className="p-8 mt-6 mb-0 space-y-4 rounded-lg border-2 border-gray-200">
            <Input
              onChange={handleChange}
              value={credentials.email}
              name="email"
              type="email"
              title="Email"
              placeholder="Masukkan email"
            />
            <Input
              onChange={handleChange}
              value={credentials.password}
              name="password"
              type="password"
              title="Password"
              placeholder="Masukkan password"
            />

            <ButtonFill type="submit" className="w-full">
              Masuk
            </ButtonFill>

            <p className="text-sm text-center text-gray-600">
              Belum punya akun?
              <Link href="/auth/daftar">
                <a className="px-2 underline text-indigo-600">Daftar</a>
              </Link>
            </p>
          </form>
        </div>
      </div>
    </>
  );
}

export const getServerSideProps = notAuthenticated(async (ctx) => ({ props: {} }));
