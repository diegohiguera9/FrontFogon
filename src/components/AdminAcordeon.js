import { Accordion } from "@mantine/core";
import { Link } from "react-router-dom";
import "../styles/components/AdminAcordeon.scss";

const acordData = [
  {
    control: "Editar",
    panels: [
      {
        name: "Usuarios",
        path: "/admin/user",
      },
      {
        name: "Categoria",
        path: "/admin/category",
      },
      {
        name: "Producto",
        path: "/admin/product",
      },
      {
        name: "Mesa",
        path: "/admin/table",
      },
    ],
  },
  {
    control: "Informes",
    panels: [
      {
        name: "Venta",
        path: "/admin/report",
      },
    ],
  },
  {
    control: "Modulos",
    panels: [
      {
        name: "Pedido",
        path: "/selecttable",
      },
      {
        name: "Caja",
        path: "/selecttable/cashier",
      },
      {
        name: "Mapa Domicilios",
        path: "/admin/map",
      },

    ],
  },
];

const AdminAcordeon = ({ drawer }) => {
  return (
    <Accordion
      defaultValue="customization"
      styles={{ control: { fontFamily: "Cereal Medium", fontSize: 15 } }}
      className="adminacordeon"
    >
      {acordData.map((item) => {
        return (
          <Accordion.Item value={item.control}>
            <Accordion.Control>{item.control}</Accordion.Control>
            <Accordion.Panel>
              {item.panels.map((panel) => {
                return <Link to={panel.path} onClick={()=>drawer(false)} key={panel.name}>{panel.name}</Link>;
              })}
            </Accordion.Panel>
          </Accordion.Item>
        );
      })}

    </Accordion>
  );
};

export default AdminAcordeon;
