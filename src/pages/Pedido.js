import { useEffect } from "react";
import { useDispatch, useSelector} from "react-redux";
import ButtonHome from "../components/ButtonHome";
import { getProducts } from "../store/actions/Product.action";

const Pedido = () => {
  const dispatch = useDispatch()

  const products = useSelector(state=>state.productReducer.post.length)

  useEffect(()=>{
    dispatch(getProducts())
    // eslint-disable-next-line
  },[])

  return (
    <div>
      {`pedido ${products}`}
      <ButtonHome/>
    </div>
  );
};

export default Pedido;
