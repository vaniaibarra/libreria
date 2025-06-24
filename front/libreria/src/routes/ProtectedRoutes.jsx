import { useAuth } from "../context/Context";
import { Navigate } from "react-router-dom";

function PrivateRoute({ children }) {
  const { usuario } = useAuth();

  if (!usuario) {
    return <Navigate to="/login" replace />;
  }

  return children;
}

export default PrivateRoute;
