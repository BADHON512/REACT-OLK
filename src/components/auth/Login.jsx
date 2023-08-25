import React, { useState } from 'react';

import { toast } from 'react-toastify';
import { Link,useNavigate } from 'react-router-dom';
import { AiFillEyeInvisible, AiOutlineEye } from "react-icons/ai"
import axios from 'axios';


const Login = () => {

   const [visible,setVisible]=useState(false)

  const [email,setEmail]=useState("")
  const [password,setPassword]=useState("")



    const navigate= useNavigate()
   const FormHandleSubmit=async(e)=>{
    e.preventDefault()

   
     await axios.post("http://localhost:5000/api/v2/user-login",{email,password},{withCredentials:true}).then((res)=>{
        navigate("/")
      
        toast.success("Login successfully")
        
     }).catch((err)=>{
        toast.error(err.message)
     })
   }


    return (
        <div className='min-h-[100vh] w-full bg-[#0e0e0e] pt-5 pb-3'>
            <h1 className='mt-5 text-center font-Roboto font-semibold text-gray-300 text-[30px]'>Login</h1>


            <div className='flex justify-center mt-10 '>
                <div className='min-h-[60vh] w-[90%] 800px:w-[45%] bg-[#a8a4a4] rounded-sm p-5 px-4 800px:px-10'>
                    <form aria-required onSubmit={FormHandleSubmit} className='mx-auto w-full '>
                        <div className='mt-4 '>
                            <label htmlFor="" className='text-black font-Poppins block text-left '>Email</label>
                            <input value={email} onChange={(e)=>setEmail(e.target.value)}  type="email" name='email' placeholder='Enter your email' className=' outline-none border  border-black bg-transparent  text-black font-Roboto placeholder:text-gray-400 p-2 w-full appearance-none focus:border-blue-500 shadow-lg  mt-2 rounded-sm' />
                        </div>
                        <div className='mt-4 relative'>
                            <label htmlFor="" className='text-black font-Poppins block text-left '>Password</label>
                            <input value={password} onChange={(e)=>setPassword(e.target.value)}  type={visible?"text":"password"} name='password' placeholder='Enter your password' className=' outline-none border  border-black bg-transparent text-black font-Roboto placeholder:text-gray-400 p-2 w-full appearance-none focus:border-blue-500 shadow-lg  mt-2 rounded-sm' />
                           <div className='absolute top-10 right-3'>
                         {  visible? <AiOutlineEye onClick={()=>setVisible(!visible)} size={25}/>:
                            <AiFillEyeInvisible onClick={()=>setVisible(!visible)} size={25}/>}
                           </div>
                        </div>

                       

                        <div className='text-center mt-5'>
                            <input type="submit" value="Login" className='mt-5 px-5 py-2 rounded-sm text-center font-semibold  h-[40px] w-[70%] bg-[green] cursor-pointer' />

                            <h1 className=' mt-3 font-Roboto'>You have no account<Link className=' ml-2 text-green-900 ' to="/sign-up"> Sign Up </Link></h1>
                        </div>
                    </form>

                </div>
            </div>
        </div>
    );
};

export default Login;