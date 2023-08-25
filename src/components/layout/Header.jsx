
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';


const Header = ({user, LogOut}) => {


    return (
        <div className='h-[10vh] w-full bg-[#202341]'>
            <nav className='h-full w-full flex items-center justify-between p-3 '>
                <div>
                    <h1 className='ontainer font-semibold text-[20px ] text-red-600'>BADHON</h1>
                </div>

                <div className=' badhon h-[6vh] mx-2  w-[40%] 800px:w-[60%] flex items-center bg-black rounded-sm'>
                        <h1 className='text-white font-Roboto p-1'>Thank you for the warm welcome! I'm here to assist you with any questions or tasks you have. If you need help with anything related to your new messenger or any other topic, feel free to ask. Enjoy exploring and using your messenger! </h1>
                </div>
                {
                    user ? (

                        <div className='flex items-center'>
                            <img src={`http://localhost:5000/${user?.avatar}`} alt=":) ?" className='text-white     h-[50px] w-[50px] border-[3px] border-green-600 rounded-full object-cover mr-5' />
                            <h1 onClick={LogOut} className='cursor-pointer font-semibold text-white' > Log Out</h1>
                        </div>

                    ) : (
                        <div className='flex mr-5 font-semibold  text-white ontainer'>

                            <Link to={"/login"}><h1>Login</h1></Link>
                        </div>
                    )
                }
            </nav>
        </div>
    );
};

export default Header;