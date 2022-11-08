import "../styles/pages/SelectTable.scss";
import { useJwt } from "react-jwt";
import { Navigate, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Input, Select } from "@mantine/core";
import { IconClipboard } from "@tabler/icons";
import axios from "axios";

const SelectTable = () => {
  const navigate = useNavigate();
  const { decodedToken } = useJwt(localStorage.getItem("token"));
  const token = localStorage.getItem("token");
  const type = [
    { value: "restaurant", label: "Restaurante" },
    { value: "togo", label: "Pedido en puerta" },
    { value: "delivery", label: "Domicilio" },
    { value: "pickup", label: "Recgoer" },
  ];
  const floor = [
    { value: 1, label: "Piso 1" },
    { value: 2, label: "Piso 2" },
  ];
  const [selectType, setSelectType] = useState(null);
  const [selectFloor, setSelectFloor] = useState(1);
  const [tables, setTables] = useState([]);
  const [selectTable, setSelectTable] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchTable = async () => {
    try {
      setLoading(true);
      const data = await axios.get(
        `https://diegohtop24.herokuapp.com/table/showType/?type=${selectType}&floor=${selectFloor}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      let newTables = [];
      data.data.data.forEach((item) =>
        newTables.push({ value: item.number, label: item.number.toString() })
      );
      setTables(newTables);
      setLoading(false);
    } catch (err) {
      alert(err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    localStorage.setItem("table", selectTable);
    const res = await axios.get(
      `https://diegohtop24.herokuapp.com/table/showNumber/${selectTable}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (res.data.data.order) {
      const orderId = res.data.data.order._id;
      localStorage.setItem("order", orderId);
      navigate(`/selecttable/resumen/${orderId}`);
    } else {
      navigate(`/selecttable/resumen`);
      localStorage.setItem("order", '')
    }
  };

  useEffect(() => {
    if (selectType) {
      fetchTable();
    }
    // eslint-disable-next-line
  }, [selectType, selectFloor]);

  if (decodedToken) {
    if (
      decodedToken.role !== "admin" &&
      decodedToken.role !== "cashier" &&
      decodedToken.role !== "waiter"
    ) {
      return <Navigate to="/pedido" />;
    }
  }

  return (
    <div className="selecttable">
      <h2>Seleccion de mesa</h2>
      <form onSubmit={handleSubmit}>
        <div className="usercreate__input">
          <Input.Wrapper label="Tipo de mesa" required>
            <Select
              placeholder="Tipo de mesa"
              icon={<IconClipboard />}
              data={type}
              onChange={setSelectType}
              value={selectType}
              searchable
              nothingFound="No options"
            />
          </Input.Wrapper>
        </div>
        <div className="usercreate__input">
          <Input.Wrapper label="Piso" required>
            <Select
              placeholder="Piso"
              icon={<IconClipboard />}
              data={floor}
              onChange={setSelectFloor}
              value={selectFloor}
              searchable
              nothingFound="No options"
            />
          </Input.Wrapper>
        </div>
        <div className="usercreate__input">
          <Input.Wrapper label="Numero de mesa" required>
            <Select
              placeholder="Numero de mesa"
              icon={<IconClipboard />}
              data={tables.length === 0 ? [] : tables}
              onChange={setSelectTable}
              value={selectTable}
              searchable
              nothingFound="No options"
            />
          </Input.Wrapper>
        </div>
        <button
          type="submit"
          className="selecttable__submit"
          style={{
            padding: 8,
            color: "white",
            backgroundColor: "black",
            borderRadius: 5,
            marginTop: 10,
          }}
        >
          Siguiente
        </button>
      </form>
    </div>
  );
};

export default SelectTable;
