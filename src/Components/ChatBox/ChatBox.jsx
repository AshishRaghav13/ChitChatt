import assets from '../../assets/assets';
import './ChatBox.css'; 
import React from 'react'

const ChatBox = () => {
  return (
    <div className="chat-box">
      <div className="chat-user">
        <img src={assets.my_img} alt="" />
        <p>Ashish Raghav <img className='dot' src={assets.green_dot} alt="" /></p>
        <img src={assets.help_icon} alt="" className="help" />
      </div>

      <div className="chat-msg">
        <div className="sender-msg">
          <p className="s-msg">Hello how are you..</p>
          <div>
            <img src={assets.my_img} alt="" />
            <p>9:30PM</p>
          </div>
        </div>

        <div className="sender-msg">
         <img className='msg-img' src={assets.pic1} alt="" />
          <div>
            <img src={assets.my_img} alt="" />
            <p>9:30PM</p>
          </div>
        </div>

        <div className="reciever-msg">
        <p className="r-msg">I am Good! how are u</p>
        <div>
          <img src={assets.my_img} alt="" />
          <p>9:32 PM</p>
        </div>
      </div>
      </div>

      <div className="chat-input">
        <input type="text" placeholder='Send a message' />
        <input type="file" id="image" accept='image/png,image/jpeg' hidden />
        <label htmlFor="image">
          <img src={assets.gallery_icon} alt="" />
        </label>
        <img src={assets.send_button} alt="" />
      </div>
    </div>
  )
}

export default ChatBox