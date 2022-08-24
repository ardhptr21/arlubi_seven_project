import Image from 'next/image';
import Link from 'next/link';

export default function CardEC({ name, members, short, image, href = '#' }) {
  return (
    <Link href={href}>
      <a className="relative group  duration-300 block p-8 border-gray-200 w-full rounded-xl border-2 hover:border-indigo-400 hover:border-4">
        <div className="flex flex-col items-start gap-3">
          <div className="aspect-video overflow-hidden relative rounded-xl bg-gray-200 w-full">
            {image && (
              <Image layout="fill" alt={name} className="scale-110 group-hover:scale-100 duration-300" src={image} />
            )}
          </div>
          <div>
            <h3 className="text-xl font-bold text-gray-800 group-hover:text-gray-900">{name}</h3>
            <p className="text-gray-600 group-hover:text-gray-700">{members} members</p>
          </div>
        </div>

        <hr className="mt-3  border-1 border-gray-200 " />

        <p className="mt-3 text-gray-600 group-hover:text-gray-700">{short}</p>
      </a>
    </Link>
  );
}
