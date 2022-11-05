import "../styles/components/Resumen.scss";
import { Navigate, useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

const Resumen = () => {
  const params = useParams();
  const tableId = params.id;
  const token = localStorage.getItem("token");
  const [table, setTable] = useState("");
  const [loading, setLoading] = useState(false);

  const searchTable = async () => {
    try {
      setLoading(true);
      const res = await axios.get(
        `https://diegohtop24.herokuapp.com/table/showNumber/${tableId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setTable(res.data.data);
      setLoading(false);
    } catch (err) {
      alert(err);
    }
  };

  useEffect(() => {
    searchTable();
    // eslint-disable-next-line
  }, []);
  if (!tableId) {
    return <Navigate to="/pedido" />;
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <div>{table.order ? <div>Orders</div> : "No orders found"}</div>
      <Link to="/pedido">Ir a pedir</Link>
    </div>
  );
};

export default Resumen;
