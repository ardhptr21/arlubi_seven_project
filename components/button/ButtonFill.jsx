export default function ButtonFill({ children, ...props }) {
  return (
    <button
      {...props}
      className="inline-block px-8 py-2 text-sm font-medium text-white bg-indigo-600 border border-indigo-600 rounded-md hover:bg-indigo-800 focus:outline-none focus:ring"
    >
      {children}
    </button>
  );
}
