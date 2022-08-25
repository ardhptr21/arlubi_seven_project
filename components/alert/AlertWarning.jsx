import { AiFillWarning } from 'react-icons/ai';

export default function AlertWarning({ text }) {
  return (
    <div className="flex items-center gap-4 p-4 border-2 border-yellow-500 text-gray-900 rounded-xl" role="alert">
      <AiFillWarning className="text-yellow-500" />

      <strong className="text-sm font-semibold text-yellow-500"> {text} </strong>
    </div>
  );
}
