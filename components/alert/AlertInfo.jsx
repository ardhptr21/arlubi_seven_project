import { BsInfoCircleFill } from 'react-icons/bs';

export default function AlertInfo({ text }) {
  return (
    <div className="flex items-center gap-4 p-4 border-2 border-blue-500 text-gray-900 rounded-xl" role="alert">
      <BsInfoCircleFill className="text-blue-500" />

      <strong className="text-sm font-semibold text-blue-500"> {text} </strong>
    </div>
  );
}
