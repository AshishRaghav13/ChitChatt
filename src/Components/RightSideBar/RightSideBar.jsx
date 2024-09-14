import assets from '../../assets/assets';
import { logout } from '../../ConfigFiles/firebase';
import './RightSideBar.css';
const RightSideBar = ()=>{
    return(
        <div className='rs'>
            <div className='rs-profile'>
                <img src={assets.my_img} alt="" />
                <h3>Ashish Raghav <img src={assets.green_dot} className='dot' alt="" /></h3>
                <p>Hey,there i am using chat app</p>
            </div>
            <hr />
            <div className="rs-media">
                <p>Media</p>
                <div>
                    <img src={assets.pic1} alt="" />
                    <img src={assets.pic1} alt="" />
                    <img src={assets.pic1} alt="" />
                    <img src={assets.pic1} alt="" />
                    <img src={assets.pic1} alt="" />
                    <img src={assets.pic1} alt="" />
                </div>
                <button onClick={()=>logout()}>Logout</button>
            </div>
            
        </div>
    )
}

export default RightSideBar;