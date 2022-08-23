export default function ButtonFill({ children, className, ...props }) {
  return (
    <button
      {...props}
      className={`inline-block px-10 disabled:bg-indigo-900 disabled:cursor-not-allowed py-3 text-sm font-medium text-white bg-indigo-600 border border-indigo-600 rounded-md hover:bg-indigo-800 focus:outline-none focus:ring${
        className ? ` ${className}` : ''
      }`}
    >
      {children}
    </button>
  );
}
