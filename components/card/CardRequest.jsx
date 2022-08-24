import { changeStatus } from 'api/request';
import ButtonFill from '../button/ButtonFill';
import { toast } from 'react-toastify';

export default function CardRequest({ request, setRequests }) {
  const handleAccept = async () => {
    const isConfirm = window.confirm('Apakah anda yakin ingin menerima permintaan ini?');
    if (!isConfirm) return false;
    try {
      const data = await changeStatus(request.user_id, request.extracurricular_id, 'accepted');
      setRequests((req) => req.filter((r) => r.user_id !== data.user_id && r.extracurricular_id !== data.extracurricular_id));
      toast.success('Permintaan berhasil diterima');
    } catch (err) {
      toast.success('Permintaan gagal diterima');
      console.log(err.message);
    }
  };

  return (
    <div className="p-6 bg-white border-2 border-gray-200 rounded-lg mb-4">
      <div className="flex gap-5 justify-between h-full">
        <div className="flex items-start gap-5 w-full" style={{ flex: 1 }}>
          <div className="h-14 w-14 text-blue-600 bg-indigo-100 rounded-full"></div>

          <div>
            <h3 className="text-3xl font-bold text-gray-900">{request.user.name}</h3>
            <p className="text-sm text-gray-400">{request.user.class}</p>
          </div>
        </div>
        <div className="w-[1px] h-auto bg-gray-200"></div>
        <div className="w-full" style={{ flex: 1 }}>
          <p className="text-sm text-gray-400">Ingin Bergabung :</p>
          <h3 className="font-bold">{request.extracurricular.name}</h3>
        </div>
      </div>
      <div className="flex justify-between items-end">
        <p className="text-sm">{request.created_at}</p>
        <ButtonFill className="mt-10" onClick={handleAccept}>
          Terima
        </ButtonFill>
      </div>
    </div>
  );
}
