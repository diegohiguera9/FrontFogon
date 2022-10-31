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
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              class="bi bi-person-lines-fill"
              viewBox="0 0 16 16"
            >
              <path d="M6 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm-5 6s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H1zM11 3.5a.5.5 0 0 1 .5-.5h4a.5.5 0 0 1 0 1h-4a.5.5 0 0 1-.5-.5zm.5 2.5a.5.5 0 0 0 0 1h4a.5.5 0 0 0 0-1h-4zm2 3a.5.5 0 0 0 0 1h2a.5.5 0 0 0 0-1h-2zm0 3a.5.5 0 0 0 0 1h2a.5.5 0 0 0 0-1h-2z" />
            </svg>
          </div>
        </Popover.Target>

        <Popover.Dropdown>
          <Auth0Button />
          <Aut0Logout />
        </Popover.Dropdown>
      </Popover>
    </div>
  );
};

export default NavHome;
