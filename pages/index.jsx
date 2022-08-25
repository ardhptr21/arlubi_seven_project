import Section from '@/components/base/Section';
import Hero from '@/components/base/Hero';
import CardEC from '@/components/card/CardEC';
import LayoutBase from '@/components/layout/LayoutBase';
import { getExtracurriculars } from 'api/extracurricular';
import Input from '@/components/form/Input';
import { BiSearchAlt } from 'react-icons/bi';
import debounce from '@/utils/debounce';
import { useState } from 'react';
import AlertInfo from '@/components/alert/AlertInfo';

export default function Home({ extracurriculars }) {
  const [ecs, setEcs] = useState(extracurriculars);
  const [search, setSearch] = useState('');

  const handleChange = async (e) => {
    setSearch(e.target.value);
    try {
      const result = await getExtracurriculars(e.target.value);
      setEcs(result);
    } catch (err) {
      console.log(err.message);
    }
  };

  return (
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
          onChange={debounce(handleChange, 500)}
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
        {ecs.length ? (
          <div className="grid md:grid-cols-2 grid-cols-1 mt-10 gap-5">
            {ecs.map((ec) => (
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
        ) : (
          <div className="mt-10">
            <AlertInfo text="Ekstrakurikuler kosong atau tidak ditemukan" />
          </div>
        )}
      </Section>
    </LayoutBase>
  );
}

export const getServerSideProps = async (ctx) => {
  const extracurriculars = await getExtracurriculars();

  return {
    props: { extracurriculars },
  };
};
