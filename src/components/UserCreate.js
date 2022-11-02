import "../styles/components/UserCreate.scss";
import { Input, Select, PasswordInput } from "@mantine/core";
import { IconAt, IconForms, IconFriends, IconLock } from "@tabler/icons";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const UserCreate = () => {
  const params = useParams();
  const emailParams = params.email;
  const [user, setUser] = useState('')
  const navigate = useNavigate();
  const [loading,setLoading] = useState(false)
  const [email, setEmail] = useState(user ? user.email : '');
  const [name, setName] = useState(user ? user.name : '');
  const [role, setRole] = useState(user ? user.role : null);
  const [password, setPassword] = useState("");

  const token = localStorage.getItem("token");

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
        setLoading(true)
      const res = await axios.post('https://diegohtop24.herokuapp.com/user/showOne', {email:emailParams}, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setLoading(false)
      setUser(res.data.data)

    } catch (err) {
        alert(err)
    }
  };

  useEffect(()=>{
    if(emailParams){
        searchUser()
    }
    // eslint-disable-next-line
  }, [])

  useEffect(()=>{
    if (user){
        setEmail(user.email)
        setName(user.name)
        setRole(user.role)
    }
  },[user])

  if(loading){
    return <div>loading...</div>
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      email,
      name,
      role,
    };

    if (user) {
      sendUser("https://diegohtop24.herokuapp.com/user/update", data);
    } else {
      sendUser("https://diegohtop24.herokuapp.com/user/signup", { ...data, password });
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
        <button className="usercreate__submit">
          {user ? "Update user" : "Create User"}
        </button>
      </form>
    </div>
  );
};

export default UserCreate;
