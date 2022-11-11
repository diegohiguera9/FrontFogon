import { Accordion } from "@mantine/core";
import { Link } from "react-router-dom";
import "../styles/components/AdminAcordeon.scss";
import { useJwt } from "react-jwt";

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
      ],
    },
    {
      control: "Pedido",
      panels: [
        {
          name: "Crear",
          path: "/selecttable",
        },
      ],
    },
    {
      control: "Modulos",
      panels: [
        {
          name: "Caja",
          path: "/selecttable/cashier",
        },
        {
          name: "Admin",
          path: "/admin",
        },
      ],
    },
  ];

  const { decodedToken } = useJwt(localStorage.getItem("token"));

  if (!decodedToken){
    return <p>acordeon</p>
  }

  return (
    <Accordion
      defaultValue="customization"
      styles={{ control: { fontFamily: "Cereal Medium", fontSize: 15 } }}
      className="adminacordeon"
    >
      {acordData.map((item,index) => {
        if (item.control === 'Modulos' && decodedToken.role !== 'admin' && decodedToken.role !== 'cashier') {
          return <></>
        }
        return (
          <Accordion.Item value={item.control} key={`acord${index}`}>
          <Accordion.Control>{item.control}</Accordion.Control>
          <Accordion.Panel>
            {item.panels.map((panel) => {
              if (panel.name === 'Admin' && decodedToken.role !=='admin') return <></>
              return <Link to={panel.path} onClick={()=>drawer(false)} key={panel.name}>{panel.name}</Link>;
            })}
          </Accordion.Panel>
        </Accordion.Item>
        )
        ;
      })}

    </Accordion>
  );
};

export default PedidoAcordeon;