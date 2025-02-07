import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router'
import { useSelector } from 'react-redux'

 export default function AuthLayout({children,authenticated=true}) {

    const navigate = useNavigate()
    const [loader,setLoader] = useState("")
    const authStatus = useSelector((state)=> state.auth.status) 

    useEffect(() => {
      if(authenticated && authStatus !== authenticated){
        navigate("/login")
      }
      else if(!authenticated && authStatus !== authenticated){
        navigate("/")
      }
      setLoader(false)
    }, [navigate,authenticated,authStatus])
    
  return loader ? <h1>Loading...</h1> : <>{children}</>
}

