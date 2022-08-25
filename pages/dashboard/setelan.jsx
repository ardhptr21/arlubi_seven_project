import LayoutDashboard from '@/components/layout/LayoutDashboard';
import { FiSettings } from 'react-icons/fi';
import { AiOutlineCloudUpload } from 'react-icons/ai';
import Input from '@/components/form/Input';
import ButtonFill from '@/components/button/ButtonFill';
import { authenticated } from 'middleware/auth';
import { useState } from 'react';
import { changePassword, updateUser, uploadPhoto } from 'api/user';
import { toast } from 'react-toastify';
import Head from 'next/head';

export default function Setelan({ user }) {
  const [credentials, setCredentials] = useState(user);
  const [errors, setErrors] = useState(null);
  const [loading, setLoading] = useState(false);
  const [loadingPhoto, setLoadingPhoto] = useState(false);

  const [passwordCredentials, setPasswordCredentials] = useState({
    old_password: '',
    new_password: '',
    confirm_new_password: '',
  });

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleUserUpdate = async () => {
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

  const handlePasswordUpdate = async () => {
    try {
      const [errors] = await changePassword({ ...passwordCredentials, id: user.id });
      if (errors) {
        setErrors(errors);
        return false;
      }
      toast.success('Password berhasil diperbarui');
      setErrors(null);
    } catch (err) {
      console.log(err.message);
      toast.error('Gagal mengupdate password');
    } finally {
      setLoading(false);
      setPasswordCredentials({
        old_password: '',
        new_password: '',
        confirm_new_password: '',
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (user.role === 'user') {
      await handleUserUpdate();
    }

    if (user.role === 'admin') {
      await handlePasswordUpdate();
    }
  };

  const handleInput = async (e) => {
    const isConfirm = window.confirm('Yakin ingin mengubah foto profil?');
    if (!isConfirm) {
      e.target.value = null;
      return false;
    }
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append('image', file);
    setLoadingPhoto(true);
    try {
      const data = await uploadPhoto(formData, user.id);
      setCredentials({ ...credentials, image: data });
    } catch (err) {
      console.log(err);
    } finally {
      setLoadingPhoto(false);
    }
  };

  return (
    <>
      <Head>
        <title>Dashboard | Setelan - {user.role}</title>
      </Head>
      <LayoutDashboard title="Setelan" description="Atur dan kelola informasi data dirimu" icon={FiSettings}>
        <div className="flex flex-col-reverse md:flex-row max-w-3xl mx-auto gap-16 justify-between w-full items-start">
          <form className="space-y-5 w-full" onSubmit={handleSubmit}>
            {user.role === 'user' && (
              <>
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
                  <p className="text-sm text-gray-400">
                    Namamu akan muncul ketika kamu mendaftar ke dalam ekstrakurikuler
                  </p>
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
              </>
            )}
            {user.role === 'admin' && (
              <>
                <div>
                  <Input
                    disabled={loading}
                    error={errors?.old_password}
                    onChange={(e) => setPasswordCredentials({ ...passwordCredentials, old_password: e.target.value })}
                    name="old_password"
                    type="password"
                    title="Password lama"
                    placeholder="Masukkan password lama"
                    value={passwordCredentials.old_password}
                  />
                </div>
                <div>
                  <Input
                    disabled={loading}
                    type="password"
                    error={errors?.new_password}
                    onChange={(e) => setPasswordCredentials({ ...passwordCredentials, new_password: e.target.value })}
                    name="new_password"
                    title="Password baru"
                    placeholder="Masukkan password baru"
                    value={passwordCredentials.new_password}
                  />
                </div>
                <div>
                  <Input
                    disabled={loading}
                    error={errors?.confirm_new_password}
                    onChange={(e) =>
                      setPasswordCredentials({ ...passwordCredentials, confirm_new_password: e.target.value })
                    }
                    name="confirm_new_password"
                    type="password"
                    title="Konfirmasi password baru"
                    placeholder="Masukkan konfirmasi password"
                    value={passwordCredentials.confirm_new_password}
                  />
                </div>
              </>
            )}
            <ButtonFill disabled={loading} type="submit">
              {loading ? 'Loading...' : 'Simpan'}
            </ButtonFill>
          </form>
          {user.role === 'user' && (
            <div className="flex justify-center items-center w-full">
              <label htmlFor="photo" className="cursor-pointer">
                <div
                  className="h-52 w-52 rounded-full group bg-cover relative overflow-hidden bg-center bg-gray-200"
                  style={{
                    backgroundImage: `url(${credentials.image})`,
                  }}
                >
                  <div
                    className={`opacity-0 flex flex-col justify-center items-center text-white group-hover:opacity-100 bg-opacity-60 bg-black absolute inset-0 ${
                      loadingPhoto ? 'opacity-100' : ''
                    }`}
                  >
                    {loadingPhoto ? (
                      <p className="font-semibold">Loading...</p>
                    ) : (
                      <>
                        <AiOutlineCloudUpload size={48} />
                        <p className="font-semibold">Upload photo</p>
                      </>
                    )}
                  </div>
                  <input onInput={handleInput} accept="image/*" type="file" id="photo" hidden />
                </div>
              </label>
            </div>
          )}
        </div>
      </LayoutDashboard>
    </>
  );
}

export const getServerSideProps = authenticated(async (_, session) => {
  return { props: { user: session.user } };
});
