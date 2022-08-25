export default function CardUser({ data }) {
  return (
    <div className="flex justify-start gap-3 items-center">
      <div
        className="w-10 h-10 rounded-full bg-gray-200 bg-cover bg-center"
        style={{ backgroundImage: `url(${data.image})` }}
      ></div>
      <div>
        <p className="font-medium">{data.name}</p>
        <small>{data.class}</small>
      </div>
    </div>
  );
}
