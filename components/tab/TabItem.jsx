export default function TabItem({ active, text, ...props }) {
  return (
    <li className="flex-1 cursor-pointer" {...props}>
      <div className="relative block p-4">
        <span
          className={`absolute inset-x-0 w-full h-px ${active ? 'bg-indigo-600' : 'bg-gray-200'} -bottom-px`}
        ></span>

        <div className="flex items-center justify-center">
          <span className="ml-3 text-sm font-medium text-gray-900">{text}</span>
        </div>
      </div>
    </li>
  );
}
