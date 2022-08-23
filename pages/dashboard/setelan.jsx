import LayoutDashboard from '@/components/layout/LayoutDashboard';
import { FiSettings } from 'react-icons/fi';
import Input from '@/components/form/Input';
import ButtonFill from '@/components/button/ButtonFill';
import { authenticated } from 'middleware/auth';

export default function Setelan() {
  return (
    <LayoutDashboard title="Setelan" description="Atur dan kelola informasi data dirimu" icon={FiSettings}>
      <div className="flex max-w-3xl mx-auto gap-16 justify-between w-full items-start">
        <form className="space-y-5 w-full">
          <div>
            <Input name="name" title="Nama" placeholder="Masukkan nama" />
            <p className="text-sm text-gray-400">Namamu akan muncul ketika kamu mendaftar ke dalam ekstrakurikuler</p>
          </div>
          <div>
            <Input name="name" title="Kelas" placeholder="Masukkan kelas" />
            <p className="text-sm text-gray-400">Masukkan kelas untuk mempermudah orang mengenalimu</p>
          </div>
          <div>
            <Input name="name" title="NIS" placeholder="Masukkan NIS" />
            <p className="text-sm text-gray-400">Masukkan NIS sesuai dengan kartu pelajarmu</p>
          </div>
          <ButtonFill>Simpan</ButtonFill>
        </form>
        <div>
          <div className="h-52 w-52 rounded-full bg-gray-200"></div>
        </div>
      </div>
    </LayoutDashboard>
  );
}

export const getServerSideProps = authenticated(async () => ({ props: {} }));
