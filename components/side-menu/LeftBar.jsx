import { FiSettings } from 'react-icons/fi';
import {
  AiOutlineNotification,
  AiOutlinePlus,
  AiOutlineLogout,
  AiOutlineHome,
  AiOutlineDashboard,
} from 'react-icons/ai';
import { VscOrganization } from 'react-icons/vsc';
import LeftBarItem from './LeftBarItem';

export default function LeftBar() {
  return (
    <div className="flex flex-col justify-between w-16 py-10 h-screen bg-white border-r">
      <div>
        <div>
          <nav className="flex flex-col p-2">
            <ul className="space-y-5">
              <li>
                <LeftBarItem name="Beranda" href="/" icon={AiOutlineHome} />
              </li>
              <li>
                <LeftBarItem name="Dashboard" href="/dashboard" icon={AiOutlineDashboard} />
              </li>
              <li>
                <LeftBarItem name="Setelan" href="/dashboard/setelan" icon={FiSettings} />
              </li>
              <li>
                <LeftBarItem name="Request" href="/dashboard/request" icon={AiOutlineNotification} />
              </li>
              <li>
                <LeftBarItem
                  name="Tambah Ekstrakurikuler"
                  href="/dashboard/ekstrakurikuler/tambah"
                  icon={AiOutlinePlus}
                />
              </li>
              <li>
                <LeftBarItem name="Ekstrakurikuler" icon={VscOrganization} />
              </li>
            </ul>
          </nav>
        </div>
      </div>

      <div className="sticky inset-x-0 bottom-0 p-2 bg-white border-t border-gray-100">
        <LeftBarItem name="Keluar" icon={AiOutlineLogout} />
      </div>
    </div>
  );
}
