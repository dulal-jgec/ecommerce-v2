import { useEffect, useState } from "react";

import {
  getPendingSellers,
  approveSeller,
  rejectSeller,
} from "../../services/sellerService";

const AdminSellerRequests = () => {
  const [applications, setApplications] = useState([]);

  const loadApplications = async () => {
    const response = await getPendingSellers();

    setApplications(response);
  };

  useEffect(() => {
    loadApplications();
  }, []);

  const handleApprove = async (id) => {
    await approveSeller(id);

    loadApplications();
  };

  const handleReject = async (id) => {
    await rejectSeller(id);

    loadApplications();
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Seller Applications</h1>

      <div className="space-y-4">
        {applications.map((seller) => (
          <div key={seller.id} className="border rounded-lg p-4">
            <h2 className="font-bold">{seller.shopName}</h2>

            <p>{seller.email}</p>

            <p>{seller.description}</p>

            <div className="flex gap-3 mt-4">
              <button
                onClick={() => handleApprove(seller.id)}
                className="bg-green-600 text-white px-4 py-2 rounded"
              >
                Approve
              </button>

              <button
                onClick={() => handleReject(seller.id)}
                className="bg-red-600 text-white px-4 py-2 rounded"
              >
                Reject
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminSellerRequests;
