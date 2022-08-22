import Image from 'next/image';

export default function Hero({ title, detail, image, width, height }) {
  return (
    <div className="bg-gray-200 px-10 md:h-60 rounded-xl flex-col md:flex-row overflow-hidden flex justify-between items-center">
      <div className="max-w-sm w-full py-10 text-center md:text-left">
        <h1 className="text-3xl text-gray-800 font-bold">{title}</h1>
        {detail && <p className="mt-5 font-medium text-gray-600 opacity-70">{detail}</p>}
      </div>
      {image && <Image src={image} alt="hero image" width={width} height={height} />}
    </div>
  );
}
