import './LeftSideBar.css';
import React from 'react'
import { TiMessages } from "react-icons/ti";
import assets from '../../assets/assets';
import { useNavigate } from 'react-router-dom';
import { logout } from '../../ConfigFiles/firebase';

const LeftSideBar = () => {
    const navigate = useNavigate();
    const handleClick = ()=>{
        navigate('/profile');
    }
  return (
    <div className='ls'>
        <div className='ls-top'>
            <div className="ls-nav">
                <TiMessages className='icon' />

                <span>Chatapp</span>
                <div className="menu">
                    <img src={assets.menu_icon} alt="" />
                    <div className="sub-menu">
                        <p onClick={handleClick}>Edit Profile</p>
                        <hr />
                        <p onClick={()=>logout()}>Logout</p>
                    </div>
                </div>
            </div>
            <div className="ls-search">
                <img src={assets.search_icon} alt="" />
                <input type="text" placeholder='Search'/>
            </div>
        </div>
        <div className="ls-list">
           {
            Array(12).fill("").map((item,index)=>(
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
  )
}

export default LeftSideBar;