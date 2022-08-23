import ButtonFill from '@/components/button/ButtonFill';
import Input from '@/components/form/Input';
import QuillEditor from '@/components/form/QuillEditor';
import Textarea from '@/components/form/Textarea';
import LayoutDashboard from '@/components/layout/LayoutDashboard';
import { addExtraCurricular } from 'api/extracurricular';
import { useState } from 'react';
import { AiOutlinePlus } from 'react-icons/ai';
import { toast, ToastContainer } from 'react-toastify';

export default function Create() {
  const [ecData, setEcData] = useState({
    name: '',
    short: '',
  });
  const [content, setContent] = useState('');
  const [errors, setErrors] = useState(null);
  const [loading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const [, errors] = await addExtraCurricular({ ...ecData, long: content });
      if (errors) {
        setErrors(errors);
        return false;
      }
      toast.success('Ekstrakulikuler berhasil ditambahkan');
      setErrors(null);
    } catch (err) {
      console.log(err);
      toast.error('Ekstrakulikuler gagal ditambahkan');
    } finally {
      setIsLoading(false);
      setEcData({
        name: '',
        short: '',
      });
      setContent('');
    }
  };

  return (
    <LayoutDashboard
      title="Tambah Ekstrakurikuler"
      description="Tambahkan beberapa ekstrakurikuler baru ke sistem"
      icon={AiOutlinePlus}
    >
      <form className="space-y-5 max-w-4xl mx-auto" onSubmit={handleSubmit}>
        <Input
          title="Nama Ekstrakurikuler"
          name="name"
          type="text"
          placeholder="Masukkan nama ekstrakurikuler"
          className="w-full"
          error={errors?.name}
          value={ecData.name}
          onChange={(e) => setEcData({ ...ecData, name: e.target.value })}
          disabled={loading}
        />
        <Textarea
          name="short"
          title="Deskripsi singkat ekstrakurikuler"
          placeholder="Masukkan deskripsi singkat"
          className="resize-none h-48"
          error={errors?.short}
          value={ecData.short}
          onChange={(e) => setEcData({ ...ecData, short: e.target.value })}
          disabled={loading}
        ></Textarea>
        <QuillEditor
          title="Isi konten ekstrakurikuler"
          readOnly={loading}
          value={content}
          error={errors?.long}
          onChange={(val) => setContent(val)}
        />
        <Input
          name="header_image"
          title="Header image ekstrakurikuler"
          type="file"
          className="w-full"
          disabled={loading}
        />
        <ButtonFill type="submit" disabled={loading}>
          {loading ? 'Loading...' : 'Tambah'}
        </ButtonFill>
      </form>
    </LayoutDashboard>
  );
}
