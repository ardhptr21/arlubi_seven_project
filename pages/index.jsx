import Section from '@/components/base/Section';
import Hero from '@/components/base/Hero';
import CardEC from '@/components/card/CardEC';
import LayoutBase from '@/components/layout/LayoutBase';
import { getExtracurriculars } from 'api/extracurricular';
import Input from '@/components/form/Input';
import { BiSearchAlt } from 'react-icons/bi';
import { AiOutlineDoubleLeft, AiOutlineDoubleRight } from 'react-icons/ai';
import debounce from '@/utils/debounce';
import { useEffect, useState } from 'react';
import AlertInfo from '@/components/alert/AlertInfo';
import Head from 'next/head';
import useIsMount from 'hooks/useIsMount';

export default function Home({ data }) {
  const isMount = useIsMount();
  const [search, setSearch] = useState('');
  const [currentEcPage, setCurrentEcPage] = useState(data.page);
  const [extracurriculars, setExtracurriculars] = useState(data);

  const changeCurrentPage = (isAdd = true) => {
    if (isAdd) {
      if (currentEcPage < extracurriculars.totalPage) {
        setCurrentEcPage((p) => p + 1);
      }
    } else {
      if (currentEcPage > 1) {
        setCurrentEcPage((p) => p - 1);
      }
    }
  };

  useEffect(() => {
    if (isMount) {
      (async () => {
        try {
          const result = await getExtracurriculars(search, '', currentEcPage);
          console.log(result);
          setExtracurriculars(result);
        } catch (err) {
          console.log(err.message);
        }
      })();
    }
  }, [currentEcPage, search, isMount]);

  return (
    <>
      <Head>
        <title>Arlubi Seven - Ekstrakurikuler</title>
      </Head>
      <LayoutBase>
        <Section>
          <Hero
            title="Temukan Ekstrakurikuler Favoritmu"
            detail="Temukan lebih banyak teman dan koneksi"
            image="/assets/images/home-hero-image.svg"
            width={1200}
            height={1200}
          />
        </Section>
        <Section className="mt-10">
          <Input
            onChange={debounce((e) => {
              setSearch(e.target.value);
              setCurrentEcPage(1);
            }, 500)}
            spellingcheck="false"
            type="search"
            icon={BiSearchAlt}
            placeholder="Cari ekstrakurikuler yang sesuai"
            className="focus:outline-2 focus:shadow-indigo-300"
          />

          {search && (
            <p className="mt-5 text-gray-600">
              Hasil pencarian untuk: <span className="italic">{search}</span>
            </p>
          )}
        </Section>
        <Section>
          {extracurriculars?.data?.length ? (
            <>
              <div className="inline-flex items-center justify-center space-x-3 w-full mt-10">
                <button
                  onClick={() => changeCurrentPage(false)}
                  className="inline-flex items-center justify-center w-8 h-8 border border-gray-100 rounded"
                >
                  <AiOutlineDoubleLeft />
                </button>

                <p className="text-xs">
                  {currentEcPage}
                  <span className="mx-0.25">/</span>
                  {extracurriculars.totalPage}
                </p>

                <button
                  onClick={() => changeCurrentPage(true)}
                  className="inline-flex items-center justify-center w-8 h-8 border border-gray-100 rounded"
                >
                  <AiOutlineDoubleRight />
                </button>
              </div>
              <div className="grid md:grid-cols-2 grid-cols-1 mt-5 gap-5">
                {extracurriculars?.data?.slice(0, 4).map((ec) => (
                  <CardEC
                    name={ec.name}
                    href={`/ekstrakurikuler/${ec.slug}`}
                    image={ec.card_image}
                    members="10"
                    short={ec.short}
                    key={ec.id}
                  />
                ))}
              </div>
            </>
          ) : (
            <div className="mt-10">
              <AlertInfo text="Ekstrakurikuler kosong atau tidak ditemukan" />
            </div>
          )}
        </Section>
      </LayoutBase>
    </>
  );
}

export const getServerSideProps = async (ctx) => {
  const extracurriculars = await getExtracurriculars();

  return {
    props: { data: extracurriculars },
  };
};
