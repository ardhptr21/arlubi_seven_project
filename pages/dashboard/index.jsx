import CardStat from '@/components/card/CardStat';
import LayoutDashboard from '@/components/layout/LayoutDashboard';
import { VscOrganization } from 'react-icons/vsc';
import { HiOutlineUser } from 'react-icons/hi';
import { AiOutlineNotification, AiOutlineDashboard } from 'react-icons/ai';
import { authenticated } from 'middleware/auth';

export default function Dashboard() {
  return (
    <LayoutDashboard
      description="Kelola dan lihat beberapa ringkasan statistik di dashboard"
      title="Dashboard"
      icon={AiOutlineDashboard}
    >
      <section className="grid grid-cols-3 gap-5">
        <CardStat icon={VscOrganization} title="Total Ekstrakulikuler" value="12" />
        <CardStat icon={HiOutlineUser} title="Jumlah User" value="56" />
        <CardStat icon={AiOutlineNotification} title="Permintaan Menunggu" value="12" />
      </section>
    </LayoutDashboard>
  );
}

export const getServerSideProps = authenticated(async () => ({ props: {} }));
