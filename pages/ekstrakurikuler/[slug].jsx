import Hero from '@/components/base/Hero';
import Section from '@/components/base/Section';

export default function DetailEkstrakurikuler() {
  return (
    <>
      <Section>
        <Hero
          title="Basket"
          detail="Lorem, ipsum dolor sit amet consectetur adipisicing elit. Inventore quam veniam aliquam porro deleniti, quo repellat nisi! Inventore cum consequatur dolorem pariatur eum officia deleniti quasi"
        />
      </Section>

      <Section className="mt-5 prose-base prose-ul:list-disc prose-ol:list-decimal prose-headings:font-bold prose-headings:text-gray-800 prose-p:text-gray-600">
        <h2>Lorem ipsum dolor sit.</h2>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Adipisci dicta libero est dolor laudantium officiis!
          Numquam consectetur ea modi aperiam eos hic, praesentium vel facere harum culpa sit sequi quisquam laboriosam
          aspernatur vero architecto. Blanditiis numquam, est, accusantium ipsa sit nihil quod qui eligendi atque nulla
          iste illum similique sunt reprehenderit culpa excepturi corrupti consequatur iure molestiae! Ratione laborum
          eligendi culpa dignissimos id sequi numquam delectus quos eveniet similique repudiandae, molestiae
          consequuntur dolorem distinctio! Dolores distinctio numquam veniam fuga eaque, nulla error voluptates vitae
          libero, deleniti eos tempora in accusamus impedit corporis. Non dolore, natus deleniti est sunt porro
          repudiandae?
        </p>
        <h2>Lorem ipsum dolor sit amet consectetur.</h2>
        <ul>
          <li>Lorem, ipsum dolor.</li>
          <li>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Necessitatibus?</li>
          <li>Lorem ipsum dolor sit, amet consectetur adipisicing.</li>
        </ul>
        <h2>Lorem ipsum dolor sit amet.</h2>
        <ol>
          <li>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ullam, ipsa?</li>
          <li>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Eaque quaerat facilis voluptatem fuga molestiae
            odio dolorum magnam soluta quibusdam impedit animi, sapiente distinctio incidunt. Reiciendis, animi esse.
            Reprehenderit, error voluptatum!
          </li>
        </ol>
      </Section>
    </>
  );
}
