import Link from 'next/link';

export default function LeftBarItem({ name, icon: Icon, href = '#' }) {
  return (
    <Link href={href}>
      <a className="flex justify-center px-2 py-1.5 t rounded group relative">
        <Icon className="w-5 h-5 opacity-75 group-hover:text-indigo-600" />
        <span className="absolute text-xs font-medium text-white bg-gray-900 left-full ml-4 px-2 py-1.5 top-1/2 -translate-y-1/2 rounded opacity-0 group-hover:opacity-100">
          {name}
        </span>
      </a>
    </Link>
  );
}
