import { Navigate } from "react-router";
import { useJwt } from "react-jwt";

const Pedido = () => {
  const { isExpired } = useJwt(localStorage.getItem("token"));

  if (isExpired) {
    return <Navigate to="/" />;
  }

  return <div>pedido</div>;
};

export default Pedido;
