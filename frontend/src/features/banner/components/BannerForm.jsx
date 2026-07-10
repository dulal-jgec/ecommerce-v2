// src/features/banner/components/BannerForm.jsx

import React, { useEffect, useState } from "react";

const BannerForm = ({ initialData = null, onSubmit, loading = false }) => {
  const [formData, setFormData] = useState({
    title: "",
    subtitle: "",
    buttonText: "",
    buttonLink: "",
    imageUrl: "",
    displayOrder: 1,
    active: true,
  });

  useEffect(() => {
    if (initialData) {
      setFormData({
        title: initialData.title || "",
        subtitle: initialData.subtitle || "",
        buttonText: initialData.buttonText || "",
        buttonLink: initialData.buttonLink || "",
        imageUrl: initialData.imageUrl || "",
        displayOrder: initialData.displayOrder || 1,
        active: initialData.active ?? true,
      });
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]:
        type === "checkbox"
          ? checked
          : name === "displayOrder"
          ? Number(value)
          : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white rounded-2xl shadow p-6 space-y-5"
    >
      <h2 className="text-xl font-bold">
        {initialData ? "Update Banner" : "Create Banner"}
      </h2>

      {/* Title */}
      <div>
        <label className="block mb-2 font-medium">Title</label>

        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          required
          className="w-full border rounded-xl px-4 py-3"
          placeholder="Summer Sale"
        />
      </div>

      {/* Subtitle */}

      <div>
        <label className="block mb-2 font-medium">Subtitle</label>

        <textarea
          rows={3}
          name="subtitle"
          value={formData.subtitle}
          onChange={handleChange}
          className="w-full border rounded-xl px-4 py-3"
          placeholder="Up to 70% OFF"
        />
      </div>

      {/* Button */}

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block mb-2 font-medium">Button Text</label>

          <input
            type="text"
            name="buttonText"
            value={formData.buttonText}
            onChange={handleChange}
            className="w-full border rounded-xl px-4 py-3"
            placeholder="Shop Now"
          />
        </div>

        <div>
          <label className="block mb-2 font-medium">Button Link</label>

          <input
            type="text"
            name="buttonLink"
            value={formData.buttonLink}
            onChange={handleChange}
            className="w-full border rounded-xl px-4 py-3"
            placeholder="/products"
          />
        </div>
      </div>

      {/* Image URL */}

      <div>
        <label className="block mb-2 font-medium">Image URL</label>

        <input
          type="text"
          name="imageUrl"
          value={formData.imageUrl}
          onChange={handleChange}
          required
          className="w-full border rounded-xl px-4 py-3"
          placeholder="https://..."
        />
      </div>

      {formData.imageUrl && (
        <img
          src={formData.imageUrl}
          alt="preview"
          className="w-full h-52 object-cover rounded-xl border"
        />
      )}

      {/* Order */}

      <div>
        <label className="block mb-2 font-medium">Display Order</label>

        <input
          type="number"
          name="displayOrder"
          value={formData.displayOrder}
          onChange={handleChange}
          className="w-40 border rounded-xl px-4 py-3"
        />
      </div>

      {/* Active */}

      <div className="flex items-center gap-3">
        <input
          type="checkbox"
          name="active"
          checked={formData.active}
          onChange={handleChange}
        />

        <label>Active Banner</label>
      </div>

      {/* Button */}

      <button
        disabled={loading}
        className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-3 rounded-xl"
      >
        {loading
          ? "Saving..."
          : initialData
          ? "Update Banner"
          : "Create Banner"}
      </button>
    </form>
  );
};

export default BannerForm;