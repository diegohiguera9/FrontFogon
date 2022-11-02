import "../styles/components/UserCreate.scss";
import { Input, Select, PasswordInput } from "@mantine/core";
import { IconAt, IconForms, IconFriends, IconLock } from "@tabler/icons";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const ProductCreate = () => {
  const params = useParams();
  const productId = params.id;
  const [user, setUser] = useState("");
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState(user ? user.email : "");
  const [name, setName] = useState(user ? user.name : "");
  const [role, setRole] = useState(user ? user.role : null);
  const [password, setPassword] = useState("");

  const [file, setFile] = useState(new DataTransfer());
  const [fileDataURL, setFileDataURL] = useState([]);

  const token = localStorage.getItem("token");

  const handleChange = (event) => {
    const imageArray = Array.from(event.target.files).map((fil) => {
      file.items.add(fil);
      return URL.createObjectURL(fil);
    });

    setFileDataURL((prevImage) => prevImage.concat(imageArray));
    event.target.value = "";
  };

  const handleClcik = (image) => {
    setFileDataURL(
      fileDataURL.filter((item, index) => {
        if (item === image) {
          file.items.remove(index);
        }
        return item !== image;
      })
    );
  };

  const sendUser = async (url, data) => {
    try {
      await axios.post(url, data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      navigate("/admin/user");
    } catch (err) {
      alert(err.response.data.message);
    }
  };

  const searchUser = async () => {
    try {
      setLoading(true);
      const res = await axios.post(
        "http://localhost:8080/user/showOne",
        { email: productId },
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
    if (productId) {
      searchUser();
    }
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (user) {
      setEmail(user.email);
      setName(user.name);
      setRole(user.role);
    }
  }, [user]);

  if (loading) {
    return <div>loading...</div>;
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      email,
      name,
      role,
    };

    if (user) {
      sendUser("http://localhost:8080/user/update", data);
    } else {
      sendUser("http://localhost:8080/user/signup", { ...data, password });
    }
  };

  return (
    <div className="usercreate">
      <h2>{user ? `Editing ${user.name}` : "New User"}</h2>
      <form onSubmit={handleSubmit}>
        <div className="usercreate__input">
          <Input.Wrapper label="Email" required>
            <Input
              placeholder="Email"
              icon={<IconAt />}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Input.Wrapper>
        </div>
        <div
          className="usercreate__input"
          style={{ display: user ? "none" : "block" }}
        >
          <Input.Wrapper label="Contraseña" required>
            <PasswordInput
              placeholder="Contraseña"
              icon={<IconLock />}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Input.Wrapper>
        </div>
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
        <div className="usercreate__input">
          <Input.Wrapper label="Role" required>
            <Select
              placeholder="Role"
              icon={<IconFriends />}
              data={[
                { value: "admin", label: "Admin" },
                { value: "basic", label: "Usuario" },
                { value: "cashier", label: "Cajera" },
                { value: "waiter", label: "Mesero" },
              ]}
              onChange={setRole}
              value={role}
            />
          </Input.Wrapper>
        </div>
        <div className="hostform__setmargin">
          6. Agrega las imagenes que coniseres representativas de tu espacio
        </div>
        <label htmlFor="file" className="hostform__label">
          + Agregar imagenes
          <input
            type="file"
            name="file"
            id="file"
            accept="image/*"
            onChange={handleChange}
            className="hostform__inputtext"
          />
        </label>
        <div className="hostform__imgprev">
          {fileDataURL &&
            fileDataURL.map((image, index) => {
              return (
                <div key={image} className="hostform__imgprev__card">
                  <img src={image} alt="previe" height="200"></img>
                  <button onClick={() => handleClcik(image)}>
                    Delete image
                  </button>
                </div>
              );
            })}
        </div>
        <button className="usercreate__submit">
          {user ? "Update user" : "Create User"}
        </button>
      </form>
    </div>
  );
};

export default ProductCreate;
