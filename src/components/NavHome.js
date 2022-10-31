import "../styles/components/NavHome.scss";
import { Modal } from "@mantine/core";
import { useState } from "react";
import { Link } from "react-router-dom";
import SignIn from "./SignIn";
import LogIn from "./Login";
import Auth0Button from "./Auth0Button";
import Aut0Logout from "./Aut0Logout";
import { Popover } from "@mantine/core";

const NavHome = () => {
  const [opneRegister, setOpenRegister] = useState(false);
  const [openLogin, setOpenLogin] = useState(false);
  const [openPop, setOpenPop] = useState(false);
  const logo = process.env.PUBLIC_URL + "./logos/person.svg";

  return (
    <div className="navhome">
      <Modal
        opened={opneRegister}
        onClose={() => setOpenRegister(false)}
        title="Registro"
        styles={{
          modal: {
            padding: 0,
            borderRadius: 20,
          },
          title: {
            fontFamily: "Cereal Medium",
            fontSize: 20,
          },
        }}
      >
        <SignIn />
      </Modal>
      <Modal
        opened={openLogin}
        onClose={() => setOpenLogin(false)}
        title="Ingreso"
        styles={{
          modal: {
            padding: 0,
            borderRadius: 20,
          },
          title: {
            fontFamily: "Cereal Medium",
            fontSize: 20,
          },
        }}
      >
        <LogIn />
      </Modal>

      <Link to="/pedido">Pide en linea</Link>
      <button onClick={() => setOpenRegister(true)}>Registro</button>
      <button onClick={() => setOpenLogin(true)}>Ingreso</button>
      {/* <div>{user?(user.name?user.name:' '):'No user'}</div> */}

      <Popover opened={openPop} onChange={setOpenPop}>
        <Popover.Target>
          <div className="navhome__img" onClick={() => setOpenPop((o) => !o)}>
            <img src={logo} alt='logo'></img>
          </div>
        </Popover.Target>

        <Popover.Dropdown>
          <Auth0Button/>
          <Aut0Logout/>
        </Popover.Dropdown>
      </Popover>
    </div>
  );
};

export default NavHome;
