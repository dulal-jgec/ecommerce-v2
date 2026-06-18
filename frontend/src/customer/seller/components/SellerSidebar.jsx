import { Link } from "react-router-dom";

const SellerSidebar = () => {
  return (
    <div className="w-64 min-h-screen bg-black text-white p-5">
      <h2 className="text-xl font-bold mb-8">
        Seller Panel
      </h2>

      <div className="space-y-4">
        <Link to="/seller/dashboard">
          Dashboard
        </Link>

        <Link to="/seller/products">
          Products
        </Link>

        <Link to="/seller/products/create">
          Add Product
        </Link>

        <Link to="/seller/orders">
          Orders
        </Link>

        <Link to="/seller/profile">
          Profile
        </Link>
      </div>
    </div>
  );
};

export default SellerSidebar;