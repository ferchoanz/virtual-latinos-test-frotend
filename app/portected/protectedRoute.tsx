import React from "react";
import { Navigate, useLocation, useNavigate, useRoutes,  } from "react-router";
import { useUser } from "~/context/UserContext";
interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { user, loading } = useUser();
  const location = useLocation()

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  if (!user && !location.pathname.includes('login')) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
