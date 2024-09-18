import "./LeftSideBar.css";
import React, { useContext, useState } from "react";
import { TiMessages } from "react-icons/ti";
import assets from "../../assets/assets";
import { useNavigate } from "react-router-dom";
import { db, logout } from "../../ConfigFiles/firebase";
import { arrayUnion, collection, doc, getDocs, query, serverTimestamp, setDoc, updateDoc, where } from "firebase/firestore";
import { AppContext } from "../../context/AppContext";
import { toast } from "react-toastify";

const LeftSideBar = () => {
  const navigate = useNavigate();
  const { userData,chatData } = useContext(AppContext);
  const [user, setUser] = useState(null);
  const [showSearch, setShowSearch] = useState(false);
  const handleClick = () => {
    navigate("/profile");
  };

  const inputHandler = async (e) => {
    try {
      const input = e.target.value;
      if (input) {
        setShowSearch(true);
        const userRef = collection(db, "users");
        const q = query(userRef, where("username", "==", input.toLowerCase()));
        const querySnap = await getDocs(q);
        if (!querySnap.empty && querySnap.docs[0].data().id !== userData.id) {
          let userExist = false;
          chatData.map((user)=>{
            if(user.rId === querySnap.docs[0].data().id){
              userExist = true;
            }
          })

          if(userExist == false){
            setUser(querySnap.docs[0].data());
          }
          // console.log(querySnap.docs[0].data());
        }
        else{
            setUser(null);
        }
      }
      else{
        setShowSearch(false);
      }
    } catch (error) {
      toast.error(error.message);
      console.error(error);
    }
  };

  const addChat = async()=>{
     const messagesRef = collection(db,'messages');
     const chatRef = collection(db,'chats');
     try {
        const newMessageRef = doc(messagesRef);
        await setDoc(newMessageRef,{
            createAt:serverTimestamp(),
            messages:[] 
        })
        await updateDoc(doc(chatRef,user.id),{
            chatsData : arrayUnion({
                messageId:newMessageRef.id,
                lastMessage:"",
                rId:userData.id,
                updatedAt:Date.now(),
                messageSeen:true
            })
        })

        await updateDoc(doc(chatRef,userData.id),{
            chatsData : arrayUnion({
                messageId:newMessageRef.id,
                lastMessage:"",
                rId:user.id,
                updatedAt:Date.now(),
                messageSeen:true
            })
        })
     } catch (error) {
        toast.error(error.message);
        console.error(error);
     }
  }

  const setChat = async (item)=>{
    console.log(item)
  }
  return (
    <div className="ls">
      <div className="ls-top">
        <div className="ls-nav">
          <TiMessages className="icon" />

          <span>Chatapp</span>
          <div className="menu">
            <img src={assets.menu_icon} alt="" />
            <div className="sub-menu">
              <p onClick={handleClick}>Edit Profile</p>
              <hr />
              <p onClick={() => logout()}>Logout</p>
            </div>
          </div>
        </div>
        <div className="ls-search">
          <img src={assets.search_icon} alt="" />
          <input type="text" onChange={inputHandler} placeholder="Search" />
        </div>
      </div>
      <div className="ls-list">
        {
            showSearch && user 
            ? 
            <div className="friends add-user" onClick={addChat}>
                <img src={user.avatar} alt="" />
                <p>{user.name}</p>
            </div>
            :
            chatData
          .map((item, index) => (
            <div onClick={()=>setChat(item)} key={index} className="friends">
              <img src={item.userData.avatar} alt="" />
              <div>
                <p>{item.userData.name}</p>
                <span>{item.lastMessage}</span>
              </div>
            </div>
          ))
        }
      </div>
    </div>
  );
};

export default LeftSideBar;
