import { signOut } from 'next-auth/react';
import { FiSettings } from 'react-icons/fi';
import { useSession } from 'next-auth/react';
import {
  AiOutlineNotification,
  AiOutlinePlus,
  AiOutlineLogout,
  AiOutlineHome,
  AiOutlineDashboard,
} from 'react-icons/ai';
import { ImMakeGroup } from 'react-icons/im';
import LeftBarItem from './LeftBarItem';

export default function LeftBar() {
  const { data: session } = useSession();

  return (
    <div className="flex flex-row md:flex-col bg-white md:py-10 z-50 justify-between fixed md:relative md:w-16 bottom-0 w-screen md:h-screen md:border-r border-t md:border-t-0">
      <nav className="p-2 w-full h-full">
        <ul className="flex md:flex-col md:space-y-5 items-center justify-between w-full">
          <li>
            <LeftBarItem name="Beranda" href="/" icon={AiOutlineHome} />
          </li>
          {session?.user?.role === 'admin' && (
            <li>
              <LeftBarItem name="Dashboard" href="/dashboard" icon={AiOutlineDashboard} />
            </li>
          )}
          <li>
            <LeftBarItem name="Setelan" href="/dashboard/setelan" icon={FiSettings} />
          </li>
          {session?.user?.role !== 'admin' && (
            <li>
              <LeftBarItem name="Ekstrakurikuler" href="/dashboard/ekstrakurikuler" icon={ImMakeGroup} />
            </li>
          )}
          {session?.user?.role === 'admin' && (
            <>
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
            </>
          )}
          <li className="block md:hidden" onClick={() => signOut({ callbackUrl: '/' })}>
            <LeftBarItem name="Keluar" icon={AiOutlineLogout} />
          </li>
        </ul>
      </nav>

      <div
        onClick={() => signOut({ callbackUrl: '/' })}
        className="inset-x-0 bottom-0 p-2 border-t border-gray-100 hidden md:block"
      >
        <LeftBarItem name="Keluar" icon={AiOutlineLogout} />
      </div>
    </div>
  );
}
