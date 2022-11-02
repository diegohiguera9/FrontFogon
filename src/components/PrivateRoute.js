import { useJwt } from "react-jwt";
import { Navigate } from "react-router-dom";

function PrivateRoute({ children }) {
    const { isExpired } = useJwt(localStorage.getItem("token"));
    const auth = isExpired
    return !auth ? children : <Navigate to="/" />;
}

export default PrivateRoute;
  