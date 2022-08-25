import { useRef } from 'react';
import dynamic from 'next/dynamic';
import 'react-quill/dist/quill.snow.css';

const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });
const modules = {
  toolbar: [
    [{ header: [false, 2, 3, 4] }],
    ['bold', 'italic', 'underline', 'strike'],
    [{ list: 'ordered' }, { list: 'bullet' }, { indent: '-1' }, { indent: '+1' }, { align: [] }],
    ['link', 'image'],
    ['clean'],
  ],
};

export default function QuillEditor({ title, error, ...props }) {
  const scrollRef = useRef(null);

  const handleInput = (e) => {
    if (scrollRef.current.scrollTop != 0) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  };

  return (
    <div>
      <div className="mb-2">
        <p className="text-sm font-medium">{title}</p>
        {error && <small className="text-red-500">{error}</small>}
      </div>
      <div className="relative">
        <div className="max-h-96 overflow-y-auto pt-20 md:pt-10" ref={scrollRef}>
          <ReactQuill  theme="snow" {...props} modules={modules} onKeyDown={handleInput} />
        </div>
      </div>
    </div>
  );
}
