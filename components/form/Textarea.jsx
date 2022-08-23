export default function Textarea({ title, name, className, type = 'text', icon, error, ...props }) {
  return (
    <div>
      <label htmlFor={name} className="text-sm font-medium">
        {title}
      </label>

      <div className="relative mt-1">
        <textarea
          {...props}
          type={type}
          id={name}
          className={`w-full disabled:bg-gray-200 resize-x-none p-4 pr-12 text-sm border border-gray-200 rounded-lg shadow-sm${
            className ? ` ${className}` : ''
          }`}
        ></textarea>
        {icon && <span className="absolute inset-y-0 inline-flex items-center right-4">{icon}</span>}
      </div>
      {error && <small className="text-red-500">{error}</small>}
    </div>
  );
}
