import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import PrivateRoute from "./components/PrivateRoute";
import Home from "./pages/Home";
import Pedido from "./pages/Pedido";
import SuccesAuth from "./components/SuccesAuth";
import Admin from "./pages/Admin";
import InRouter from "./components/InRouter";
import HeaderAdmin from "./components/HeaderAmin";
import SetUser from "./pages/SetUser";
import UserCreate from "./components/UserCreate";
import SetCategory from "./pages/SetCategory";
import CategoryCreate from "./components/CategoryCreate";
import SetProduct from "./pages/SetProduct";
import ProductCreate from "./components/Productcreate";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/pedido" element={<Pedido />} />
          <Route path="/login/success">
            <Route path=":id" element={<SuccesAuth />} />
          </Route>
          <Route
            path="/admin"
            element={
              <PrivateRoute>
                <HeaderAdmin />
              </PrivateRoute>
            }
          >
            <Route index element={<Admin />} />
            <Route path="user" element={<SetUser />} />
            <Route path="user/create" element={<UserCreate />}>
              <Route path=":email" element={<UserCreate />} />
            </Route>
            <Route path='category' element={<SetCategory/>}/>
            <Route path='category/create' element={<CategoryCreate/>}>
              <Route path=':id' element={<CategoryCreate/>}/>
            </Route>
            <Route path='product' element={<SetProduct/>}/>
            <Route path='product/create' element={<ProductCreate/>}>
              <Route path=':id' element={<ProductCreate/>}/>
            </Route>
          </Route>
          <Route
            path="/inroute"
            element={
              <PrivateRoute>
                <InRouter />
              </PrivateRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
