export default function ButtonFill({ children, className, colorSpace = 'normal', ...props }) {
  const colors = {
    normal: 'bg-indigo-600 border-indigo-600 hover:bg-indigo-800 disabled:bg-indigo-900',
    warning: 'bg-yellow-500 border-yellow-500 hover:bg-yellow-700 disabled:bg-yellow-800',
    success: 'bg-green-600 border-green-600 hover:bg-green-800 disabled:bg-green-900',
    danger: 'bg-red-600 border-red-600 hover:bg-red-800 disabled:bg-red-900',
  };

  return (
    <button
      {...props}
      className={`${
        colors[colorSpace]
      } px-10 gap-2 disabled:cursor-not-allowed flex justify-center items-center duration-300 py-3 text-sm font-medium text-white border rounded-md focus:outline-none focus:ring${
        className ? ` ${className}` : ''
      }`}
    >
      {children}
    </button>
  );
}
