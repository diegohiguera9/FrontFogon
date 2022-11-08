import { Accordion } from "@mantine/core";
import { Link } from "react-router-dom";
import "../styles/components/AdminAcordeon.scss";

const PedidoAcordeon = ({ drawer }) => {  
  const order = localStorage.getItem('order')

  const acordData = [
    {
      control: "Mesa",
      panels: [
        {
          name: "Resumen",
          path: order?`/selecttable/resumen/${order}`:'/selecttable',
        },
        {
          name: "Cambiar",
          path: "/selecttable",
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
      control: "Pedido",
      panels: [
        {
          name: "Crear",
          path: "/selecttable",
        },
        {
          name: "Usuarios",
          path: "/admin/user",
        },
      ],
    },
    {
      control: "Admin",
      panels: [
        {
          name: "Admin module",
          path: "/admin",
        },
        {
          name: "Usuarios",
          path: "/admin/user",
        },
      ],
    },
  ];
  return (
    <Accordion
      defaultValue="customization"
      styles={{ control: { fontFamily: "Cereal Medium", fontSize: 15 } }}
      className="adminacordeon"
    >
      {acordData.map((item,index) => {
        return (
          <Accordion.Item value={item.control} key={`acord${index}`}>
            <Accordion.Control>{item.control}</Accordion.Control>
            <Accordion.Panel>
              {item.panels.map((panel) => {
                return <Link to={panel.path} onClick={()=>drawer(false)}>{panel.name}</Link>;
              })}
            </Accordion.Panel>
          </Accordion.Item>
        );
      })}

    </Accordion>
  );
};

export default PedidoAcordeon;