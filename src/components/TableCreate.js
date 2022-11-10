import "../styles/components/UserCreate.scss";
import { Input, NumberInput, Select } from "@mantine/core";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const TableCreate = () => {
  const params = useParams();
  const tableId = params.id;
  const [user, setUser] = useState("");
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [number, setNumber] = useState(user ? user.number : 1);
  const [floor, setFloor] = useState(user ? user.floor : 1);
  const [type, setType] = useState(user?user.type:'')

  const token = localStorage.getItem("token");

  const sendUser = async (url, data) => {
    try {
      await axios.post(url, data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      navigate("/admin/table");
    } catch (err) {
      alert(err.response.data.message);
    }
  };

  const searchTable = async () => {
    try {
      setLoading(true);
      const res = await axios.get(
        process.env.REACT_APP_HEROKU+`/table/show/${tableId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setLoading(false);
      setUser(res.data.data);
    } catch (err) {
      alert(err);
    }
  };

  useEffect(() => {
    if (tableId) {
      searchTable();
    }
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (user) {
      setNumber(user.number);
      setFloor(user.floor)
      setType(user.type)
    }
  }, [user]);

  if (loading) {
    return <div>loading...</div>;
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      number,
      floor, 
      type
    };

    if (user) {
      sendUser(
        process.env.REACT_APP_HEROKU+`/table/update/${tableId}`,
        data
      );
    } else {
      sendUser(process.env.REACT_APP_HEROKU+"/table/create", data);
    }
  };

  return (
    <div className="usercreate">
      <h2>{user ? `Editing ${user.number}` : "New Table"}</h2>
      <form onSubmit={handleSubmit}>
        <div className="usercreate__input">
          <Input.Wrapper label="Numero" required>
            <NumberInput
              defaultValue={1}
              className="hostform__setmargin"
              step={1}
              value={number}
              onChange={setNumber}
            />
          </Input.Wrapper>
        </div>
        <div className="usercreate__input">
        <Input.Wrapper label="Piso" required>
            <NumberInput
              defaultValue={1}
              className="hostform__setmargin"
              step={1}
              value={floor}
              onChange={setFloor}
            />
          </Input.Wrapper>      
        </div>
        <div className="usercreate__input">
          <Input.Wrapper label="Tipo" required>
            <Select
              placeholder="Tipo"
              data={[
                {value:'restaurant',label:'Restaurant'},
                {value:'togo',label:'To go'},
                {value:'delivery',label:'Delivery'},
                {value:'pickup', label:'pickup'}
              ]}
              onChange={setType}
              value={type}
            />
          </Input.Wrapper>
        </div>
        <button className="usercreate__submit">
          {user ? "Update table" : "Create table"}
        </button>
      </form>
    </div>
  );
};

export default TableCreate;
