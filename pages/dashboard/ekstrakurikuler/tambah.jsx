import ButtonFill from '@/components/button/ButtonFill';
import Input from '@/components/form/Input';
import QuillEditor from '@/components/form/QuillEditor';
import Textarea from '@/components/form/Textarea';
import LayoutDashboard from '@/components/layout/LayoutDashboard';
import { AiOutlinePlus } from 'react-icons/ai';

export default function Create() {
  return (
    <LayoutDashboard
      title="Tambah Ekstrakurikuler"
      description="Tambahkan beberapa ekstrakurikuler baru ke sistem"
      icon={AiOutlinePlus}
    >
      <form className="space-y-5 max-w-4xl mx-auto">
        <Input
          title="Nama Ekstrakurikuler"
          name="name"
          type="text"
          placeholder="Masukkan nama ekstrakurikuler"
          className="w-full"
        />
        <Textarea
          name="short"
          title="Deskripsi singkat ekstrakurikuler"
          placeholder="Masukkan deskripsi singkat"
          className="resize-none h-48"
        ></Textarea>
        <QuillEditor title="Isi konten ekstrakurikuler" />
        <Input name="header_image" title="Header image ekstrakurikuler" type="file" className="w-full" />
        <ButtonFill type="submit">Tambah</ButtonFill>
      </form>
    </LayoutDashboard>
  );
}
