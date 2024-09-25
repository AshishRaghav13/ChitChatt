import { useContext, useEffect, useState } from 'react';
import assets from '../../assets/assets';
import { logout } from '../../ConfigFiles/firebase';
import './RightSideBar.css';
import { AppContext } from '../../context/AppContext';
const RightSideBar = ()=>{
    const {chatUser,messages} = useContext(AppContext);
    const [msgImages,setMsgImages] = useState([]);

    useEffect(()=>{
      let tempVar = [];
      messages.map((msg)=>{
        if(msg.image){
            tempVar.push(msg.image)
        }
        setMsgImages(tempVar);
      })
    },[messages])
    return chatUser ? (
        <div className='rs'>
            <div className='rs-profile'>
                <img onClick={()=>console.log(messages)} src={chatUser.userData.avatar} alt="" />
                <h3>{chatUser.userData.name} <img src={assets.green_dot} className='dot' alt="" /></h3>
                <p>{chatUser.userData.bio}</p>
            </div>
            <hr />
            <div className="rs-media">
                <p>Media</p>
                <div>
                    {
                      msgImages.map((url,index)=>(
                        <img onClick={()=>window.open(url)} key={index} src={url} alt="" />
                      ))  
                    }
                </div>
                <button onClick={()=>logout()}>Logout</button>
            </div>
            
        </div>
    )
    :
    (
        <div className='rs'>
            <button onClick={()=>logout()}>Logout</button>

        </div>
    )

}

export default RightSideBar;