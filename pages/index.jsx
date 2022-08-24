import Section from '@/components/base/Section';
import Hero from '@/components/base/Hero';
import CardEC from '@/components/card/CardEC';
import LayoutBase from '@/components/layout/LayoutBase';
import { getExtracurriculars } from 'api/extracurricular';

export default function Home({ extracurriculars }) {
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
      <Section className="grid md:grid-cols-2 grid-cols-1 mt-10 gap-5">
        {extracurriculars.map((ec) => (
          <CardEC
            name={ec.name}
            href={`/ekstrakurikuler/${ec.slug}`}
            image={ec.card_image}
            members="10"
            short={ec.short}
            key={ec.id}
          />
        ))}
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
