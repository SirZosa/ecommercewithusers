import './App.css'
import { useEffect, useState } from 'react';
import {BrowserRouter as Router, Routes, Route, Navigate} from 'react-router-dom';
import Layout from './pages/Layout/layout.jsx';
import Home from './pages/home/home.jsx'
import ProductPage from './pages/productPage/productPage.jsx';
import ProductsCategory from './pages/producs-category/productCategory.jsx';
import Cart from './pages/cart/cart.jsx';
import Checkout from './pages/checkout/checkout.jsx';
import Orders from './pages/Orders/orders.jsx';
import SignUp from './pages/SignUp/signup.jsx';
import LogIn from './pages/login/login.jsx';
import Profile from './pages/profile/profile.jsx';
import ProfileEdit from './pages/profile/profileEdit.jsx';

function App() {
  const [isToken, setIsToken] = useState(null)
  useEffect(()=>{
    const token = localStorage.getItem("myEcommerceToken")
    if(token){
      async function fetchData(){
        try{
          const response = await fetch('http://localhost:1234/v1/profile',{
            method:"GET",
            headers:{"Authorization": `Bearer ${token}`}
          })
          if(response.status === 200){
            const data = await response.json()
            setIsToken(token)
          }
          if(response.status === 400){
            localStorage.removeItem("myEcommerceToken")
            setIsToken(false)
          }
        }
        catch(e){
          console.log(e)
        }
      }
      fetchData()
    }
  },[])

  return (
    <Router>
      <Routes>
        <Route path='/' element={<Layout token={isToken}/>}>
          <Route index element ={<Home/>}/>
          <Route path='/signup' element={!isToken ? <SignUp/>: <Navigate to='/'/>}/>
          <Route path='/login' element={!isToken?<LogIn setToken={setIsToken}/>:<Navigate to='/'/>}/>
          <Route path='/profile' element={<Profile/>}/>
          <Route path='/profile/edit' element={<ProfileEdit/>}/>
          <Route path='category/:id' element={<ProductsCategory/>}>
            <Route path='page/:pageNum' element={<ProductsCategory/>}/>
          </Route>
          <Route path='product/:id' element={<ProductPage/>}/>
          <Route path='cart' element={<Cart/>}/>
          <Route path='checkout' element={<Checkout/>}/>
          <Route path='orders' element={<Orders/>}/>
        </Route>
      </Routes>
    </Router>
  )
}

export default App
