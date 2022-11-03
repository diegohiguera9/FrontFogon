import "../styles/pages/SetUser.scss";
import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import ListingContainer from "../components/ListingContainer";
import { Input } from "@mantine/core";
import { IconSearch } from "@tabler/icons";

const SetCategory = () => {
  const [allCategory, setAllCategory] = useState({});
  const [search, setSearch] = useState("");
  const [filterUsers, setFilterUsers] = useState({});
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("token");
  const fetchUsers = async () => {
    try {
      const data = await axios.get("https://diegohtop24.herokuapp.com/category/showAll", {
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
    setFilterUsers(
        allCategory.filter(
        (item) =>
          item.name.toLowerCase().includes(query.toLowerCase()) 
      )
    );
  };

  useEffect(() => {
    fetchUsers();
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
      <h2>Administrador categorias</h2>
      <div className="setuser__search">
        <Link to="/admin/category/create">
          <button className="setuser__create">+ Crear categoria</button>
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
        <div className="listingcontainer__div">Nombre</div>
        <div className="listingcontainer__div"># Productos</div>
        <p>Edita</p>
        <p>Elimina</p>
      </div>
      {filterUsers.length === 0 ? (
        <h1>No Users found</h1>
      ) : (
        filterUsers.map((item, index) => {
          return (
            <>
              <ListingContainer
                key={index}
                name={item.name}
                email={item.products.length}
                route={`/admin/category/create/${item._id}`}
                del={`https://diegohtop24.herokuapp.com/category/delete/${item._id}`}
                token={token}
              />
            </>
          );
        })
      )}
    </div>
  );
};

export default SetCategory;
