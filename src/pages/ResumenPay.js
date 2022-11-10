import "../styles/components/Resumen.scss";
import { useParams, useNavigate, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { Input, NumberInput } from "@mantine/core";

const ResumenPay = () => {
  const navigate = useNavigate();
  const params = useParams();
  const orderId = params.id;
  const token = localStorage.getItem("token");
  const [order, setOrder] = useState({});
  const [loading, setLoading] = useState(true);
  const [pay, setPay] = useState(0)

  const searchOrder = async () => {
    try {
      setLoading(true);
      const res = await axios.get(
        `http://localhost:8080/order/showOne/${orderId}`,
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

  const sentPay = async ()=>{
    try {
        setLoading(true);
        await axios.put(
          process.env.REACT_APP_HEROKU+`/order/updateStatus/${orderId}`, {status:'pagada'}, 
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        navigate('/selecttable/cashier')
      } catch (err) {
        alert(err);
      }
  }

  useEffect(() => {
    if (orderId) {
      searchOrder();
    }
    // eslint-disable-next-line
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (order.status !== "pendiente") {
    return <Navigate to="/selecttable/cashier" />;
  }

  return (
    <div className="resumen">
      <h2>{`Resumen mesa ${order.table.number} (${order.user.name})`}</h2>
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
      <h4>Pagar</h4>
      <Input.Wrapper label="Introduce dinero" required>
        <NumberInput
          defaultValue={0}
          parser={(value) => value.replace(/\$\s?|(,*)/g, "")}
          formatter={(value) =>
            !Number.isNaN(parseFloat(value))
              ? `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
              : "$ "
          }
          className="hostform__setmargin"
          step={5000}
          value={pay}
          onChange={setPay}
          hideControls
        />
      </Input.Wrapper>
      <h4>Cambio</h4>
      <p>{`$ ${new Intl.NumberFormat("de-DE").format(pay-order.total)}`}</p>
      <button onClick={sentPay}>Envia Pago</button>
    </div>
  );
};

export default ResumenPay;
