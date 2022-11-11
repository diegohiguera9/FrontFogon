import { useJwt } from "react-jwt";
import { Navigate } from "react-router-dom";
import { IconAlertTriangle, IconCash } from "@tabler/icons";
import "../styles/pages/Admin.scss";
import { Link } from "react-router-dom";

const AdminMap = () => {
  const { decodedToken } = useJwt(localStorage.getItem("token"));

  if (decodedToken) {
    if (decodedToken.role !== "admin") {
      return <Navigate to="/pedido" />;
    }
  }

  return (
    <div className="adminhome">
      <h2 className="adminhome__h2">Consulta Mapa Domicilios</h2>
      <div style={{display:'flex', justifyContent:'flex-start', columnGap:15}}>
        <Link
          to="/admin/map/pendiente"
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            color: 'black'
          }}
        >
          <IconAlertTriangle />
          <span>Pendientes</span>
        </Link>
        <Link
          to="/admin/map/pagada"
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            color: 'black'
          }}
        >
          <IconCash />
          <span>Pagados</span>
        </Link>
      </div>
    </div>
  );
};

export default AdminMap;