import { jwtDecode } from "jwt-decode";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import React from "react";

interface ProtectedRouteProps {
  children: React.ReactNode;
  allowedRoles?: string[];
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, allowedRoles }) => {
  const token = useSelector((state: any) => state.jwt);

  if (!token) {
    return <Navigate to="/login" />;
  }

  const decoded: any = jwtDecode(token);

  // ✅ backend sends `accountType` field → values: "APPLICANT" / "EMPLOYER"
  const userRole = decoded.accountType || decoded.role || decoded.applicantType;

  if (allowedRoles && !allowedRoles.includes(userRole)) {
    return <Navigate to="/" replace />; // redirect to home instead of unauthorized
  }

  return <>{children}</>;
};

export default ProtectedRoute;
