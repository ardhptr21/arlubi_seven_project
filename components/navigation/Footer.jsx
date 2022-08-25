import Section from '../base/Section';

export default function Footer() {
  return (
    <footer className="border-t-2">
      <Section>
        <div className="py-8 mx-auto sm:px-6 lg:px-8">
          <div className="sm:flex sm:items-center sm:justify-between">
            <div className="flex text-center md:text-left justify-center flex-col">
              <h6 className="font-extrabold text-xl">Arlubi Seven</h6>
              <small>SMK Negeri 7 Semarang</small>
            </div>

            <p className="mt-4 text-sm text-center text-gray-500 lg:text-right lg:mt-0">
              Copyright &copy; 2022. All rights reserved.
            </p>
          </div>
        </div>
      </Section>
    </footer>
  );
}
