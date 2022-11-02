import '../styles/components/ButtonIcon.scss'
import { Link } from 'react-router-dom'

const ButtonIcon = ({children})=>{
    return(
        <Link to={children}>
            <svg>

            </svg>
            Edicion
        </Link>
    )
}

export default ButtonIcon