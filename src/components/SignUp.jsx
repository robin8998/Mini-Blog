import React ,{useState} from 'react'
import { Link,useNavigate } from 'react-router'
import {Button,Logo,Input} from "./index"
import { login as storeLogin } from '../store/authSlice'
import { useDispatch } from 'react-redux'
import { useForm } from 'react-hook-form'
import authService from '../appwrite/Auth'


function SignUp() {
     const dispatch = useDispatch()
     const navigate = useNavigate()
     const {register,handleSubmit} = useForm()
     const [error,setError] = useState("")

     const signup=async(data)=>{
      setError("")
      try {
         const userData = await authService.createAccount(data)
         if(userData){
          const currentUserData = await authService.currentUser()
          if(currentUserData){
            dispatch(storeLogin(currentUserData))
            navigate("/")
          }
         }
      } catch (error) {
        setError(error.message)
      }
     }
  return (
    <div className='w-full flex items-center justify-center'>
      <div className={`mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10`}>
        <div className='mb-2 flex justify-center'> 
          <span className='inline-block w-full max-w-[100px]'>
            <Logo width='100%'/>
          </span>
        </div>
        <h2 className="text-center text-2xl font-bold leading-tight">Sign Up to create account</h2>
        <p className="mt-2 text-center text-base text-black/60">
                            Already have an account?&nbsp;
                            <Link
                                to="/login"
                                className="font-medium text-primary transition-all duration-200 hover:underline"
                            >
                                Sign in
                            </Link>
                </p>
                {error && <p className='text-red-600 mt-8 text-center'>{error}</p>}
                <form action="submit" onSubmit={handleSubmit(signup)} className='mt-8'>
                          <div className='space-y-5'>
                          <Input 
                           label="Full Name: "
                           placeholder="Enter Your Name"
                           type="text"
                           {...register("name",{
                            required:true,
                           })}
                           />

                           <Input
                           label="Email: "
                           placeholder="Enter Your Email"
                           type="email"
                           {...register("email",{
                            required:true,
                            validate:{
                                matchPattern:(value)=>/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.
                                test(value) || "Email address must be a valid address"
                            }
                           })}
                           />
                
                           <Input 
                           label="Password: "
                           placeholder="Enter Your Password"
                           type="password"
                           {...register("password",{
                            required:true,
                           })}
                           />
                
                           <Button
                           type='submit'
                           className='w-full'
                           >Sign-Up</Button>
                          </div>
                        </form>
      </div>
    </div>
  )
}

export default SignUp