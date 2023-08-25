
import React, { createContext, useState } from "react";
import InputEmoji from "react-input-emoji";
import './app.css';
import socketIo from "socket.io-client"

import Home from './components/Home';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Login from './components/auth/Login';
import SignUp from './components/auth/SignUp';
import EmojiPicker from 'emoji-picker-react';

export const userContext = createContext()

function App() {

  
  const [friendAvatar, setAvatar] = useState()
  console.log(friendAvatar)



  return (
    <>
      <userContext.Provider value={{friendAvatar, setAvatar}}>
      <BrowserRouter>
        <Routes>

          <Route path='/' element={<Home />} />
          <Route path='login' element={<Login />} />
          <Route path='/sign-up' element={<SignUp />} />
          <Route path='/badhon' element={<Example />} />

        </Routes>

      </BrowserRouter>
    </userContext.Provider >
    </>
 
  );
}


const Example = () => {
  const [message, setMessage] = useState('');
  console.log()

  const handleEmojiSelect = emoji => {
    console.log(emoji)
    setMessage(prevMessage => prevMessage + emoji.emoji);
  }


  return (
    <div>
      <input

        type="text"
        value={message}
        onChange={e => setMessage(e.target.value)}
        placeholder="Type your message..."
      />
      <EmojiPicker onEmojiClick={handleEmojiSelect} />
    </div>
  );
}


export default App;

