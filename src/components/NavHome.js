import "../styles/components/NavHome.scss";
import { Modal } from "@mantine/core";
import { useState } from "react";
import SignIn from "./SignIn";
import LogIn from "./Login";

const NavHome = () => {
  const [opneRegister, setOpenRegister] = useState(false);
  const [openLogin, setOpenLogin] = useState(false);

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
      
      <button onClick={() => setOpenRegister(true)}>Registro</button>
      <button onClick={() => setOpenLogin(true)}>Ingreso</button>
    </div>
  );
};

export default NavHome;
