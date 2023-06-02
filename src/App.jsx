
import './App.css';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import PetsScreen from './pages/PetsScreen';

import Whishlist from './pages/Whishlist';
import Cart from './pages/Cart';

import PetsList from './components/router-page/Pets/PetsList';
import PetsDetail from './components/router-page/Pets/PetsDetail';
import CartList from './components/router-page/Cart/CartList';
import Checkout from './components/router-page/Cart/Checkout';
import Products from './pages/Product';
import ProductsList from './components/router-page/Products/ProductsList';
import Admin from './pages/Admin';
import AdminPets from './components/router-page/Admin/AdminPets';
import { getProducts } from './feature/reducer/productReducer';
import { getPets } from './feature/reducer/petsReducer';
import { getCart } from './feature/reducer/cartReducer';
import { getWhishlist } from './feature/reducer/whishlistReducer';
import { useDispatch } from 'react-redux';
import React, { useEffect } from 'react';
import ProductsDetail from './components/router-page/Products/ProductDetail';
import AdminProducts from './components/router-page/Admin/AdminProducts';


function App() {
  let pathname = window.location.pathname
  if (pathname === "/") {
    window.location.href = "/home"
  }
  const dispatch=useDispatch()
  useEffect(() => {
    dispatch(getProducts())
    dispatch(getPets()) 
    dispatch(getCart())
    dispatch(getWhishlist())
  },[])
  return (

    <Routes>
      <Route path='/admin' element={<Admin/>}>
        <Route path='pets' element={<AdminPets/>}></Route>
        <Route path='products' element={<AdminProducts/>}></Route>
      </Route>
      <Route path='/home' element={<Home />}></Route>
      <Route path='/login' element={<Login />}></Route>
      <Route path='/register' element={<Register />}></Route>
      <Route path='/pets' element={<PetsScreen />}>
        <Route path='pets-list' element={<PetsList />}></Route>
        <Route path="pets-detail/:id" element={<PetsDetail />}></Route>
      </Route>
      <Route path='/whishlist' element={<Whishlist />}></Route>
      <Route path='/products' element={<Products/>}>
        <Route path='products-list/:params' element={<ProductsList/>}></Route>
        <Route path='products-detail/:id' element={<ProductsDetail/>}></Route>
      </Route>
      <Route path='/cart' element={<Cart />}>
        <Route path="cart-list" element={<CartList/>}></Route>
        <Route path="checkout" element={<Checkout/>}></Route> 

      </Route>

    </Routes>
  );
}

export default App;
