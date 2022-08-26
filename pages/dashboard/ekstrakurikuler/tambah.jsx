import ButtonFill from '@/components/button/ButtonFill';
import Input from '@/components/form/Input';
import QuillEditor from '@/components/form/QuillEditor';
import Textarea from '@/components/form/Textarea';
import LayoutDashboard from '@/components/layout/LayoutDashboard';
import parseSearchParams from '@/utils/parseSearchParams';
import { addExtraCurricular, getExtracurricular, updateExtraCurricular } from 'api/extracurricular';
import { deleteImage, uploadImage } from 'api/image';
import { authenticatedAdmin } from 'middleware/auth';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect, useRef, useState } from 'react';
import { AiOutlinePlus } from 'react-icons/ai';
import { BiPencil } from 'react-icons/bi';
import { toast } from 'react-toastify';

export default function Create({ ecWillUpdate }) {
  const router = useRouter();
  const [isUpdate, setIsUpdate] = useState(Boolean(!!ecWillUpdate));
  const [ecData, setEcData] = useState({
    name: '',
    short: '',
  });
  const [header_image, setHeader_image] = useState(null);
  const header_image_ref = useRef();

  const [card_image, setCard_image] = useState(null);
  const card_image_ref = useRef();

  const [content, setContent] = useState('');
  const [errors, setErrors] = useState(null);
  const [loading, setIsLoading] = useState(false);

  useEffect(() => {
    if (isUpdate) {
      setEcData({ name: ecWillUpdate.name, short: ecWillUpdate.short });
      setContent(ecWillUpdate.long);
    }
  }, [isUpdate, ecWillUpdate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isUpdate) {
      await handleUpdate();
    } else {
      await handleCreate();
    }
  };

  const handleCreate = async () => {
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
        toast.error('Gagal menambahkan Ekstrakurikuler');
        return false;
      }
      toast.success('Ekstrakulikuler berhasil ditambahkan');
      setErrors(null);
      setEcData({
        name: '',
        short: '',
      });
      setContent('');
      header_image_ref.current.value = null;
      card_image_ref.current.value = null;
      setCard_image(null);
      setHeader_image(null);
    } catch (err) {
      console.log(err);
      toast.error('Ekstrakulikuler gagal ditambahkan');
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpdate = async () => {
    setIsLoading(true);

    try {
      const data_send = { ...ecData, long: content };
      if (header_image) {
        const res = await uploadImage(header_image, 'ec_header_photos');
        data_send.header_image = `${res.secure_url}?public_id=${res.public_id}`;
        if (ecWillUpdate.header_image) {
          const public_id = parseSearchParams(ecWillUpdate.header_image).get('public_id');
          if (public_id) {
            await deleteImage(public_id);
          }
        }
      }
      if (card_image) {
        const res = await uploadImage(card_image, 'ec_card_photos');
        data_send.card_image = `${res.secure_url}?public_id=${res.public_id}`;
        if (ecWillUpdate.card_image) {
          const public_id = parseSearchParams(ecWillUpdate.card_image).get('public_id');
          if (public_id) {
            await deleteImage(public_id);
          }
        }
      }
      const [data, errors] = await updateExtraCurricular(ecWillUpdate.id, data_send);
      if (errors) {
        setErrors(errors);
        toast.error('Ekstrakulikuler gagal diperbarui');
        return false;
      }
      toast.success('Ekstrakurikuler berhasil diubah');
      setEcData({
        name: '',
        short: '',
      });
      setContent('');
      header_image_ref.current.value = null;
      card_image_ref.current.value = null;
      setCard_image(null);
      setHeader_image(null);
      setIsUpdate(false);
      router.replace(`/ekstrakurikuler/${data.slug}`);
    } catch (err) {
      console.log(err);
      toast.error('Ekstrakurikuler gagal diubah');
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e) => {
    setEcData({
      ...ecData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <>
      <Head>
        <title>Dashboard | {isUpdate ? 'Ubah' : 'Tambah'} Ekstrakurikuler</title>
      </Head>
      <LayoutDashboard
        title={`${isUpdate ? 'Ubah' : 'Tambah'} Ekstrakurikuler`}
        description={
          isUpdate
            ? `Ubah data ekstrakurikuler ${ecWillUpdate.name}`
            : 'Tambahkan beberapa ekstrakurikuler baru ke sistem'
        }
        icon={isUpdate ? BiPencil : AiOutlinePlus}
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
              ref={card_image_ref}
              accept="image/*"
              className="w-full"
              disabled={loading}
              onChange={(e) => setCard_image(e.target.files[0])}
            />
            {(card_image || ecWillUpdate?.card_image) && (
              <div
                className="aspect-video overflow-hidden bg-cover bg-center relative mt-5 rounded-xl bg w-96 bg-gray-200"
                style={{
                  backgroundImage: `url(${card_image ? URL.createObjectURL(card_image) : ecWillUpdate.card_image})`,
                }}
              ></div>
            )}
          </div>

          <div>
            <Input
              name="header_image"
              title="Header image ekstrakurikuler"
              type="file"
              ref={header_image_ref}
              accept="image/*"
              className="w-full"
              disabled={loading}
              onChange={(e) => setHeader_image(e.target.files[0])}
            />
            {(header_image || ecWillUpdate?.header_image) && (
              <div
                className="aspect-[21/9] bg-cover bg-center mt-5 rounded-xl bg w-full bg-gray-200"
                style={{
                  backgroundImage: `url(${
                    header_image ? URL.createObjectURL(header_image) : ecWillUpdate.header_image
                  })`,
                }}
              ></div>
            )}
          </div>

          <ButtonFill type="submit" disabled={loading}>
            {loading ? 'Loading...' : isUpdate ? 'Ubah' : 'Tambah'}
          </ButtonFill>
        </form>
      </LayoutDashboard>
    </>
  );
}

export const getServerSideProps = authenticatedAdmin(async (ctx) => {
  const { update, slug } = ctx.query;
  let ecWillUpdate = null;

  if (update == 'true') {
    try {
      ecWillUpdate = await getExtracurricular(slug);
    } catch (err) {}
  }

  return { props: { ecWillUpdate } };
});
