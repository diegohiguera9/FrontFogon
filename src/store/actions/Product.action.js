import axios from "axios";

import {
    POST_SUCCESS,
    POST_ERROR,
    POST_LOADING,
} from "../reducers/Product.reducer";

export const getPosts = () => {
    return (dispatch) => {
        dispatch({ type: POST_LOADING, payload: true })
        axios.get("https://fakestoreapi.com/products")
            .then((res) => {
                dispatch({ type: POST_SUCCESS, payload: res.data })
            })
            .catch((err) => {
                dispatch({ type: POST_ERROR, payload: err })
            })
            .finally(
                dispatch({ type: POST_LOADING, payload: false })
            )
    }
}
