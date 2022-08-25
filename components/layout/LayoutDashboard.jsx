import LeftBar from '../side-menu/LeftBar';

export default function LayoutDashboard({ children, title, description, icon: Icon }) {
  return (
    <div className="flex overflow-hidden">
      <LeftBar />
      <main className="p-10 overflow-y-auto max-h-screen w-full">
        <div className="flex gap-5 items-center flex-col md:flex-row">
          <div className="h-16 w-16 flex justify-center items-center text-white bg-indigo-600 rounded-full">
            <Icon className="h-8 w-8" />
          </div>
          <div className="text-center md:text-left">
            <h1 className="text-3xl font-bold text-gray-800">{title}</h1>
            <p className="text-gray-600">{description}</p>
          </div>
        </div>
        <div className="mt-16 mb-10 md:mb-0">{children}</div>
      </main>
    </div>
  );
}
