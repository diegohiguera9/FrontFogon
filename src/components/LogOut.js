import { useNavigate } from "react-router-dom"

const LogOut = ()=>{
    const navigate = useNavigate()
    const handleClick = ()=>{
        localStorage.clear()
        navigate('/')
    }

    return(
        <button onClick={handleClick}>
            Cerrar Sesion
        </button>
    )
}

export default LogOut