import { useState,useEffect } from 'react'
// import './App.css'
import { Header,Footer } from './components/index'
import { useDispatch } from 'react-redux'
import authService from "./appwrite/auth"
import { login, logout } from './store/authSlice'
import {Outlet} from "react-router-dom"
 
function App() {

 const [loading,setLoading] = useState(true)
 const dispatch = useDispatch()

 useEffect(() => {
  authService.currentUser()
  .then((userData)=>{
    if(userData){
     dispatch(login({userData}))
    }
    else{
      dispatch(logout())
    }
  })
   .catch((error)=>{console.log("App.jsx :: currentUser Error" , error)})
  .finally(()=> setLoading(false))
 }, [])
 
  return !loading ?
  (
  <div className='min-h-screen bg-gray-500 flex justify-between '>
   <div className='w-full block '>
   <Header/>
   <main>
    <Outlet/>
   </main>
   <Footer/>
   </div>
  </div>
)
   : null
}

export default App
