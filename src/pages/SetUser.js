import "../styles/pages/SetUser.scss";
import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import ListingContainer from "../components/ListingContainer";
import { Input } from "@mantine/core";
import { IconSearch } from "@tabler/icons";

const SetUser = () => {
  const [allUsers, setAllUsers] = useState({});
  const [search, setSearch] = useState("");
  const [filterUsers, setFilterUsers] = useState({});
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("token");
  const fetchUsers = async () => {
    try {
      const data = await axios.get("https://diegohtop24.herokuapp.com/user/show", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
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
          item.email.toLowerCase().includes(query.toLowerCase()) ||
          item.role.toLowerCase().includes(query.toLowerCase())
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
      <h2>Administrador usuarios</h2>
      <div className="setuser__search">
        <Link to="/admin/user/create">
          <button className="setuser__create">+ Crear usuario</button>
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
        <div>Nombre</div>
        <div>Email</div>
        <div>Role</div>
        <p>Edita</p>
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
                email={item.email}
                role={item.role}
                route={`/admin/user/create/${item.email}`}
              />
            </>
          );
        })
      )}
    </div>
  );
};

export default SetUser;
