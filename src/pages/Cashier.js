import '../styles/pages/Cashier.scss'
import "../styles/pages/SetUser.scss";
import { useState, useEffect } from "react";
import axios from "axios";
import { Link, Navigate } from "react-router-dom";
import ListingContainer from "../components/ListingContainer";
import { Input, Tabs } from "@mantine/core";
import { IconSearch, IconAlertTriangle, IconCash } from "@tabler/icons";
import { useJwt } from "react-jwt";

const Cashier = () => {
  const [activeTab, setActiveTab] = useState("Pendientes");

  const [allCategory, setAllCategory] = useState({});
  const [search, setSearch] = useState("");
  const [filterUsers, setFilterUsers] = useState({});
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("token");

  const fetchOrders = async () => {
    try {
      const data = await axios.get(process.env.REACT_APP_HEROKU+`/order/showStatus/?status=pendiente`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setAllCategory(data.data.data);
      setFilterUsers(data.data.data);
      setLoading(false);
    } catch (err) {
      alert(err);
    }
  };

  const fethPayed = async () => {
    try {
      const day = new Date().getDate()
      const data = await axios.get(process.env.REACT_APP_HEROKU+`/order/byday/?day=${day}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setAllCategory(data.data.data);
      setFilterUsers(data.data.data);
      setLoading(false);
    } catch (err) {
      alert(err);
    }
  };


  const filterUser = (query) => {
    if(query === ''){
      return setFilterUsers(allCategory)
    }
    setFilterUsers(
        allCategory.filter(
        (item) =>
        item.table.number.toString() === query.toLowerCase() ||
        item.user.name.toLowerCase().includes(query.toLowerCase())
      )
    );
  };

  useEffect(() => {
    fetchOrders();
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (allCategory.length > 0) {
      filterUser(search);
    }
    // eslint-disable-next-line
  }, [search]);

  const { decodedToken } = useJwt(localStorage.getItem("token"));

  if (decodedToken) {
    if (
      (decodedToken.role !== "admin" &&
        decodedToken.role !== "cashier") 
    ) {
      return <Navigate to="/selecttable" />;
    }
  }


  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="setuser">
      <h2>Modulo de caja</h2>
      <div className="setuser__search">
        <Link to="/selecttable">
          <button className="setuser__create">+ Crear pedido</button>
        </Link>
        <Input.Wrapper>
          <Input
            placeholder="Search"
            icon={<IconSearch />}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </Input.Wrapper>
      </div>
      <Tabs
        color="red"
        defaultValue="gallery"
        value={activeTab}
        onTabChange={setActiveTab}
      >
        <Tabs.List>
          <Tabs.Tab
            value="Pendientes"
            icon={<IconAlertTriangle size={14} />}
            onClick={fetchOrders}
          >
            Pendintes
          </Tabs.Tab>
          <Tabs.Tab
            value="Pagadas"
            icon={<IconCash size={14} />}
            onClick={fethPayed}
          >
            Pagadas
          </Tabs.Tab>
        </Tabs.List>
      </Tabs>
      <div
        className="listingcontainer"
        style={{ color: "grey", borderTop: "none" }}
      >
        <div className="listingcontainer__div">Mesa</div>
        <div className="listingcontainer__div">Mesero</div>
        <div className="listingcontainer__div">Estado</div>
        <div className="listingcontainer__div">$ Total</div>
        <p>ver</p>
        <p style={{display:activeTab === 'Pagadas'?'none':'block'}}>pagar</p>
        <p style={{display:activeTab === 'Pagadas'?'none':'block'}}>print</p>
      </div>
      {filterUsers.length === 0 ? (
        <h1>No orders found</h1>
      ) : (
        filterUsers.map((item, index) => {
          return (
            <>
              <ListingContainer
                key={index}
                name={item.table.number}
                email={item.user.name}
                role={item.status}
                price={item.total}
                route={`/selecttable/resumen/${item._id}`}
                token={token}
                pay={item.status === 'pagada'?'':`/selecttable/cashier/pay/${item._id}`}
                print={process.env.REACT_APP_HEROKU+`/order/printResume/${item._id}`}
              />
            </>
          );
        })
      )}
    </div>
  );
};

export default Cashier;