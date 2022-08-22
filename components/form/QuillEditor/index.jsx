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

export default function QuillEditor({ title, ...props }) {
  const scrollRef = useRef(null);

  const handleInput = (e) => {
    if (scrollRef.current.scrollTop != 0) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  };

  return (
    <div>
      <p className="text-sm mb-2 font-medium">{title}</p>
      <div className="relative">
        <div className="max-h-96 overflow-y-auto pt-10" ref={scrollRef}>
          <ReactQuill theme="snow" {...props} modules={modules} onKeyDown={handleInput} />
        </div>
      </div>
    </div>
  );
}
