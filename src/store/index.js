import { legacy_createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import productReducer from "./reducers/Product.reducer";
import cartReducer from "./reducers/Cart.reducer";

const rootReducer = combineReducers({
    productReducer, cartReducer
})

const middleware = applyMiddleware(thunk)

export const store = legacy_createStore(rootReducer, middleware)