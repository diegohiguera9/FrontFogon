import "../styles/pages/SetUser.scss";
import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import ListingContainer from "../components/ListingContainer";
import { Input } from "@mantine/core";
import { IconSearch } from "@tabler/icons";

const SetProduct = () => {
  const [allUsers, setAllUsers] = useState({});
  const [search, setSearch] = useState("");
  const [filterUsers, setFilterUsers] = useState({});
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("token");
  const fetchUsers = async () => {
    try {
      const data = await axios.get("https://diegohtop24.herokuapp.com/product/showAll", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(data.data.data)
      setAllUsers(data.data.data);
      setFilterUsers(data.data.data);
      setLoading(false);
    } catch (err) {
      alert(err);
    }
  };

  const filterUser = (query) => {
    setFilterUsers(
      allUsers.filter(
        (item) =>
          item.name.toLowerCase().includes(query.toLowerCase()) ||
          item.categoryId.name.toLowerCase().includes(query.toLowerCase()) 
      )
    );
  };

  useEffect(() => {
    fetchUsers();
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (allUsers.length > 0) {
      filterUser(search);
    }
    // eslint-disable-next-line
  }, [search]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="setuser">
      <h2>Administrador productos</h2>
      <div className="setuser__search">
        <Link to="/admin/product/create">
          <button className="setuser__create">+ Crear producto</button>
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
      <div
        className="listingcontainer"
        style={{ color: "grey", borderTop: "none" }}
      >
        <div className="listingcontainer__div">Imagen</div>
        <div className="listingcontainer__div">Nombre</div>
        <div className="listingcontainer__div">Categoria</div>
        <div className="listingcontainer__div">Precio</div>
        <p>Edita</p>
        <p>Elminia</p>
      </div>
      {filterUsers.length === 0 ? (
        <h1>No Users found</h1>
      ) : (
        filterUsers.map((item, index) => {
          return (
            <>
              <ListingContainer
                key={`producto${index}`}
                img={item.image[0]}
                name={item.name}
                email={item.categoryId.name}
                price={item.price}
                route={`/admin/product/create/${item._id}`}
                del={`https://diegohtop24.herokuapp.com/product/delete/${item._id}`}
                token={token}
              />
            </>
          );
        })
      )}
    </div>
  );
};

export default SetProduct;