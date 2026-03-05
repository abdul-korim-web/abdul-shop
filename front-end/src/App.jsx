
import { Route, Routes } from 'react-router-dom'
import './App.css'
import Navbar from './Components/Navbar/Navbar'
import HomeLayout from './Components/HomeLayout/HomeLayout'
import Footer from './Components/Footer'
import ServicePromise from './Components/ServicePromise';
import SingleProductView from './Components/SingleProductView'
import Shop from './Components/ShopPages/Shop'
import Login from './Auth/Login'
import Signup from './Auth/Signup'
import { ToastContainer } from 'react-toastify'
import MyCart from './Components/MyCart'
import NotFound from './Components/404Page/NotFound'
import Order from './Components/Order/Order'
import SingleOrderView from './Components/Order/SingleOrderView';
import { Analytics } from '@vercel/analytics/react';

function App() {


  return (
    <>
     <Navbar/>
     <Routes>
      <Route path='/' element={<HomeLayout/>}/>
      <Route path='/login' element={<Login/>}/>
      <Route path='/singup' element={<Signup/>}/>
      <Route path='/product/:productId' element={<SingleProductView/>}/>
      <Route path='/shop' element={<Shop/>}/>
      <Route path='/mycart' element={<MyCart/>}/>
      <Route path='/order' element={<Order/>}/>
      <Route path='/order/:orderId' element={<SingleOrderView/>}/>
      <Route path='*' element={<NotFound/>}/>
     </Routes>
     <ServicePromise/>
     <Footer/>
     <ToastContainer/>
     <Analytics />
     </>
  )
}

export default App
