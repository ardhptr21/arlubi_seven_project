import CardStat from '@/components/card/CardStat';
import LayoutDashboard from '@/components/layout/LayoutDashboard';
import { VscOrganization } from 'react-icons/vsc';
import { HiOutlineUser } from 'react-icons/hi';
import { AiOutlineNotification, AiOutlineDashboard } from 'react-icons/ai';
import { authenticatedAdmin } from 'middleware/auth';
import prisma from '@/lib/prisma';

export default function Dashboard({ users, extracurriculars, requests }) {
  return (
    <LayoutDashboard
      description="Kelola dan lihat beberapa ringkasan statistik di dashboard"
      title="Dashboard"
      icon={AiOutlineDashboard}
    >
      <section className="grid md:grid-cols-3 gap-5 grid-cols-1">
        <CardStat icon={VscOrganization} title="Total Ekstrakulikuler" value={extracurriculars} />
        <CardStat icon={HiOutlineUser} title="Jumlah User" value={users} />
        <CardStat icon={AiOutlineNotification} title="Permintaan Menunggu" value={requests} />
      </section>
    </LayoutDashboard>
  );
}

export const getServerSideProps = authenticatedAdmin(async () => {
  const [users, extracurriculars, requests] = await Promise.all([
    prisma.user.count({ where: { role: 'user' } }),
    prisma.extracurricular.count(),
    prisma.usersOnExtracurriculars.count({ where: { status: 'pending' } }),
  ]);

  return { props: { users, extracurriculars, requests } };
});
