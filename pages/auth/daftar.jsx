import ButtonFill from '@/components/button/ButtonFill';
import Input from '@/components/form/Input';
import { addUser } from 'api/user';
import { notAuthenticated } from 'middleware/auth';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { toast } from 'react-toastify';

const credentialsInitialState = {
  name: '',
  email: '',
  class: '',
  nis: '',
  password: '',
  confirm_password: '',
};

export default function Daftar() {
  const [credentials, setCredentials] = useState(credentialsInitialState);
  const [errors, setErrors] = useState(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const [, errors] = await addUser(credentials);
      if (errors) {
        setErrors(errors);
        return false;
      }
      toast.success('Akun berhasil ditambahkan');
      setCredentials(credentialsInitialState);
      router.replace('/auth/masuk');
    } catch (err) {
      console.log(err);
      toast.error('Akun gagal ditambahkan');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    console.log(e.target.name);
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <>
      <Head>
        <title>Daftar</title>
      </Head>
      <div className="max-w-screen-xl px-4 py-16 mx-auto sm:px-6 lg:px-8">
        <div className="max-w-lg mx-auto">
          <h1 className="text-2xl font-bold text-center text-indigo-600 sm:text-3xl">Daftar Akun</h1>
          <p className="mt-1 text-center text-gray-600">Buat akun untuk mendaftar ekstrakurikuler</p>

          <form onSubmit={handleSubmit} className="p-8 mt-6 mb-0 space-y-4 rounded-lg border-2 border-gray-200">
            <Input
              error={errors?.name}
              disabled={loading}
              onChange={handleChange}
              value={credentials.name}
              name="name"
              type="text"
              title="Nama"
              placeholder="Masukkan nama lengkap"
            />
            <Input
              error={errors?.email}
              disabled={loading}
              onChange={handleChange}
              value={credentials.email}
              name="email"
              type="email"
              title="Email"
              placeholder="Masukkan email"
            />
            <Input
              error={errors?.class}
              disabled={loading}
              onChange={handleChange}
              value={credentials.class}
              name="class"
              type="text"
              title="Kelas"
              placeholder="Masukkan kelas"
            />
            <Input
              error={errors?.nis}
              disabled={loading}
              onChange={handleChange}
              value={credentials.nis}
              name="nis"
              type="text"
              title="NIS"
              placeholder="Masukkan NIS"
            />
            <Input
              error={errors?.password}
              disabled={loading}
              onChange={handleChange}
              value={credentials.password}
              name="password"
              type="password"
              title="Password"
              placeholder="Masukkan password"
            />
            <Input
              error={errors?.confirm_password}
              disabled={loading}
              value={credentials.confirm_password}
              onChange={handleChange}
              name="confirm_password"
              type="password"
              title="Ulangi Password"
              placeholder="Masukkan kembali password"
            />

            <ButtonFill disabled={loading} type="submit" className="w-full">
              Daftar
            </ButtonFill>

            <p className="text-sm text-center text-gray-600">
              Sudah memiliki akun?
              <Link href="/auth/masuk">
                <a className="px-2 underline text-indigo-600">Masuk</a>
              </Link>
            </p>
          </form>
        </div>
      </div>
    </>
  );
}

export const getServerSideProps = notAuthenticated(async () => ({ props: {} }));
