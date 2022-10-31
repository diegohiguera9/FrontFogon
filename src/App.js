import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Pedido from './pages/Pedido';
import SuccesAuth from './components/SuccesAuth';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/pedido' element={<Pedido/>}/>
        <Route path='/login/success'>
          <Route path=':id' element={<SuccesAuth/>}/>
          </Route>
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
