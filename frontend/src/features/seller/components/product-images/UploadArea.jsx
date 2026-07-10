// src/features/seller/components/product-images/UploadArea.jsx

import { useRef, useState } from "react";
import { Upload } from "lucide-react";

const UploadArea = ({
  selectedColor,
  onUpload,
}) => {
  const inputRef = useRef(null);

  const [dragOver, setDragOver] = useState(false);

  const handleFiles = async (files) => {
    if (!files || files.length === 0) return;

    // upload one by one
    for (const file of files) {
      await onUpload(file);
    }
  };

  return (
    <div
      className={`
        border-2 border-dashed rounded-2xl p-10 text-center transition

        ${
          dragOver
            ? "border-emerald-500 bg-emerald-50"
            : "border-gray-300"
        }
      `}
      onDragOver={(e) => {
        e.preventDefault();
        setDragOver(true);
      }}
      onDragLeave={() => {
        setDragOver(false);
      }}
      onDrop={async (e) => {
        e.preventDefault();

        setDragOver(false);

        if (!selectedColor) {
          alert("Select a color first");
          return;
        }

        await handleFiles(e.dataTransfer.files);
      }}
    >
      <input
        ref={inputRef}
        type="file"
        hidden
        multiple
        accept="image/*"
        onChange={async (e) => {
          if (!selectedColor) {
            alert("Select a color first");
            return;
          }

          await handleFiles(e.target.files);

          e.target.value = "";
        }}
      />

      <div className="flex flex-col items-center gap-4">

        <div className="p-5 rounded-full bg-gray-100">

          <Upload
            size={34}
            className="text-gray-500"
          />

        </div>

        <h3 className="font-semibold text-lg">

          Upload Images

        </h3>

        <p className="text-gray-500">

          Drag & Drop images here

        </p>

        <p className="text-gray-400">

          or

        </p>

        <button
          onClick={() => {
            if (!selectedColor) {
              alert("Select a color first");
              return;
            }

            inputRef.current.click();
          }}
          className="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-2 rounded-lg"
        >
          Browse Files
        </button>

        <p className="text-xs text-gray-400">

          JPG • PNG • WEBP

        </p>

        {selectedColor && (

          <div className="mt-2">

            <span className="text-sm text-gray-600">

              Uploading for

            </span>

            <span className="ml-2 px-3 py-1 rounded-full bg-emerald-100 text-emerald-700">

              {selectedColor}

            </span>

          </div>

        )}
      </div>
    </div>
  );
};

export default UploadArea;