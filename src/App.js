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
import SetTable from "./pages/SetTable";
import TableCreate from "./components/TableCreate";
import HeaderPedidos from "./components/HeaderPedidos";
import SelectTable from "./pages/SelectTable";
import Resumen from "./pages/Resumen";
import CartResume from "./components/CartResume";
import Cashier from "./pages/Cashier";
import ResumenPay from "./pages/ResumenPay";
import Report from "./pages/Report";
import MapDelivery from "./pages/MapDelivery";
import AdminMap from "./pages/AminMap";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/pedido" element={<HeaderPedidos />}>
            <Route index element={<Pedido />} />
            <Route path="cart" element={<CartResume />} />
          </Route>
          <Route path="/selecttable" element={<HeaderPedidos />}>
            <Route index element={<SelectTable />} />
            <Route path="resumen" element={<Resumen />}>
              <Route path=":id" element={<Resumen />} />
            </Route>
            <Route path="cashier" element={<Cashier />} />
            <Route path="cashier/pay">
              <Route path=":id" element={<ResumenPay />} />
            </Route>
          </Route>
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
            <Route path="category" element={<SetCategory />} />
            <Route path="category/create" element={<CategoryCreate />}>
              <Route path=":id" element={<CategoryCreate />} />
            </Route>
            <Route path="product" element={<SetProduct />} />
            <Route path="product/create" element={<ProductCreate />}>
              <Route path=":id" element={<ProductCreate />} />
            </Route>
            <Route path="table" element={<SetTable />} />
            <Route path="table/create" element={<TableCreate />}>
              <Route path=":id" element={<TableCreate />} />
            </Route>
            <Route path="report" element={<Report />} />
            <Route path="table/create" element={<TableCreate />}>
              <Route path=":id" element={<TableCreate />} />
            </Route>
            <Route path='map' element={<AdminMap/>}/>
          </Route>
            <Route path='admin/map'>
              <Route path=':status' element={<MapDelivery/>}/>
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
