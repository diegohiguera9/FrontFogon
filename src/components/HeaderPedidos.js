import "../styles/components/HeaderAdmin.scss";
import { useNavigate, Outlet } from "react-router-dom";
import { Drawer, Tooltip } from "@mantine/core";
import { useState } from "react";
import PedidoAcordeon from "./PedidoAcordeon";

const HeaderPedidos = () => {
  const [opened, setOpened] = useState(false);
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };
  return (
    <>
      <div className="headeradmin">
        <Tooltip label="Menu">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            fill="currentColor"
            className="bi bi-list"
            viewBox="0 0 16 16"
            onClick={() => setOpened(true)}
          >
            <path
              fillRule="evenodd"
              d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z"
            />
          </svg>
        </Tooltip>

        <h1>Pedidos</h1>
        <div className="headeradmin__izq">
          <Tooltip label="Home">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              fill="currentColor"
              className="bi bi-house"
              viewBox="0 0 16 16"
              onClick={() => navigate("/pedido")}
            >
              <path
                fillRule="evenodd"
                d="M2 13.5V7h1v6.5a.5.5 0 0 0 .5.5h9a.5.5 0 0 0 .5-.5V7h1v6.5a1.5 1.5 0 0 1-1.5 1.5h-9A1.5 1.5 0 0 1 2 13.5zm11-11V6l-2-2V2.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5z"
              />
              <path
                fillRule="evenodd"
                d="M7.293 1.5a1 1 0 0 1 1.414 0l6.647 6.646a.5.5 0 0 1-.708.708L8 2.207 1.354 8.854a.5.5 0 1 1-.708-.708L7.293 1.5z"
              />
            </svg>
          </Tooltip>
          <Tooltip label="Log out">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              fill="currentColor"
              className="bi bi-box-arrow-left"
              viewBox="0 0 16 16"
              onClick={handleLogout}
              title="logout"
            >
              <path
                fillRule="evenodd"
                d="M6 12.5a.5.5 0 0 0 .5.5h8a.5.5 0 0 0 .5-.5v-9a.5.5 0 0 0-.5-.5h-8a.5.5 0 0 0-.5.5v2a.5.5 0 0 1-1 0v-2A1.5 1.5 0 0 1 6.5 2h8A1.5 1.5 0 0 1 16 3.5v9a1.5 1.5 0 0 1-1.5 1.5h-8A1.5 1.5 0 0 1 5 12.5v-2a.5.5 0 0 1 1 0v2z"
              />
              <path
                fillRule="evenodd"
                d="M.146 8.354a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L1.707 7.5H10.5a.5.5 0 0 1 0 1H1.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3z"
              />
            </svg>
          </Tooltip>
        </div>
        <Drawer
          opened={opened}
          onClose={() => setOpened(false)}
          title="Amin panel"
          padding="lg"
          size="lg"
          styles={{
            title: {
              fontFamily: "Cereal Medium",
              fontSize: 20,
            },
          }}
        >
          <PedidoAcordeon drawer={setOpened} />
        </Drawer>
      </div>
      <section>
        <Outlet />
      </section>
    </>
  );
};

export default HeaderPedidos;
