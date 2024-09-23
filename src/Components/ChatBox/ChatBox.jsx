import { arrayUnion, doc, getDoc, onSnapshot, updateDoc } from 'firebase/firestore';
import assets from '../../assets/assets';
import { AppContext } from '../../context/AppContext';
import './ChatBox.css'; 
import React, { useContext, useEffect, useState } from 'react'
import { db } from '../../ConfigFiles/firebase';
import { toast } from 'react-toastify';

const ChatBox = () => {
  const {userData,messagesId,chatUser,messages,setMessages} = useContext(AppContext);

  const [input,setInput] = useState("");
  
  const sendMessage = async ()=>{
    try {
    if(input && messagesId){
      await updateDoc(doc(db,'messages',messagesId),{
        messages:arrayUnion({
          sId:userData.id,
          text:input,
          createdAt: new Date()
        })
      })
      const userIDs = [chatUser.rId,userData.id];
      userIDs.forEach(async(id)=>{
        const userChatsRef = doc(db,'chats',id);
        const userChatsSnapshot = await getDoc(userChatsRef);
        if (userChatsSnapshot.exists()) {
          const userChatData = userChatsSnapshot.data();
          const chatIndex = userChatData.chatsData.findIndex((c)=>c.messageId === messagesId);
          userChatData.chatsData[chatIndex].lastMessage = input.slice(0,30);
          userChatData.chatsData[chatIndex].updatedAt = Date.now();
          if(userChatData.chatsData[chatIndex].rId === userData.id){
            userChatData.chatsData[chatIndex].messageSeen = false;
          }
          await updateDoc(userChatsRef,{
            chatsData :userChatData.chatsData
          })
        }
      })

    }
    } catch (error) {
      toast.error(error.message);
    }
    setInput("");
  }

  const convertTimestamp = (timestamp)=>{
      let date = timestamp.toDate();
      const hour = date.getHours();
      const minutes = date.getMinutes();
      if(hour > 12){
        return hour - 12 + ":"+ minutes+"PM";
      }
      else{
        return hour + ":" + minutes + "AM";
      }
  }

  useEffect(()=>{
     if(messagesId){
      const unSub = onSnapshot(doc(db,'messages',messagesId),(res)=>{
        setMessages(res.data().messages.reverse());
      })
      return ()=>{
        unSub();
      }
     }
  },[messagesId])

  return chatUser ? (
    <div className="chat-box">
      <div className="chat-user">
        <img src={chatUser.userData.avatar} alt="" />
        <p>{chatUser.userData.name}<img className='dot' src={assets.green_dot} alt="" /></p>
        <img src={assets.help_icon} alt="" className="help" />
      </div>

      <div className="chat-msg">
        {messages.map((msg,index)=>(
           <div key={index} className={msg.sId === userData.id ? "sender-msg" : "reciever-msg"}>
           <p className="s-msg">{msg.text}</p>
           <div>
             <img src={msg.sId === userData.id ? userData.avatar : chatUser.userData.avatar} alt="" />
             <p>{convertTimestamp(msg.createdAt)}</p>
           </div>
         </div>
        ))}
      </div>

      <div className="chat-input">
        <input type="text" onChange={(e)=>setInput(e.target.value)} value={input} placeholder='Send a message' />
        <input type="file" id="image" accept='image/png,image/jpeg' hidden />
        <label htmlFor="image">
          <img src={assets.gallery_icon} alt="" />
        </label>
        <img onClick={sendMessage} src={assets.send_button} alt="" />
      </div>
    </div>
  ) 
  :
  <div className="chat-welcome">
    <img src={assets.home2} alt="" />
    <p>Chat anytime,anyWhere</p>
  </div>
}

export default ChatBox