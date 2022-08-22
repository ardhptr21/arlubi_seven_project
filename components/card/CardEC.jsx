export default function CardEC({ name, members, short }) {
  return (
    <div className="relative block p-8 border-gray-200 w-full rounded-xl border-2">
      <div className="flex items-center gap-3">
        <div className="h-14 w-14 bg-gray-200 rounded-full"></div>
        <div>
          <h3 className="text-xl font-bold text-gray-800">{name}</h3>
          <p className="text-gray-600">{members} members</p>
        </div>
      </div>

      <hr className="mt-3 bg-gray-200" />

      <p className="mt-3 text-gray-500">{short} </p>
    </div>
  );
}
