import "../styles/components/CardMain.scss";
import { useDispatch, useSelector } from "react-redux";
import {
  POST_PLUS,
  POST_LESS,
  POST_NUMBER,
} from "../store/reducers/Product.reducer";
import { ADD_PRODUCT } from "../store/reducers/Cart.reducer";

const CardMain = ({ img, name, price, products }) => {
  const dispatch = useDispatch();
  const index = products.findIndex((object) => {
    return object.name === name;
  });
  const count =
    useSelector((state) => state.productReducer.post[index].count) || 0;
  return (
    <div className="cardmain">
      <div className="cardmain__img">
        <img src={img} alt="product"></img>
      </div>
      <div className="cardmain__bottom">
        <div style={{ display: "flex", flexFlow: "column" }}>
          <span>{name}</span>
          <span>{`$ ${new Intl.NumberFormat("de-DE").format(price)}`}</span>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            borderLeft: "1px solid black",
          }}
          onClick={()=>dispatch({type:ADD_PRODUCT, payload:{name, count}})}
        >
          ++ Carrito
        </div>
        <div className="cardmain__bottom__button">
          <button
            onClick={() =>
              dispatch({ type: POST_PLUS, payload: { index, amount: 1 } })
            }
          >
            +
          </button>
          <input
            type="number"
            value={count}
            onChange={(e) =>
              dispatch({
                type: POST_NUMBER,
                payload: { index, amount: e.target.value },
              })
            }
          />
          <button
            onClick={() =>
              dispatch({ type: POST_LESS, payload: { index, amount: 1 } })
            }
            disabled={count <= 0 ? true : false}
          >
            -
          </button>
        </div>
      </div>
    </div>
  );
};

export default CardMain;
