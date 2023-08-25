import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { userContext } from '../../App';

const Friend = ({conversation,current}) => {
    const[user,setUser]=useState()
    const {setAvatar}=useContext(userContext)
    console.log(user)

  
    const friendID= conversation.members.find((v,i)=> v!==current )
    console.log(friendID)
useEffect(() => {

    const badhon = async () => {
      const res= await axios.get("http://localhost:5000/api/v2/friend/"+friendID)
  
    setUser(res.data.user)
    setAvatar(res.data.user)
    }
    badhon()
  }, [])
    return (
        <div className='  flex items-center  hover:bg-[#e2dcdc10]  hover:rounded-sm cursor-pointer '>
           
        
            <div className={"p-1"}>
                <img className='h-[30px] w-[30px] rounded-full' src={`http://localhost:5000/${user?.avatar}`} alt="" />
   
                
                </div> 
                <div> 
                    <h1 className='text-[10px] font-Roboto hidden 800px:block'>{user?.name}</h1>
                </div>
           
        </div>
    );
};

export default Friend;