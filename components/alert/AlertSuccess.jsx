import { BsCheckCircleFill } from 'react-icons/bs';

export default function AlertSuccess({ text }) {
  return (
    <div className="flex items-center gap-4 p-4 border-2 border-green-500 text-gray-900 rounded-xl" role="alert">
      <BsCheckCircleFill className="text-green-500" />

      <strong className="text-sm font-semibold text-green-500"> {text} </strong>
    </div>
  );
}
