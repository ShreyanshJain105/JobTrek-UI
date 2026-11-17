import { jwtDecode } from "jwt-decode";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import React from "react";
import { notifications } from "@mantine/notifications";

interface ProtectedRouteProps {
  children: React.ReactNode;
  allowedRoles?: string[];
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, allowedRoles }) => {
  const token = useSelector((state: any) => state.jwt);
  const user = useSelector((state: any) => state.user);

  if (!token && !user) {
    return <Navigate to="/login" replace />;
  }

  let userRole = user?.accountType;

  if (!userRole && token) {
    try {
      const decoded: any = jwtDecode(token);
      userRole = decoded.accountType || decoded.role || decoded.applicantType;
    } catch (e) {
      console.error("JWT decode error in ProtectedRoute:", e);
    }
  }

  // Superadmin has universal access to all routes across the entire portal
  if (userRole === "SUPERADMIN") {
    return <>{children}</>;
  }

  if (allowedRoles && userRole && !allowedRoles.includes(userRole)) {
    // If an applicant tries to access recruiter/employer routes, redirect to find jobs
    notifications.show({
      title: "Restricted Access",
      message: "This section requires elevated permissions.",
      color: "amber",
    });
    return <Navigate to="/find-jobs" replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;