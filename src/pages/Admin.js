import { useJwt } from "react-jwt";
import { Navigate } from "react-router-dom";
import { useState } from "react";
import { Drawer } from "@mantine/core";
import ButtonHome from "../components/ButtonHome";

const Admin = ()=>{
    const [opened, setOpened] = useState(false)
    const { decodedToken} = useJwt(localStorage.getItem("token"));

    if(decodedToken){
        if (decodedToken.role !== 'admin'){
            return <Navigate to='/pedido'/>
        }
    }


    return (
        <div>
            admin page
            <ButtonHome/>
            <Drawer
        opened={opened}
        onClose={() => setOpened(false)}
        title="Amin panel"
        padding="lg"
        size="lg"
        styles={{title:{
            fontFamily: "Cereal Medium",
            fontSize: 20,
        }}}
      >
        {/* Drawer content */}
      </Drawer>
      <button onClick={()=>setOpened(true)}>Open drawer</button>

        </div>
    )
}

export default Admin