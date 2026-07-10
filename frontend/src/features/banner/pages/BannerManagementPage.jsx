import React, { useEffect, useState } from "react";

import BannerForm from "../components/BannerForm";
import BannerTable from "../components/BannerTable";

import {
  getAllBanners,
  createBanner,
  updateBanner,
  deleteBanner,
  toggleBanner,
} from "../service/bannerService";

const BannerManagementPage = () => {
  const [banners, setBanners] = useState([]);

  const [selectedBanner, setSelectedBanner] = useState(null);

  const [loading, setLoading] = useState(false);

  const loadBanners = async () => {
    try {
      const data = await getAllBanners();

      setBanners(data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    loadBanners();
  }, []);

  const handleSubmit = async (formData) => {
    try {
      setLoading(true);

      if (selectedBanner) {
        await updateBanner(selectedBanner.id, formData);
      } else {
        await createBanner(formData);
      }

      setSelectedBanner(null);

      loadBanners();
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };
  const handleDelete = async (id) => {
    if (!window.confirm("Delete Banner ?")) return;

    await deleteBanner(id);

    loadBanners();
  };

  const handleToggle = async (id) => {
    await toggleBanner(id);

    loadBanners();
  };

  const handleEdit = (banner) => {
    setSelectedBanner(banner);
  };
  return (
    <div className="space-y-8 p-6">
      <h1 className="text-3xl font-bold">Banner Management</h1>

      <BannerForm
        initialData={selectedBanner}
        loading={loading}
        onSubmit={handleSubmit}
      />

      <BannerTable
        banners={banners}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onToggle={handleToggle}
      />
    </div>
  );
};

export default BannerManagementPage;
