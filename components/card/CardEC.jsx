import Link from 'next/link';

export default function CardEC({ name, members, short, href = '#' }) {
  return (
    <Link href={href}>
      <a className="relative group  duration-300 block p-8 border-gray-200 w-full rounded-xl border-2 hover:border-indigo-400 ">
        <div className="flex items-center gap-3">
          <div className="h-14 w-14 bg-gray-200 rounded-full"></div>
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
