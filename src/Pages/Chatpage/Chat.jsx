import React, { useContext, useEffect, useState } from 'react'
import './Chat.css';
import LeftSideBar from '../../Components/LeftSideBar/LeftSideBar';
import ChatBox from '../../Components/ChatBox/ChatBox';
import RightSideBar from '../../Components/RightSideBar/RightSideBar';
import assets from '../../assets/assets';
import { AppContext } from '../../context/AppContext';

const Chat = () => {

  const {chatData,userData} = useContext(AppContext);

  const [loading, setLoading] = useState(true);

  useEffect(()=>{
    if(chatData && userData){
      setLoading(false);
    }
  },[chatData,userData])

  return (
    <div className='chat'>
      {
        loading
        ?
        <p className='loading'></p>
        :
        <div className="chat-container">
        <LeftSideBar/>
        <ChatBox/>
        <div className='rs-hide'><RightSideBar/></div>
      </div>

      }
    </div>
  )
}

export default Chat