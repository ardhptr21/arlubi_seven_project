import Hero from '@/components/base/Hero';
import Section from '@/components/base/Section';
import ButtonFill from '@/components/button/ButtonFill';
import LayoutBase from '@/components/layout/LayoutBase';
import { getExtracurricular } from 'api/extracurricular';

export default function DetailEkstrakurikuler({ extracurricular }) {
  return (
    <LayoutBase>
      <Section className="flex gap-10 justify-center items-start">
        <div className="w-full" style={{ flex: 3 }}>
          <div>
            <Hero
              style={{ background: `url(${extracurricular.image})` }}
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
        <div className="border-2 p-5 border-gray-200 space-y-8 rounded-xl w-full" style={{ flex: 1 }}>
          <div>
            <p className="text-sm font-bold">ANGGOTA</p>
            <div className="mt-5 space-y-3">
              <div className="flex justify-start gap-3 items-center">
                <div className="w-10 h-10 rounded-full bg-gray-200"></div>
                <div>
                  <p className="font-medium">Ardhi Putra Pradana</p>
                  <small>XII SIJA 1</small>
                </div>
              </div>
              <div className="flex justify-start gap-3 items-center">
                <div className="w-10 h-10 rounded-full bg-gray-200"></div>
                <div>
                  <p className="font-medium">Bintang Tri Admaja</p>
                  <small>XII SIJA 2</small>
                </div>
              </div>
            </div>
          </div>
          <div>
            <p className="text-sm font-bold">STATUS</p>
            <div className="mt-5">
              <p>Kamu belum bergabung dalam ekstrakurikuler ini</p>
              <ButtonFill className="w-full mt-3">Bergabung</ButtonFill>
            </div>
          </div>
        </div>
      </Section>
    </LayoutBase>
  );
}

export const getServerSideProps = async (ctx) => {
  const slug = ctx.query.slug;

  const extracurricular = await getExtracurricular(slug);
  return {
    props: { extracurricular },
  };
};
