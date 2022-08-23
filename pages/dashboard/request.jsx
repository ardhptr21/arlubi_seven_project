import LayoutDashboard from '@/components/layout/LayoutDashboard';
import { AiOutlineNotification } from 'react-icons/ai';
import ButtonFill from '@/components/button/ButtonFill';
import { authenticated } from 'middleware/auth';

export default function Request() {
  return (
    <LayoutDashboard
      title="Request"
      description="Kelola semua permintaan ekstrakurikuler yang masuk"
      icon={AiOutlineNotification}
    >
      <div className="p-6 bg-white border-2 border-gray-200 rounded-lg mb-4">
        <div className="flex gap-5 justify-between h-full">
          <div className="flex items-start gap-5 w-full" style={{ flex: 1 }}>
            <div className="h-14 w-14 text-blue-600 bg-indigo-100 rounded-full"></div>

            <div>
              <h3 className="text-3xl font-bold text-gray-900">Akbar Maulana</h3>
              <p className="text-sm text-gray-400">XII SIJA 2</p>
            </div>
          </div>
          <div className="w-[1px] h-auto bg-gray-200"></div>
          <div className="w-full" style={{ flex: 1 }}>
            <p className="text-sm text-gray-400">Ingin Bergabung :</p>
            <h3 className="font-bold">BASKET</h3>
          </div>
        </div>
        <div className="flex justify-between items-end">
          <p className="text-sm">17 Juli 2022, 20:21</p>
          <ButtonFill className="mt-10">Terima</ButtonFill>
        </div>
      </div>
    </LayoutDashboard>
  );
}

export const getServerSideProps = authenticated(async () => ({ props: {} }));
