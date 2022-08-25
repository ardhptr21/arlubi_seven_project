export default function AlertInfo({ text }) {
    return (
      <div className="p-2 text-blue-700 border rounded border-blue-900/10 bg-blue-50 text-center " role="alert">
        <strong className="text-lg font-medium">{text}</strong>
      </div>
    );
  }
  