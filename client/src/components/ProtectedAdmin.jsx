import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const ProtectedAdmin = ({ children }) => {
  const { user, token } = useSelector((state) => state.auth);


  if (!user || !token) {
    return <Navigate to="/login" />;
  }


  if (!user.isAdmin) {
    return <Navigate to="/" />;
  }

  return children;
};

export default ProtectedAdmin;
