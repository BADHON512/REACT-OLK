import axios from 'axios';
import Header from './layout/Header';
import { AiOutlineMessage, AiOutlineSend } from "react-icons/ai"
import { BsFillEmojiNeutralFill } from "react-icons/bs"
import { RxCross1 } from "react-icons/rx"
import Friend from './chat/Friend';
import Messaging from './chat/Messaging';
import Online from './chat/Online';
import ScrollToBottom from "react-scroll-to-bottom"
import EmojiPicker from 'emoji-picker-react';
import  socketIo  from 'socket.io-client';
import { toast } from 'react-toastify';
import React, { useEffect, useState } from 'react';



const Home = () => {

  const [user, setUser] = useState()
  console.log(user?._id)
  const [conversation, setConversation] = useState()
  console.log(conversation)

  const [visible, setVisible] = useState(false)
  const [op, setOp] = useState(false);
  const [friend_id, setfriend_id] = useState();
  console.log(friend_id)
  const [message, setMessage] = useState("");
  const [oldMessage, setOldMessage] = useState();
  const [currentChat, setCurrentChat] = useState(null);
  const [arrivalMessage, setArrivalMessage] = useState(null);
  

 

  function emojiHandel(e) {
    setMessage((pre) => pre + e.emoji)
    setOp(false)
  }


  const HandleSubmit = async (e) => {
    console.log(message)
    e.preventDefault()
    const mg = {
      senderId: user._id,
      text: message,
      conversationId: currentChat
    }
    await axios.post("http://localhost:5000/api/v2/create-message", mg)

    const receiverId= currentChat.members.find((v)=>v !==user._id)

    socket.emit('sendMessage',{
      senderId:user._id,
      receiverId,
      text:message

    })

    setMessage("")


  }

  useEffect(()=>{
    socket.on('getMessage',(data)=>{
    setArrivalMessage({
      sender: data.senderId,
      text: data.text,
      createdAt:Date.now()
    })
    })
  },[])


  useEffect(()=>{
    arrivalMessage&& currentChat?.members.includes(arrivalMessage.sender)&& setMessage((pre)=>[...pre,arrivalMessage])
    
  },[arrivalMessage])


  useEffect(() => {
    const badhon = async () => {
      await axios.get("http://localhost:5000/api/v2/user", { withCredentials: true }).then((res) => {


        setUser(res?.data?.user)

      }).catch((err) => {

      })
    }
    badhon()
  }, [])


  useEffect(() => {
    const getConversation = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/v2/get-conversation/${user?._id}`)
        setConversation(res.data.conversation)
      } catch (error) {
        toast.error(error.response.data.message)
      }
    }
    getConversation()
  }, [user?._id])


  useEffect(() => {
    const getMessages = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/v2/get-message/${currentChat?._id}`)
        setOldMessage(res.data)
      } catch (error) {
        toast.error(error.response.data.message)
      }
    }
    getMessages()
  }, [currentChat,message])





  const LogOut = async () => {
    await axios.get("http://localhost:5000/api/v2/log-out", { withCredentials: true }).then((res) => {

      setUser(null)
      toast.error(res?.data?.message)


    }).catch((err) => {
      toast.error(err?.response?.data?.message)

    })
  }

  

  const link="http://localhost:4000/"

  const socket= socketIo(link,{
    transports:["websocket"]
  })

 
  console.log(socket)
  useEffect(()=>{
   socket.emit('addUser',user?._id)
   socket.on('getUsers',(user)=>{
    console.log(user)
   })
  },[user])

  return (
    <div>
      <Header user={user} LogOut={LogOut} />


      <div className="h-[90vh] w-[100%] bg-[#0c0e20]  relative mx-auto text-white">
        {
          visible === false && (
            <div className='h-full w-full flex justify-end items-end'>
              <AiOutlineMessage size={60} color='white'
                onClick={() => setVisible(true)}

                className='cursor-pointer' />
            </div>
          )
        }

        {
          visible === true && (
            <div className="absolute h-full w-full flex justify-center top-1">
              <div className='mx-auto w-full  800px:w-[70%] bg-[#495dd1] p-3 rounded-sm '>
                <div className='flex justify-end'>
                  <RxCross1 className='cursor-pointer' onClick={() => setVisible(false)} size={20} />
                </div>
                <h1 className='text-center font-Roboto mb-2 '>Message</h1>

                <div className=' border-t-2 bg-[#261b66] min-h-[75vh] rounded-md '>
                  <div className='flex justify-between mt-2 w-full '>
                    <div className='w-[20%] bg-[#261b66] rounded-sm hidden 800px:block'>
                      <h1 className='mt-2 text-center font-Roboto text-[12px] border-b'> Friend</h1>
                      <div className=' flex flex-col mt-2 gap-2 ml-2'>

                        {
                          conversation?.map((v, i) => <div key={i} onClick={() => setCurrentChat(v)}>
                            <Friend conversation={v} current={user?._id} />
                          </div>)
                        }

                      </div>
                    </div>
                    <div className='w-[90%] 800px:w-[60%] h-[70vh]  rounded-sm overflow-y-scroll  800px:p-0 p-2 ' >

                      <ScrollToBottom className='h-full w-full bg-[#261b66] p-1 border'>

                        <div className='flex  flex-col min-h-[58vh] '>
                          {
                            oldMessage?.map((v, i) => <Messaging key={i}message={v} me={v.senderId === user?._id} />)
                          }




                        </div>


                        <form onSubmit={HandleSubmit} className='flex items-center mt-5 '>

                          <input
                            type="text"
                            value={message}
                            placeholder='Type your message ...'
                            onChange={(e) => setMessage(e.target.value)}
                            className=' w-[90%] 800px:w-[80%] text-white font-Roboto bg-transparent border-[1px] appearance-none py-1 px-2 rounded-lg outline-none focus:border-blue-300 mr-1 800px:mr-3
    ' />
                          <div className='pr-1 800px:pr-3'>
                            {
                              op && (<div className='absolute top-0  right-2 '>
                                <EmojiPicker
                                  onEmojiClick={emojiHandel}
                                  height={385}
                                  width={300}
                                /></div>)
                            }
                            <BsFillEmojiNeutralFill
                              size={25} onClick={() => setOp(!op)} className='cursor-pointer' />


                          </div>



                          <button type='submit'><AiOutlineSend size={25} /></button>


                        </form>

                      </ScrollToBottom>

                    </div>
                    <div className=' 800px:w-[20%] bg-[#261b66] rounded-sm mx-auto'>
                      <h1 className='mt-2 text-center font-Roboto text-[12px] border-b'> Online</h1>
                      <div className='mt-2 w-full ml-2'>
                        <Online />
                        <Online />
                        <Online />
                        <Online />
                      </div>
                    </div>
                  </div>

                </div>

              </div>
            </div>
          )
        }

      </div>


    </div>
  );
};

export default Home;