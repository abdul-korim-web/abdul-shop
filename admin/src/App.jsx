
import { Route, Routes } from 'react-router-dom'
import './App.css'
import Navbar from './Components/Navbar'
import Sitebar from './Components/Sitebars/Sitebar'
import Home from './Components/Pages/Home'
import ProductList from './Components/Pages/ProductList'
import Order from './Components/Pages/Order'
import UserList from './Components/Pages/UserList'
import { useContext } from 'react'
import { AuthContext } from './Components/Auth/AuthContext'
import Login from './Components/Auth/Login'
import { ToastContainer } from 'react-toastify';
import Additem from './Components/Pages/Additem'
import SingleProduct from './Components/Pages/SingleProduct'


function App() {
  const {token,setToken} = useContext(AuthContext)

  return (
    <>
     <ToastContainer position="top-center" autoClose={3000} />
     {!token? (
      <> <Login/></>
     ):(
      <>
      <Navbar/>
      <div className='flex w-full min-h-screen '>
        <div className='w-[18%] border-r-2 border-gray-200 fixed min-h-screen bg-white '>
          <Sitebar/> 
        </div>
        <div className='flex-1 p-5 ml-[18%]'>
          {/* Routing setup */}
          <Routes>
            <Route path='/' element={<Home/>}/>
            <Route path='/additem' element={<Additem/>}/>
            <Route path='/productlist' element={<ProductList/>}/>
            <Route path='/order' element={<Order/>}/>
            <Route path='/userlist' element={<UserList/>}/>
            <Route path='/product/:adminId/:productId' element={<SingleProduct/>}/>
          </Routes>
        </div>
      </div>
      </>
     )}
    </>
  )
}

export default App
