// src/features/seller/components/product-images/ColorSelector.jsx

import { useState } from "react";
import { Plus } from "lucide-react";

const ColorSelector = ({
  colors,
  selectedColor,
  setSelectedColor,
}) => {
  const [newColor, setNewColor] = useState("");

  const handleAddColor = () => {
    const color = newColor.trim();

    if (!color) return;

    if (!colors.includes(color)) {
      setSelectedColor(color);
    } else {
      setSelectedColor(color);
    }

    setNewColor("");
  };

  return (
    <div className="bg-white border rounded-xl p-5">

      <h3 className="font-semibold text-gray-800 mb-4">
        Product Colors
      </h3>

      {/* Existing Colors */}

      <div className="flex flex-wrap gap-2 mb-4">

        {colors.map((color) => (

          <button
            key={color}
            onClick={() => setSelectedColor(color)}
            className={`px-4 py-2 rounded-lg border transition

            ${
              selectedColor === color
                ? "bg-emerald-600 text-white border-emerald-600"
                : "bg-white hover:bg-gray-50 border-gray-300"
            }

            `}
          >
            {color}
          </button>

        ))}

      </div>

      {/* Add New Color */}

      <div className="flex gap-2">

        <input
          type="text"
          placeholder="Example : Red"
          value={newColor}
          onChange={(e) => setNewColor(e.target.value)}
          className="flex-1 border rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-emerald-500"
        />

        <button
          onClick={handleAddColor}
          className="px-4 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 flex items-center gap-2"
        >
          <Plus size={18} />

          Add
        </button>

      </div>

      {selectedColor && (

        <div className="mt-4 text-sm text-emerald-600 font-medium">

          Selected Color :
          <span className="ml-2">
            {selectedColor}
          </span>

        </div>

      )}

    </div>
  );
};

export default ColorSelector;