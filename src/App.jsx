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


function App() {

  return (
    <>
    <Router>
    <Header/>
    <Routes>
      <Route path='/' element={<Home/>} />
      <Route path='/signin' element={<Login/>} />
      <Route path='/signup' element={<Signup/>} />
      <Route path= '/account' element={<Home/>}/>

      <Route path='/sellerlogin' element={<SellerLogin/>} />
      <Route path='/sellersignup' element={<SellerSignup/>} />

      <Route 
          path='/selleraccount' element={<SellerAccount/>} >
      <Route path='addproducts' element={<Addproducts/>} />
      </Route>
      
      <Route path='/productlist' element={<ProductList/>}/>





    </Routes>

    </Router>
      
    </>
  )
}

export default App
