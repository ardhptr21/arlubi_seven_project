import Section from '@/components/base/Section';
import Hero from '@/components/base/Hero';
import CardEC from '@/components/card/CardEC';
import LayoutBase from '@/components/layout/LayoutBase';

export default function Home() {
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
        <CardEC
          name="Paskibra"
          members="16"
          short="Lorem ipsum dolor sit, amet consectetur adipisicing elit. Dolore quo quas ipsum porro quam repellat laboriosam corporis mollitia, a sed!"
        />
        <CardEC
          name="Voli"
          members="35"
          short="Lorem ipsum dolor sit, amet consectetur adipisicing elit. Dolore quo quas ipsum porro quam repellat laboriosam corporis mollitia, a sed!"
        />
        <CardEC
          name="Basket"
          members="24"
          short="Lorem ipsum dolor sit, amet consectetur adipisicing elit. Dolore quo quas ipsum porro quam repellat laboriosam corporis mollitia, a sed!"
        />
        <CardEC
          name="Argapeta"
          members="49"
          short="Lorem ipsum dolor sit, amet consectetur adipisicing elit. Dolore quo quas ipsum porro quam repellat laboriosam corporis mollitia, a sed!"
        />
      </Section>
    </LayoutBase>
  );
}
