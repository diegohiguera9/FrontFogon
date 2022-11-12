import "../styles/pages/Cashier.scss";
import "../styles/pages/SetUser.scss";
import { useState, useEffect } from "react";
import axios from "axios";
import ListingContainer from "../components/ListingContainer";
import { Input } from "@mantine/core";
import { IconSearch } from "@tabler/icons";
import { DatePicker } from "@mantine/dates";

const Report = () => {
  const [allCategory, setAllCategory] = useState([]);
  const [total, setTotal] = useState(0);
  const [search, setSearch] = useState("");
  const [filterUsers, setFilterUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const token = localStorage.getItem("token");

  const [inDay, setInDay] = useState();
  const [finalDay, setFinalDay] = useState();

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const data = await axios.post(
        process.env.REACT_APP_HEROKU + `/order/report`,
        { dates: [inDay, finalDay] },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setAllCategory(data.data.data);
      setFilterUsers(data.data.data);
      setTotal(data.data.totalPayed);
      setLoading(false);
    } catch (err) {
      alert(err);
    }
  };

  const filterUser = (query) => {
    if (query === "") {
      return setFilterUsers(allCategory);
    }
    setFilterUsers(
      allCategory.filter(
        (item) =>
          item.table.number.toString() === query.toLowerCase() ||
          item.user.name.toLowerCase().includes(query.toLowerCase()) ||
          item.status.toLowerCase().includes(query.toLowerCase())
      )
    );
  };

  useEffect(() => {
    // fetchOrders();
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (allCategory.length > 0) {
      filterUser(search);
    }
    // eslint-disable-next-line
  }, [search]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="setuser">
      <h2>Modulo de informes</h2>
      <div style={{ width: 300, marginTop: 15 }}>
        <DatePicker
          placeholder="Pick date"
          label="Inicio"
          withAsterisk
          value={inDay}
          onChange={setInDay}
        />
        <DatePicker
          placeholder="Pick date"
          label="Fin"
          withAsterisk
          value={finalDay}
          onChange={setFinalDay}
        />
      </div>
      <button
        onClick={fetchOrders}
        style={{
          marginTop: 15,
          marginBottom: 15,
          color: "white",
          backgroundColor: "black",
          borderRadius: 5,
          padding: 8,
        }}
      >
        Buscar
      </button>
      <h3>{`Total ventas: $ ${new Intl.NumberFormat("de-DE").format(total)}`}</h3>
      <div className="setuser__search">
        <Input.Wrapper>
          <Input
            placeholder="Search"
            icon={<IconSearch />}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </Input.Wrapper>
      </div>
      <div
        className="listingcontainer"
        style={{ color: "grey", borderTop: "none" }}
      >
        <div className="listingcontainer__div">Mesa</div>
        <div className="listingcontainer__div">Mesero</div>
        <div className="listingcontainer__div">Estado</div>
        <div className="listingcontainer__div">$ Total</div>
        <div className="listingcontainer__div">Fecha</div>
        <p>ver</p>
      </div>
      {filterUsers.length === 0 ? (
        <h1>No orders found</h1>
      ) : (
        filterUsers.map((item, index) => {
          return (
              <ListingContainer
                key={index}
                name={item.table.number}
                email={item.user.name}
                role={item.status}
                price={item.total}
                route={`/selecttable/resumen/${item._id}`}
                token={token}
                created={
                  new Date(item.updatedAt)
                    .toLocaleString("sp-CO", { timeZone: "America/Bogota" })
                    .split(",")[0]
                }
              />
          );
        })
      )}
    </div>
  );
};

export default Report;
