export default function CardStat({ title, value, icon: Icon }) {
  return (
    <div className="flex items-center gap-4 p-6 bg-white border-gray-200 border-2 rounded-lg">
      <span className="p-3 text-blue-600 bg-blue-100 rounded-full">
        <Icon />
      </span>

      <div>
        <h3 className="text-3xl font-bold text-gray-900">{value}</h3>
        <p className="text-sm text-gray-400">{title}</p>
      </div>
    </div>
  );
}
