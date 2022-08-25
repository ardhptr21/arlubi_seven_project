import ButtonFill from '@/components/button/ButtonFill';
import Input from '@/components/form/Input';
import QuillEditor from '@/components/form/QuillEditor';
import Textarea from '@/components/form/Textarea';
import LayoutDashboard from '@/components/layout/LayoutDashboard';
import { addExtraCurricular } from 'api/extracurricular';
import { uploadImage } from 'api/image';
import { authenticatedAdmin } from 'middleware/auth';
import { useState } from 'react';
import { AiOutlinePlus } from 'react-icons/ai';
import { toast } from 'react-toastify';

export default function Create() {
  const [ecData, setEcData] = useState({
    name: '',
    short: '',
  });
  const [header_image, setHeader_image] = useState(null);
  const [card_image, setCard_image] = useState(null);
  const [content, setContent] = useState('');
  const [errors, setErrors] = useState(null);
  const [loading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const data_send = { ...ecData, long: content };
      if (header_image) {
        const res = await uploadImage(header_image, 'ec_header_photos');
        data_send.header_image = `${res.secure_url}?public_id=${res.public_id}`;
      }
      if (card_image) {
        const res = await uploadImage(card_image, 'ec_card_photos');
        data_send.card_image = `${res.secure_url}?public_id=${res.public_id}`;
      }
      const [, errors] = await addExtraCurricular(data_send);
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

  const handleChange = (e) => {
    setEcData({
      ...ecData,
      [e.target.name]: e.target.value,
    });
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
          onChange={handleChange}
          disabled={loading}
        />
        <Textarea
          name="short"
          title="Deskripsi singkat ekstrakurikuler"
          placeholder="Masukkan deskripsi singkat"
          className="resize-none h-48"
          error={errors?.short}
          value={ecData.short}
          onChange={handleChange}
          disabled={loading}
        ></Textarea>
        <QuillEditor
          title="Isi konten ekstrakurikuler"
          readOnly={loading}
          value={content}
          error={errors?.long}
          onChange={(val) => setContent(val)}
        />

        <div>
          <Input
            name="card_image"
            title="Card image ekstrakurikuler"
            type="file"
            className="w-full"
            disabled={loading}
            onChange={(e) => setCard_image(e.target.files[0])}
          />
          {card_image && (
            <div
              className="aspect-video overflow-hidden bg-cover bg-center relative mt-5 rounded-xl bg w-96 bg-gray-200"
              style={{ backgroundImage: `url(${URL.createObjectURL(card_image)})` }}
            ></div>
          )}
        </div>

        <div>
          <Input
            name="header_image"
            title="Header image ekstrakurikuler"
            type="file"
            className="w-full"
            disabled={loading}
            onChange={(e) => setHeader_image(e.target.files[0])}
          />
          {header_image && (
            <div
              className="aspect-[21/9] bg-cover bg-center mt-5 rounded-xl bg w-full bg-gray-200"
              style={{ backgroundImage: `url(${URL.createObjectURL(header_image)})` }}
            ></div>
          )}
        </div>

        <ButtonFill type="submit" disabled={loading}>
          {loading ? 'Loading...' : 'Tambah'}
        </ButtonFill>
      </form>
    </LayoutDashboard>
  );
}

export const getServerSideProps = authenticatedAdmin(async () => ({ props: {} }));
