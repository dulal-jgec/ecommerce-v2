import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

const AdminRoute = () => {
  const { isAuthenticated, user } = useSelector((state) => state.auth);

  if (!isAuthenticated) {
    return <Navigate to="/signin" replace />;
  }

if (user?.role !== "ADMIN") {
    return <Navigate to="/" replace />;
}

  return <Outlet />;
};

export default AdminRoute;