import "./LeftSideBar.css";
import React, { useContext, useState } from "react";
import { TiMessages } from "react-icons/ti";
import assets from "../../assets/assets";
import { useNavigate } from "react-router-dom";
import { db, logout } from "../../ConfigFiles/firebase";
import { collection, getDocs, query, where } from "firebase/firestore";
import { AppContext } from "../../context/AppContext";

const LeftSideBar = () => {
  const navigate = useNavigate();
  const { userData } = useContext(AppContext);
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
          // console.log(querySnap.docs[0].data());
          setUser(querySnap.docs[0].data());
        }
        else{
            setUser(null);
        }
      }
      else{
        setShowSearch(false);
      }
    } catch (error) {
      console.error(error);
    }
  };
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
            <div className="friends add-user">
                <img src={user.avatar} alt="" />
                <p>{user.name}</p>
            </div>
            :
            Array(12)
          .fill("")
          .map((item, index) => (
            <div key={index} className="friends">
              <img src={assets.my_img} alt="" />
              <div>
                <p>Ashish Raghav</p>
                <span>How are you?</span>
              </div>
            </div>
          ))
        }
      </div>
    </div>
  );
};

export default LeftSideBar;
