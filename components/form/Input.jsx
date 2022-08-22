export default function Input({ title, name, type = 'text', icon, ...props }) {
  return (
    <div>
      <label htmlFor={name} className="text-sm font-medium">
        {title}
      </label>

      <div className="relative mt-1">
        <input
          {...props}
          type={type}
          id={name}
          className="w-full p-4 pr-12 text-sm border-gray-200 rounded-lg shadow-sm"
        />
        {icon && <span className="absolute inset-y-0 inline-flex items-center right-4">{icon}</span>}
      </div>
    </div>
  );
}
