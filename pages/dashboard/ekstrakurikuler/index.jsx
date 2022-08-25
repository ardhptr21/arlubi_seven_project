import AlertInfo from '@/components/alert/AlertInfo';
import CardEC from '@/components/card/CardEC';
import LayoutDashboard from '@/components/layout/LayoutDashboard';
import TabContainer from '@/components/tab/TabContainer';
import TabItem from '@/components/tab/TabItem';
import { getExtracurriculars } from 'api/extracurricular';
import { authenticated } from 'middleware/auth';
import { useEffect, useState } from 'react';
import { ImMakeGroup } from 'react-icons/im';

export default function Ekstrakurikuler({ extracurriculars }) {
  const [tabActive, setTabActive] = useState('accepted');
  const [ecs, setEcs] = useState(extracurriculars);

  useEffect(() => {
    setEcs(extracurriculars.filter((v) => v.users[0].status === tabActive));
  }, [tabActive, extracurriculars]);

  return (
    <LayoutDashboard
      title="Ekstrakurikuler"
      description="Lihat informasi ekstrakurikuler yang kamu ikuti"
      icon={ImMakeGroup}
    >
      <TabContainer>
        <TabItem onClick={() => setTabActive('accepted')} active={tabActive == 'accepted'} text="Mengikuti" />
        <TabItem onClick={() => setTabActive('pending')} active={tabActive == 'pending'} text="Menunggu" />
      </TabContainer>

      <div className="mt-10">
        {ecs.length ? (
          <div className="grid gap-5 md:grid-cols-2 grid-cols-1">
            {ecs.map((ec) => (
              <CardEC key={ec.id} name={ec.name} short={ec.short} image={ec.card_image} />
            ))}
          </div>
        ) : (
          <>
            {
              <>
                {tabActive == 'pending' && <AlertInfo text="Semua permintaan telah diterima" />}
                {tabActive == 'accepted' && <AlertInfo text="Tidak ada ekstrakurikuler yang diikuti" />}
              </>
            }
          </>
        )}
      </div>
    </LayoutDashboard>
  );
}

export const getServerSideProps = authenticated(async (_, session) => {
  const extracurriculars = await getExtracurriculars('', session.user.id);
  return { props: { extracurriculars } };
});
