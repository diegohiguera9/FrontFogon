import "../styles/pages/SetUser.scss";
import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import ListingContainer from "../components/ListingContainer";
import { Input } from "@mantine/core";
import { IconSearch } from "@tabler/icons";

const SetTable = () => {
  const [allCategory, setAllCategory] = useState({});
  const [search, setSearch] = useState("");
  const [filterUsers, setFilterUsers] = useState({});
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("token");
  const fetchUsers = async () => {
    try {
      const data = await axios.get("https://diegohtop24.herokuapp.com/table/showAll", {
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
          item.number.toString().includes(query.toLowerCase()) ||
          item.floor.toString().includes(query.toLowerCase()) ||
          item.type.toLowerCase().includes(query.toLowerCase())
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
      <h2>Administrador mesas</h2>
      <div className="setuser__search">
        <Link to="/admin/table/create">
          <button className="setuser__create">+ Crear mesa</button>
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
        <div className="listingcontainer__div">Numero</div>
        <div className="listingcontainer__div">Piso</div>
        <div className="listingcontainer__div">Tipo</div>
        <p>Edita</p>
        <p>Elimina</p>
      </div>
      {filterUsers.length === 0 ? (
        <h1>No Tables found</h1>
      ) : (
        filterUsers.map((item, index) => {
          return (
            <>
              <ListingContainer
                key={index}
                name={item.number}
                email={item.floor}
                role={item.type}
                route={`/admin/table/create/${item._id}`}
                del={`https://diegohtop24.herokuapp.com/table/delete/${item._id}`}
                token={token}
              />
            </>
          );
        })
      )}
    </div>
  );
};

export default SetTable;