import './LeftSideBar.css';
import React from 'react'
import { TiMessages } from "react-icons/ti";
import assets from '../../assets/assets';

const LeftSideBar = () => {
  return (
    <div className='ls'>
        <div className='ls-top'>
            <div className="ls-nav">
                <TiMessages className='icon' />

                <span>Chatapp</span>
                <div className="menu">
                    <img src={assets.menu_icon} alt="" />
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
                <img src={assets.profile_img} alt="" />
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