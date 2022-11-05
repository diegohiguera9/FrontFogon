import { useJwt } from "react-jwt";
import { Navigate } from "react-router-dom";
import { IconUsers, IconBuildingStore, IconShoppingCartPlus } from "@tabler/icons";
import "../styles/pages/Admin.scss";
import { Link } from "react-router-dom";

const Admin = () => {
  const { decodedToken } = useJwt(localStorage.getItem("token"));

  if (decodedToken) {
    if (decodedToken.role !== "admin") {
      return <Navigate to="/pedido" />;
    }
  }

  return (
    <div className="adminhome">
      <h2 className="adminhome__h2">Bienvenido</h2>
      <h3 style={{marginBottom:20}}>Accesos rapidos...</h3>
      <div style={{display:'flex', justifyContent:'flex-start', columnGap:15}}>
        <Link
          to="/admin/user"
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            color: 'black'
          }}
        >
          <IconUsers />
          <span>Usuarios</span>
        </Link>
        <Link
          to="/admin/product"
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            color: 'black'
          }}
        >
          <IconBuildingStore />
          <span>Productos</span>
        </Link>
        <Link
          to="/pedido"
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            color: 'black'
          }}
        >
          <IconShoppingCartPlus />
          <span>Modulo Pedidos</span>
        </Link>
      </div>
    </div>
  );
};

export default Admin;
