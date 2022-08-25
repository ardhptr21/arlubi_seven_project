export default function AlertSuccess({ text }) {
  return (
    <div className="p-2 text-green-700 border rounded border-green-900/10 bg-green-50 text-center " role="alert">
      <strong className="text-lg font-medium">{text}</strong>
    </div>
  );
}
