import { useEffect, useState } from "react";
import { useJwt } from "react-jwt";
import { Navigate, Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/pages/Pedido.scss";
import CardMain from "../components/CardMain";
import { Tabs, Input } from "@mantine/core";
import {
  IconSoup,
  IconMeat,
  IconToolsKitchen2,
  IconAdjustmentsAlt,
  IconAlertCircle,
  IconSearch,
} from "@tabler/icons";
import { getProducts } from "../store/actions/Product.action";
import { POST_PENDING } from "../store/reducers/Product.reducer";
import { SET_LOCATION } from "../store/reducers/Location.reducer";
import { useDispatch, useSelector } from "react-redux";

const icones = [
  <IconSoup size={14} />,
  <IconMeat size={14} />,
  <IconMeat size={14} />,
  <IconToolsKitchen2 size={14} />,
];

const Pedido = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const token = localStorage.getItem("token");
  const table = localStorage.getItem("table");
  const order = localStorage.getItem("order");
  const action = localStorage.getItem("action");

  const [activeTab, setActiveTab] = useState("Todas");
  const [search, setSearch] = useState("");

  const products = useSelector((state) => state.productReducer.post);
  const loading = useSelector((state) => state.productReducer.loading);
  const pending = useSelector((state) => state.productReducer.pending);
  const location = useSelector((state)=>state.locationReducer.location)

  const [filterProducts, setFilterProducts] = useState(
    useSelector((state) => state.productReducer.post)
  );
  const [category, setAllCategory] = useState([]);
  const [loaading2, setLoading2] = useState(false);

  const fetchCategory = async () => {
    try {
      setLoading2(true);
      const data = await axios.get(
        process.env.REACT_APP_HEROKU+"/category/showAll",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setAllCategory(data.data.data);
      setLoading2(false);
    } catch (err) {
      alert(err);
    }
  };

  const filter = (query) => {
    setFilterProducts(
      products.filter(
        (item) =>
          item.name.toLowerCase().includes(query.toLowerCase()) ||
          item.categoryId.name.toLowerCase().includes(query.toLowerCase())
      )
    );
  };

  const handleClick = (value) => {
    filter(value);
  };

  const updateOrder = async () => {
    try {
      const res = await axios.put(
        process.env.REACT_APP_HEROKU+`/order/update/${order}`,
        { data: [...pending] },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      localStorage.setItem("order", res.data.data._id);
      navigate(`/selecttable/resumen/${res.data.data._id}`);
    } catch (err) {}
  };

  const upDeleteOrder = async () => {
    try {
      const res = await axios.put(
        process.env.REACT_APP_HEROKU+`/order/upDelete/${order}`,
        { data: [...pending] },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      localStorage.setItem("order", res.data.data._id);
      navigate(`/selecttable/resumen/${res.data.data._id}`);
    } catch (err) {}
  };

  const sendOrder = async () => {
    try {
      const res = await axios.post(
        process.env.REACT_APP_HEROKU+"/order/create",
        { data: [...pending], table: localStorage.getItem("table"), status:'pendiente', kitchen:'preparacion', location:{...location} },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      localStorage.setItem("order", res.data.data._id);
      dispatch({type: SET_LOCATION, payload:{}})
      navigate(`/selecttable/resumen/${res.data.data._id}`);
    } catch (err) {
      console.log(err);
    }
  };

  const finalSubmit = () => {
    if (order) {
      if (action === "add") {
        updateOrder();
      } else if (action === "delete") {
        upDeleteOrder();
      }
    } else {
      sendOrder();
    }
  };

  useEffect(() => {
    dispatch(getProducts(token));
    fetchCategory();
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    setFilterProducts(products);
    // eslint-disable-next-line
  }, [loading]);

  useEffect(() => {
    if (products.length > 0) {
      filter(search);
    }
    // eslint-disable-next-line
  }, [search]);

  const { decodedToken } = useJwt(localStorage.getItem("token"));

  if (decodedToken) {
    if (
      (decodedToken.role === "admin" ||
        decodedToken.role === "cashier" ||
        decodedToken.role === "waiter") &&
      !table
    ) {
      return <Navigate to="/selecttable" />;
    }
  }

  if (loading || loaading2) {
    return <div>loading</div>;
  }

  return (
    <div className="pedido">
      <div
        style={{
          display: table ? "flex" : "none",
          justifyContent: "space-between",
        }}
        className="pedido__header"
      >
        <span>
          {action === "add"
            ? `Editando mesa ${table}`
            : `ELIMINAR DE MESA ${table}`}
        </span>
        <Input.Wrapper>
          <Input
            placeholder="Search"
            icon={<IconSearch />}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </Input.Wrapper>
        <Link to="/selecttable">Seleccion mesa</Link>
      </div>
      <Tabs
        color="red"
        defaultValue="gallery"
        value={activeTab}
        onTabChange={setActiveTab}
      >
        <Tabs.List>
          <Tabs.Tab
            value="Todas"
            icon={<IconAdjustmentsAlt size={14} />}
            onClick={() => setFilterProducts(products)}
          >
            Todas
          </Tabs.Tab>
          {category.map((item, index) => {
            return (
              <Tabs.Tab
                value={item.name}
                icon={icones[index]}
                key={`tab${index}`}
                onClick={() => handleClick(item.name)}
              >
                {item.name}
              </Tabs.Tab>
            );
          })}
          <Tabs.Tab
            value="Agregar"
            icon={<IconAlertCircle size={14} />}
            onClick={() => {
              setFilterProducts([]);
              dispatch({ type: POST_PENDING });
            }}
          >
            Pendientes
          </Tabs.Tab>
        </Tabs.List>
        <Tabs.Panel value="Agregar">
          <div
            className="pedido__main"
            style={{ justifyContent: "flex-start" }}
          >
            {pending.map((item, index) => {
              return (
                <div key={`product${index}`} className="pedido__main__card">
                  <CardMain
                    name={item.name}
                    price={item.price}
                    img={item.image[0]}
                    products={products}
                  />
                </div>
              );
            })}
          </div>
          <div
            style={{ display: "flex", justifyContent: "center", marginTop: 20 }}
          >
            <button
              type="button"
              className="pedido__main__card__send"
              onClick={finalSubmit}
              style={{ backgroundColor: action === "delete" ? "red" : "black" }}
            >
              {action === "add" ? "Agregar Product" : "Eliminar Producto"}
            </button>
          </div>
        </Tabs.Panel>
      </Tabs>
      <div className="pedido__main">
        {filterProducts.map((item, index) => {
          return (
            <div
              key={`product${index}`}
              className="pedido__main__card"
              style={{ display: activeTab === "Agregar" ? "none" : "flex" }}
            >
              <CardMain
                name={item.name}
                price={item.price}
                img={item.image[0]}
                products={products}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Pedido;
