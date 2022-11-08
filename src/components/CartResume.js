import '../styles/components/CartResume.scss'
import { useSelector } from "react-redux";

const CartResume = ()=>{
    const cart = useSelector(state=>state.cartReducer.products)
    return (
        <div className="cartresume">
            {cart.map(item=>{
                return(
                    <div>
                        <span>{item.name}</span>
                        <span>{item.count}</span>
                    </div>
                )
            })}
        </div>
    )
}

export default CartResume