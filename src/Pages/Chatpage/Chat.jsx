import React from 'react'
import './Chat.css';
import LeftSideBar from '../../Components/LeftSideBar/LeftSideBar';
import ChatBox from '../../Components/ChatBox/ChatBox';
import RightSideBar from '../../Components/RightSideBar/RightSideBar';
import assets from '../../assets/assets';

const Chat = () => {
  return (
    <div className='chat'>
      <div className="chat-container">
        <LeftSideBar/>
        <ChatBox/>
        <RightSideBar/>
      </div>
    </div>
  )
}

export default Chat