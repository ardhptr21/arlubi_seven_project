import ButtonFill from '@/components/button/ButtonFill';
import Input from '@/components/form/Input';
import Link from 'next/link';

export default function Daftar() {
  return (
    <div className="max-w-screen-xl px-4 py-16 mx-auto sm:px-6 lg:px-8">
      <div className="max-w-lg mx-auto">
        <h1 className="text-2xl font-bold text-center text-indigo-600 sm:text-3xl">Daftar Akun</h1>
        <p className="mt-1 text-center text-gray-600">Buat akun untuk mendaftar ekstrakurikuler</p>

        <form action="" className="p-8 mt-6 mb-0 space-y-4 rounded-lg border-2 border-gray-200">
          <Input name="name" type="text" title="Nama" placeholder="Masukkan nama lengkap" />
          <Input name="email" type="email" title="Email" placeholder="Masukkan email" />
          <Input name="password" type="password" title="Password" placeholder="Masukkan password" />

          <ButtonFill type="submit" className="w-full">
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
  );
}
