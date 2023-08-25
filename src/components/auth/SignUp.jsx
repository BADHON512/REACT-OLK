import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { RxAvatar, } from "react-icons/rx"
import axios  from "axios"
import { AiFillEyeInvisible, AiOutlineEye } from "react-icons/ai"
import { toast } from 'react-toastify';



const Login = () => {
    const navigate= useNavigate()
   const [avatar,setAvatar]=useState(null)
   const [visible,setVisible]=useState(false)

  const [name,setName]=useState("")
  const [email,setEmail]=useState("")
  const [password,setPassword]=useState("")

  const formData=new FormData()
  formData.append("name",name)
  formData.append("email",email)
  formData.append("password",password)
  formData.append("avatar",avatar)

   const FormHandleSubmit=async(e)=>{
    e.preventDefault()
    const header={
        "Contend-Type":"multipart/form-data"
    }
     await axios.post("http://localhost:5000/api/v2/user-create",formData,{headers:header}).then((res)=>{
        navigate("/login")
        toast.success(res.data.message)
        
     }).catch((err)=>{
        toast.error(err.message)
     })
   }

   const handleFileInputChange=(e)=>{
      const file=e.target.files[0]
      setAvatar(file)
   }
    return (
        <div className='min-h-[100vh] w-full bg-[#0e0e0e] pt-5 pb-3'>
            <h1 className='mt-5 text-center font-Roboto font-semibold text-gray-300 text-[30px]'>Register</h1>


            <div className='flex justify-center mt-10 '>
                <div className='min-h-[70vh] w-[90%] 800px:w-[45%] bg-[#a8a4a4] rounded-sm p-5 px-4 800px:px-10'>
                    <form onSubmit={FormHandleSubmit} className='mx-auto w-full '>
                        <div className='mt-2 '>
                            <label htmlFor="" className='text-black font-Poppins block text-left '>Name</label>
                            <input value={name} onChange={(e)=>setName(e.target.value)} type="text" name='name' placeholder='Enter your name' className=' outline-none border border-black bg-transparent text-black font-Roboto placeholder:text-gray-400 p-2 w-full appearance-none focus:border-blue-500 shadow-lg  mt-2 rounded-sm' />
                        </div>
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

                        <div className='mt-4 flex items-center'>
                       
                                <div>
                                {
                        avatar?(<img src={URL.createObjectURL(avatar)}alt="img"className='h-8 w-8 object-cover rounded-full'/>):(<RxAvatar className="h-8 w-8"/>)
                    }
                        </div>
                            <input type="file" name="" id="bl"
                               accept='.jpg,.jpeg,.png' 
                            onChange={handleFileInputChange}
                                className='hidden' />
                                <label className=' border px-2 py-2 rounded-sm bg-slate-300 font-semibold ml-4 cursor-pointer' htmlFor="bl">Add your file</label>
                        </div>

                        <div className='text-center'>
                            <input type="submit" value="Submit" className='mt-5 px-5 py-2 rounded-sm text-center cursor-pointer h-[40px] w-[70%] bg-[green]' />

                            <h1 className=' mt-3 font-Roboto'>Already have account<Link className=' ml-2 text-green-900 ' to="/login"> Login </Link></h1>
                        </div>
                    </form>

                </div>
            </div>
        </div>
    );
};

export default Login;