import Image from 'next/image';

export default function Hero({ title, detail, image, width, height, overlay, ...props }) {
  return (
    <div
      {...props}
      className="bg-gray-200 relative aspect-[21/9] w-full bg-cover bg-center px-10 z-10 rounded-xl flex-col md:flex-row overflow-hidden flex justify-between items-center"
    >
      {overlay && <div className="absolute inset-0 bg-black bg-opacity-50 -z-10"></div>}
      <div className="max-w-sm w-full py-10 text-center md:text-left">
        <h1 className={`text-6xl ${overlay ? 'text-white' : 'text-gray-800'} font-bold`}>{title}</h1>
        {detail && (
          <p className={`mt-5 text-lg font-medium ${overlay ? 'text-gray-200' : 'text-gray-600'}  opacity-70`}>
            {detail}
          </p>
        )}
      </div>
      {image && <Image src={image} alt="hero image" width={width} height={height} />}
    </div>
  );
}
