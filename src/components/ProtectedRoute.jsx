import { useAuth } from "../context/AuthProvider";
import { Navigate } from "react-router-dom";

export default function ProtectedRoute(props) {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/login" />;
  }

  return props.children;
}
