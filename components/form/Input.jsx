import { forwardRef } from 'react';

const Input = ({ title, className, name, type = 'text', icon: Icon, error, ...props }, ref) => {
  return (
    <div>
      <label htmlFor={name} className="text-sm font-medium">
        {title}
      </label>

      <div className="relative mt-1">
        <input
          ref={ref}
          {...props}
          type={type}
          id={name}
          name={name}
          className={`w-full disabled:bg-gray-200 p-4 pr-12 text-sm border focus:outline-2 focus:outline-indigo-600 outline-none peer rounded-lg shadow-sm${
            className ? ` ${className}` : ''
          }`}
        />
        {Icon && (
          <span className="absolute inset-y-0 inline-flex items-center right-4 text-gray-200 peer-focus:text-indigo-600">
            <Icon size="28" />
          </span>
        )}
      </div>
      {error && <small className="text-red-500">{error}</small>}
    </div>
  );
};

export default forwardRef(Input);
