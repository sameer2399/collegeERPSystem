import { useSelector } from "react-redux";
import { Navigate, Outlet, useLocation } from "react-router-dom";

export const ProtectedRoutes = () => {
  const location = useLocation();
  const { isAuthenticated } = useSelector((state) => state.auth);
  return isAuthenticated ? (
    <Outlet />
  ) : (
    <Navigate state={{ from: location }} replace to={{ pathname: "/login" }} />
  );
};

export const GuestRoutes = () => {
  const location = useLocation();
  const { isAuthenticated } = useSelector((state) => state.auth);
  return !isAuthenticated ? (
    <Outlet />
  ) : (
    <Navigate state={{ from: location }} replace to={{ pathname: "/" }} />
  );
};

export const AdminRoutes = () => {
  const location = useLocation();
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  return isAuthenticated && user.role === "ADMIN" ? (
    <Outlet />
  ) : (
    <Navigate state={{ from: location }} replace to={{ pathname: "/" }} />
  );
};

export const ModeratorRoutes = () => {
  const location = useLocation();
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  return isAuthenticated && user.role === "MODERATOR" ? (
    <Outlet />
  ) : (
    <Navigate state={{ from: location }} replace to={{ pathname: "/" }} />
  );
};

export const AdminAndModRoutes = () => {
  const location = useLocation();
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  return (isAuthenticated && user.role === "MODERATOR") ||
    user.role === "ADMIN" ? (
    <Outlet />
  ) : (
    <Navigate state={{ from: location }} replace to={{ pathname: "/" }} />
  );
};

export const CheckOutRoutes = () => {
  const location = useLocation();
  const { isAuthenticated } = useSelector((state) => state.auth);
  const { eventId } = useSelector((state) => state.checkout);
  return isAuthenticated && eventId ? (
    <Outlet />
  ) : (
    <Navigate state={{ from: location }} replace to={{ pathname: "/events" }} />
  );
};
