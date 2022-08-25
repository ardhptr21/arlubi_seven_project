import Hero from '@/components/base/Hero';
import Section from '@/components/base/Section';
import ButtonFill from '@/components/button/ButtonFill';
import CardUser from '@/components/card/CardUser';
import LayoutBase from '@/components/layout/LayoutBase';
import AlertSuccess from '@/components/alert/AlertSuccess';
import { getExtracurricular } from 'api/extracurricular';
import { sendRequest } from 'api/useronec';
import { getSession } from 'next-auth/react';
import { useState } from 'react';
import AlertWarning from '@/components/alert/AlertWarning';
import AlertInfo from '@/components/alert/AlertInfo';

export default function DetailEkstrakurikuler({ extracurricular, user }) {
  const [userEcStatus, setUserEcStatus] = useState(extracurricular.status);

  const handleClick = async () => {
    try {
      const res = await sendRequest(user.id, extracurricular.id);
      console.log(res);
      setUserEcStatus('pending');
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <LayoutBase>
      <Section className="flex relative flex-col md:flex-row gap-10 justify-center items-start">
        <div className="w-full" style={{ flex: 3 }}>
          <div>
            <Hero
              style={{ backgroundImage: `url(${extracurricular.header_image})` }}
              overlay={true}
              title={extracurricular.name}
              detail={extracurricular.short}
            />
          </div>
          <div
            dangerouslySetInnerHTML={{ __html: extracurricular.long }}
            className="mt-5 prose-base prose-ul:list-disc prose-ol:list-decimal prose-headings:font-bold prose-headings:text-gray-800 prose-p:text-gray-600"
          ></div>
        </div>
        <div className="border-2 p-5 border-gray-200 space-y-8 rounded-xl w-full sticky top-5" style={{ flex: 1 }}>
          <div>
            <p className="text-sm font-bold">ANGGOTA</p>
            <div className="mt-5 space-y-3">
              {extracurricular.users.map(({ user }, idx) => (
                <CardUser data={user} key={idx} />
              ))}
            </div>
          </div>
          {user && user.role !== 'admin' && (
            <div>
              <p className="text-sm font-bold">STATUS</p>
              <div className="mt-5">
                {userEcStatus ? (
                  <>
                    {userEcStatus === 'pending' && <AlertWarning text="Menunggu" />}
                    {userEcStatus === 'accepted' && <AlertSuccess text="Bergabung" />}
                  </>
                ) : (
                  <div>
                    <AlertInfo text="Belum bergabung" />
                    <ButtonFill onClick={handleClick} className="w-full mt-3">
                      Gabung
                    </ButtonFill>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </Section>
    </LayoutBase>
  );
}

export const getServerSideProps = async (ctx) => {
  const slug = ctx.query.slug;
  const session = await getSession({ req: ctx.req });
  let extracurricular = {};
  try {
    extracurricular = (await getExtracurricular(slug, session?.user?.id)) || {};
  } catch (err) {
    console.log(err.message);
  }
  const user = session?.user || false;
  return {
    props: { extracurricular, user },
  };
};
