import { Outlet } from "react-router-dom";
import SellerSidebar from "../components/SellerSidebar";

const SellerLayout = () => {
  return (
    <div className="flex">
      <SellerSidebar />

      <div className="flex-1 p-6">
        <Outlet />
      </div>
    </div>
  );
};

export default SellerLayout;