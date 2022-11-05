import axios from "axios";

import {
    POST_SUCCESS,
    POST_ERROR,
    POST_LOADING,
} from "../reducers/Product.reducer";

export const getProducts = (token) => {
    return async (dispatch) =>{
        try{
            dispatch({ type: POST_LOADING, payload: true })
            const res = await axios.get("https://diegohtop24.herokuapp.com/product/showAll", {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              });
            dispatch({ type: POST_SUCCESS, payload: res.data.data })
            dispatch({ type: POST_LOADING, payload: false })
        } catch(err){
            dispatch({ type: POST_ERROR, payload: err })
        }
    }
}
