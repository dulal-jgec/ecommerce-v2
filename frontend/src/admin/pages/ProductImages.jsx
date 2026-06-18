import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import { uploadMultipleProductImages } from "../../services/productImageService";

export default function ProductImages() {
  const { productId } = useParams();
  const navigate = useNavigate();
  
  const [colors, setColors] = useState([]);
  const [currentColor, setCurrentColor] = useState("");
  const [colorImages, setColorImages] = useState({});
  const [uploading, setUploading] = useState(false);
  const [previews, setPreviews] = useState({});

  const colorOptions = ["Red", "Black", "White", "Green", "Blue", "Yellow", "Pink", "Purple", "Orange", "Brown", "Gray", "Navy"];

  const addColor = () => {
    if (!currentColor.trim()) {
      alert("Please enter or select a color");
      return;
    }
    
    if (colors.includes(currentColor)) {
      alert("Color already added");
      return;
    }
    
    setColors([...colors, currentColor]);
    setColorImages({ ...colorImages, [currentColor]: null });
    setPreviews({ ...previews, [currentColor]: null });
    setCurrentColor("");
  };

  const removeColor = (color) => {
    setColors(colors.filter(c => c !== color));
    const newColorImages = { ...colorImages };
    delete newColorImages[color];
    setColorImages(newColorImages);
    
    const newPreviews = { ...previews };
    delete newPreviews[color];
    setPreviews(newPreviews);
  };

  const handleFileChange = (color, file) => {
    if (file) {
      setColorImages({ ...colorImages, [color]: file });
      setPreviews({ ...previews, [color]: URL.createObjectURL(file) });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (colors.length === 0) {
      alert("Please add at least one color");
      return;
    }
    
    const hasEmptyImages = colors.some(color => !colorImages[color]);
    if (hasEmptyImages) {
      alert("Please select an image for each color");
      return;
    }
    
    setUploading(true);
    
    try {
      const imagesData = colors.map(color => ({
        color: color,
        file: colorImages[color]
      }));
      
      await uploadMultipleProductImages(productId, imagesData);
      alert("All images uploaded successfully!");
      
      // Reset form
      setColors([]);
      setColorImages({});
      setPreviews({});
      setCurrentColor("");
      
      // Optional: Navigate back to products page after 2 seconds
      setTimeout(() => {
        navigate("/admin/products");
      }, 2000);
      
    } catch (error) {
      console.error(error);
      alert(error.response?.data?.message || "Upload failed");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-8">
      {/* Header */}
      <div className="mb-8">
        <button
          onClick={() => navigate("/admin/products")}
          className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-gray-700 mb-4"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back to products
        </button>
        
        <h1 className="text-2xl font-semibold text-gray-900">
          Upload Product Images
        </h1>
        <p className="text-sm text-gray-500 mt-1">
          Product ID: {productId} • Add images for multiple colors at once
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Color Selection Section */}
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <h2 className="text-sm font-medium text-gray-900 uppercase tracking-wider mb-4">
            Select Colors
          </h2>
          
          {/* Color Input */}
          <div className="flex gap-3 mb-4">
            <div className="flex-1">
              <div className="flex gap-2 flex-wrap mb-2">
                {colorOptions.map(color => (
                  <button
                    key={color}
                    type="button"
                    onClick={() => setCurrentColor(color)}
                    className={`px-3 py-1 text-sm rounded-lg transition-colors ${
                      currentColor === color
                        ? "bg-gray-900 text-white"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                  >
                    {color}
                  </button>
                ))}
              </div>
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Or type custom color..."
                  value={currentColor}
                  onChange={(e) => setCurrentColor(e.target.value)}
                  className="flex-1 px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-gray-400"
                />
                <button
                  type="button"
                  onClick={addColor}
                  className="px-4 py-2 text-sm font-medium text-white bg-gray-900 rounded-lg hover:bg-gray-800"
                >
                  Add Color
                </button>
              </div>
            </div>
          </div>

          {/* Selected Colors List */}
          {colors.length > 0 && (
            <div className="mt-4">
              <h3 className="text-sm font-medium text-gray-700 mb-2">Selected Colors:</h3>
              <div className="flex flex-wrap gap-2">
                {colors.map(color => (
                  <span
                    key={color}
                    className="inline-flex items-center gap-2 px-3 py-1 bg-gray-100 rounded-lg text-sm"
                  >
                    <span className="w-3 h-3 rounded-full" style={{ 
                      backgroundColor: color.toLowerCase(),
                      border: color.toLowerCase() === 'white' ? '1px solid #ddd' : 'none'
                    }}></span>
                    {color}
                    <button
                      type="button"
                      onClick={() => removeColor(color)}
                      className="text-gray-500 hover:text-red-600"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Image Upload Section */}
        {colors.length > 0 && (
          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <h2 className="text-sm font-medium text-gray-900 uppercase tracking-wider mb-4">
              Upload Images for Each Color
            </h2>
            
            <div className="space-y-6">
              {colors.map(color => (
                <div key={color} className="border-b border-gray-100 last:border-0 pb-4 last:pb-0">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {color}
                  </label>
                  
                  <div className="flex items-start gap-4">
                    <div className="flex-1">
                      <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-200 border-dashed rounded-lg hover:border-gray-300 transition-colors">
                        <div className="space-y-1 text-center">
                          {previews[color] ? (
                            <div className="space-y-3">
                              <img
                                src={previews[color]}
                                alt={color}
                                className="mx-auto h-32 w-32 object-cover rounded-lg"
                              />
                              <button
                                type="button"
                                onClick={() => {
                                  setColorImages({ ...colorImages, [color]: null });
                                  setPreviews({ ...previews, [color]: null });
                                }}
                                className="text-xs text-red-600 hover:text-red-700"
                              >
                                Remove
                              </button>
                            </div>
                          ) : (
                            <>
                              <svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48">
                                <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
                              </svg>
                              <div className="flex text-sm text-gray-600">
                                <label htmlFor={`file-${color}`} className="relative cursor-pointer rounded-md font-medium text-gray-900 hover:text-gray-700">
                                  <span>Upload image</span>
                                  <input
                                    id={`file-${color}`}
                                    name={`file-${color}`}
                                    type="file"
                                    accept="image/*"
                                    onChange={(e) => handleFileChange(color, e.target.files[0])}
                                    className="sr-only"
                                  />
                                </label>
                              </div>
                              <p className="text-xs text-gray-500">PNG, JPG, GIF up to 5MB</p>
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Submit Button */}
        {colors.length > 0 && (
          <button
            type="submit"
            disabled={uploading}
            className="w-full px-4 py-3 text-sm font-medium text-white bg-gray-900 rounded-lg hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {uploading ? (
              <span className="flex items-center justify-center gap-2">
                <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Uploading {colors.length} image{colors.length > 1 ? 's' : ''}...
              </span>
            ) : (
              `Upload ${colors.length} Image${colors.length > 1 ? 's' : ''}`
            )}
          </button>
        )}
      </form>
    </div>
  );
}