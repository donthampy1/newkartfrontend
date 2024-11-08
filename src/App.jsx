import React from 'react'
import './App.css'
import Header from './components/Header/Header'
import Home from './Pages/Home/Home';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './Pages/SignIn/Login';
import Signup from './Pages/SignIn/Signup';
import SellerLogin from './Pages/SignIn/sellerLogin'
import SellerSignup from './Pages/SignIn/sellerSignup';
import SellerAccount from './Pages/SellerPages/SellerAccount';
import Addproducts from './Pages/SellerPages/Addproducts';
import ProductList from './Pages/newProductList';
import Profile from './Pages/Profile';
import ProductPage from './Pages/ProductPage/ProductPage';
import CartPage from './Pages/CartPage';
import CheckOut from './Pages/CheckOut';
import Footer from './components/Footer/Footer';
import EditproductsPage from './Pages/SellerPages/EditproductsPage';
import SellerOrders from './Pages/SellerPages/SellerOrders';
import Orders from './Pages/Orders'
import { useSelector } from 'react-redux'
import Dashboard from './Pages/Dashboard';



function App() {
  const isDarkMode = useSelector((state) => state.darkMode.isDarkMode)


  return (
    <>
<div className={` sm:px-[5vw] md:px-[4vw] lg:px-[3vw] ${isDarkMode ? 'bg-white' : 'bg-zinc-900'}`}>
<Router>
    <Header/>
    <Routes>
      
      <Route path='/' element={<Home/>} />
      <Route path='/signin' element={<Login/>} />
      <Route path='/signup' element={<Signup/>} />
      <Route path= '/account' element={<Home/>}/>
      <Route path='/profile' element={<Profile/>} />
      <Route path='/sellerlogin' element={<SellerLogin/>} />
      <Route path='/sellersignup' element={<SellerSignup/>} />

      <Route path='/selleraccount' element={<SellerAccount/>} >

           <Route path='addproducts' element={<Addproducts/>} />

      </Route>

      <Route path='/selleraccount/editproducts' element={<EditproductsPage/>} />
      <Route path='/selleraccount/sellerorders' element={<SellerOrders/>} />
      <Route path='/dashboard' element={<Dashboard/>}/>
      <Route path='/productlist' element={<ProductList/>}/>
      <Route path='/product/:id' element={<ProductPage/>}/>
      <Route path='/cart/:id' element={<CartPage/>}/>
      <Route path='/cart/checkout/:id' element={<CheckOut/>}/>
      <Route path='/orders/:id' element={<Orders/>}/>

    </Routes>
    <Footer/>

    </Router>
    </div>
      
    </>
  )
}

export default App
