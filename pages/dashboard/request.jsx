import LayoutDashboard from '@/components/layout/LayoutDashboard';
import { AiOutlineNotification } from 'react-icons/ai';
import { authenticatedAdmin } from 'middleware/auth';
import { useEffect, useState } from 'react';
import { getRequests } from 'api/request';
import CardRequest from '@/components/card/CardRequest';
import AlertInfo from '@/components/alert/AlertInfo';

export default function Request() {
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    (async () => {
      const data = await getRequests();
      setRequests(data);
    })();
  }, []);

  return (
    <LayoutDashboard
      title="Request"
      description="Kelola semua permintaan ekstrakurikuler yang masuk"
      icon={AiOutlineNotification}
    >
      {requests.length ? (
        <>
          {requests.map((req, idx) => (
            <CardRequest requests={requests} setRequests={setRequests} key={idx} request={req} />
          ))}
        </>
      ) : (
        <AlertInfo text="Tidak ada permintaan untuk saat ini" />
      )}
    </LayoutDashboard>
  );
}

export const getServerSideProps = authenticatedAdmin(async () => ({ props: {} }));
