import React, { useContext } from 'react';
import { format} from 'timeago.js';
import { userContext } from '../../App';

const Messaging = ({message,me }) => {
    const {friendAvatar}=useContext(userContext)
    console.log(friendAvatar)
    console.log(message)
    return (
        <div className={me ? 'justify-end flex mr-1 ' : 'flex w-full p-2 items-center'}>

            <div className={me ? "hidden" : 'h-[35px]  w-[10%]'}>
                <img className='h-[30px] w-[30px] rounded-full' src={`http://localhost:5000/${friendAvatar?.avatar}`} alt="" />
            </div>
            <div
                className='max-w-[70%]'
            >
                <div className={ me?'bg-[#e6e0e028] text-[13px] flex items-center p-2 rounded-md':' text-[13px] bg-[black] flex items-center p-2 rounded-md'}>
                    <h1>
                      {message?.text}
                    </h1>
                    

                </div>
                <p className='text-[9px] mt-[1px] ml-2'>{format(message?.createdAt)}</p>
                <div className={me ? 'text-right text-[10px]' : "hidden "}>
                    <h1 className='text-[green] '>Me</h1>
                </div>
            </div>


        </div>
    );
};

export default Messaging;