export default function ButtonFill({ children, className, ...props }) {
  return (
    <button
      {...props}
      className={`inline-block px-10 py-3 text-sm font-medium text-white bg-indigo-600 border border-indigo-600 rounded-md hover:bg-indigo-800 focus:outline-none focus:ring${
        className ? ` ${className}` : ''
      }`}
    >
      {children}
    </button>
  );
}
