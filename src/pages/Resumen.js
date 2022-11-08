import "../styles/components/Resumen.scss";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

const Resumen = () => {
  const navigate = useNavigate()
  const params = useParams();
  const orderId = params.id;
  const token = localStorage.getItem("token");
  const [order, setOrder] = useState({});
  const [loading, setLoading] = useState(true);

  const searchOrder = async () => {
    try {
      setLoading(true);
      const res = await axios.get(
        `https://diegohtop24.herokuapp.com/order/showOne/${orderId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setOrder(res.data.data);
      setLoading(false);
    } catch (err) {
      alert(err);
    }
  };

  const setDelete = ()=>{
    localStorage.setItem('action','delete')
    navigate('/pedido')
  }

  const setAdd = ()=>{
    localStorage.setItem('action','add')
    navigate('/pedido')
  }

  useEffect(() => {
    if (orderId){
      searchOrder();
    }
    // eslint-disable-next-line
  }, []);

  if (!orderId) {
    return (
      <div className="resumen" style={{display:'block'}}>
        <span>No orders found</span>
        <button onClick={setAdd}>Agregar</button>
      </div>
    );
  }
  
  if (loading) {
    return <div>Loading...</div>;
  }


  return (
    <div className="resumen">
      <h2>{`Resumen mesa ${order.table.number}`}</h2>
      <div className="resumen__main">
        <div className="resumen__products resumen__header">
          <span>Producto</span>
          <span>Precio unit</span>
          <span>Cantidad</span>
          <span>$ Parcial</span>
        </div>
      </div>
      <div className="resumen__main">
        {order.products.map((item, index) => {
          return (
            <div key={`product${index}`} className="resumen__products">
              <span>{item.name}</span>
              <span>{`$ ${new Intl.NumberFormat("de-DE").format(
                item.price
              )}`}</span>
              <span>{item.count}</span>
              <span>{`$ ${new Intl.NumberFormat("de-DE").format(
                item.totalPrice
              )}`}</span>
            </div>
          );
        })}
      </div>
      <h3>{`Total mesa: $ ${new Intl.NumberFormat("de-DE").format(
        order.total
      )}`}</h3>
      <button onClick={setAdd}>Agregar</button>
      <button onClick={setDelete}>Eliminar</button>
    </div>
  );
};

export default Resumen;
