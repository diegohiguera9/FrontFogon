import { useJwt } from "react-jwt";
import { Navigate } from "react-router-dom";


const InRouter = ()=>{
    const { decodedToken} = useJwt(localStorage.getItem("token"));

    if(decodedToken){
        if (decodedToken.role === 'admin'){
            return <Navigate to='/admin'/>
        }

        return <Navigate to='/pedido'/>
    }
    
}

export default InRouter