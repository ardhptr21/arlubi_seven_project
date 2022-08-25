export default function AlertWarning({ text }) {
  return (
    <div className="p-2 text-yellow-700 border rounded border-yellow-900/10 bg-yellow-50 text-center " role="alert">
      <strong className="text-lg font-medium">{text}</strong>
    </div>
  );
}
