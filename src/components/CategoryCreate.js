import "../styles/components/UserCreate.scss";
import { Input } from "@mantine/core";
import { IconForms } from "@tabler/icons";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const CategoryCreate = () => {
  const params = useParams();
  const categoryId = params.id;
  const [user, setUser] = useState("");
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState(user ? user.name : "");

  const token = localStorage.getItem("token");

  const sendUser = async (url, data) => {
    try {
      await axios.post(url, data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      navigate("/admin/category");
    } catch (err) {
      alert(err.response.data.message);
    }
  };

  const searchCategory = async () => {
    try {
      setLoading(true);
      const res = await axios.get(
        `http://localhost:8080/category/showOne/${categoryId}`,
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
    if (categoryId) {
      searchCategory();
    }
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (user) {
      setName(user.name);
    }
  }, [user]);

  if (loading) {
    return <div>loading...</div>;
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      name,
    };

    if (user) {
      sendUser(`http://localhost:8080/category/update/${categoryId}`, data);
    } else {
      sendUser("http://localhost:8080/category/create", data);
    }
  };

  return (
    <div className="usercreate">
      <h2>{user ? `Editing ${user.name}` : "New Category"}</h2>
      <form onSubmit={handleSubmit}>
        <div className="usercreate__input">
          <Input.Wrapper label="Nombre" required>
            <Input
              placeholder="Nombre"
              icon={<IconForms />}
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </Input.Wrapper>
        </div>
        <button className="usercreate__submit">
          {user ? "Update category" : "Create category"}
        </button>
      </form>
    </div>
  );
};

export default CategoryCreate;
