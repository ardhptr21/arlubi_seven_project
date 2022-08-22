import LeftBar from '../side-menu/LeftBar';

export default function LayoutDashboard({ children, title, description, icon: Icon }) {
  return (
    <div className="flex overflow-hidden">
      <LeftBar />
      <main className="p-10 overflow-y-auto w-full">
        <div>
          <div className="flex gap-5 items-center">
            <div className="h-16 w-16 flex justify-center items-center text-white bg-indigo-600 rounded-full">
              <Icon className="h-8 w-8" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-800">{title}</h1>
              <p className="text-gray-600">{description}</p>
            </div>
          </div>
        </div>
        <div className="mt-5">{children}</div>
      </main>
    </div>
  );
}
