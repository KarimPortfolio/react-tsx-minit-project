import { Link, Route, Router, Routes } from 'react-router-dom';
import './App.css';
import AllProducts from './components/AllProducts';
import AddProduct from './components/AddProduct';

function App() {
  return (
    <div className="App">
        <nav style={{ margin:'20px' }}>
            <ul>
                <li><Link to='/'>Home</Link></li>
                <li><Link to='/products/add'>Add Product</Link></li>
            </ul>
        </nav>
        <Routes>
            <Route path='/' element={<AllProducts />} />
            <Route path='/products/add' element={<AddProduct />} />
        </Routes>
    </div>
  );
}

export default App;
