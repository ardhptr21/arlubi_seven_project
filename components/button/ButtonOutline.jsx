export default function ButtonOutline({ children, ...props }) {
  return (
    <button
      {...props}
      className="inline-block px-8 py-2 text-sm font-medium text-indigo-600 border border-indigo-600 rounded-md hover:bg-indigo-600 hover:text-white active:bg-indigo-500 focus:outline-none focus:ring"
    >
      {children}
    </button>
  );
}
