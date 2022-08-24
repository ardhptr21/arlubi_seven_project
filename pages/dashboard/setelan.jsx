import LayoutDashboard from '@/components/layout/LayoutDashboard';
import { FiSettings } from 'react-icons/fi';
import Input from '@/components/form/Input';
import ButtonFill from '@/components/button/ButtonFill';
import { authenticated } from 'middleware/auth';
import { useState } from 'react';
import { updateUser, uploadPhoto } from 'api/user';
import { toast } from 'react-toastify';

export default function Setelan({ user }) {
  const [credentials, setCredentials] = useState(user);
  const [errors, setErrors] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const [val, errors] = await updateUser(
        { name: credentials.name, nis: credentials.nis, class: credentials.class },
        credentials.id
      );
      if (errors) {
        setErrors(errors);
        return false;
      }
      setCredentials({ ...val, ...credentials });
      setErrors(null);
      toast.success('Data berhasil diperbarui');
    } catch (err) {
      console.log(err.message);
      toast.error('Gagal mengupdate data');
    } finally {
      setLoading(false);
    }
  };

  const handleInput = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append('image', file);
    try {
      const data = await uploadPhoto(formData, user.id);
      setCredentials({ ...credentials, image: data });
    } catch (err) {
      console.log(err);
    }
    e.target.value = null;
  };

  return (
    <LayoutDashboard title="Setelan" description="Atur dan kelola informasi data dirimu" icon={FiSettings}>
      <div className="flex max-w-3xl mx-auto gap-16 justify-between w-full items-start">
        <form className="space-y-5 w-full" onSubmit={handleSubmit}>
          <div>
            <Input
              disabled={loading}
              error={errors?.name}
              onChange={handleChange}
              name="name"
              title="Nama"
              placeholder="Masukkan nama"
              value={credentials.name}
            />
            <p className="text-sm text-gray-400">Namamu akan muncul ketika kamu mendaftar ke dalam ekstrakurikuler</p>
          </div>
          <div>
            <Input
              disabled={loading}
              error={errors?.class}
              onChange={handleChange}
              name="class"
              title="Kelas"
              placeholder="Masukkan kelas"
              value={credentials.class}
            />
            <p className="text-sm text-gray-400">Masukkan kelas untuk mempermudah orang mengenalimu</p>
          </div>
          <div>
            <Input
              disabled={loading}
              error={errors?.nis}
              onChange={handleChange}
              name="nis"
              title="NIS"
              placeholder="Masukkan NIS"
              value={credentials.nis}
            />
            <p className="text-sm text-gray-400">Masukkan NIS sesuai dengan kartu pelajarmu</p>
          </div>
          <ButtonFill disabled={loading} type="submit">
            {loading ? 'Loading...' : 'Simpan'}
          </ButtonFill>
        </form>
        <div>
          <label htmlFor="photo" className="cursor-pointer">
            <div
              className="h-52 w-52 rounded-full bg-cover bg-center bg-gray-200"
              style={{
                backgroundImage: `url(${credentials.image})`,
              }}
            >
              <input onInput={handleInput} accept="image/*" type="file" id="photo" hidden />
            </div>
          </label>
        </div>
      </div>
    </LayoutDashboard>
  );
}

export const getServerSideProps = authenticated(async (_, session) => {
  return { props: { user: session.user } };
});
