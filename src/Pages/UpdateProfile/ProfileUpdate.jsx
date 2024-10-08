import React, { useContext, useEffect, useState } from 'react'
import './ProfileUpdate.css';
import assets from '../../assets/assets';
import { onAuthStateChanged } from 'firebase/auth';
import { auth, db } from '../../ConfigFiles/firebase';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import upload from '../../lib/upload';
import { AppContext } from '../../context/AppContext';

const ProfileUpdate = () => {
  const navigate = useNavigate();
  const [image, setImage] = useState(false);
  const [name, setName] = useState("");
  const [bio, setBio] = useState("");
  const [uid, setUid] = useState("");
  const [prevImg,setPrevImg] = useState("");

  const {setUserData} = useContext(AppContext);

  const profileUpdate = async (event)=>{
     event.preventDefault();
     try {
      if(!prevImg && !image){
        toast.error("Upload profile picture");
      }
      const docRef = doc(db,"users",uid);
      if(image){
        const imageUrl = await upload(image);
        setPrevImg(imageUrl);
        await updateDoc(docRef,{
          avatar:imageUrl,
          bio:bio,
          name:name
        })
      }
      else{
        await updateDoc(docRef,{
          bio,
          name
        })

      }

      const ref = await getDoc(docRef);
      setUserData(ref.data());
      navigate('/chat');
     } catch (error) {
       console.error(error);
       toast.error(error.message)
     }
  }

  useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        setUid(user.uid);
        const docRef = doc(db, "users", user.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.data().name) {
          setName(docSnap.data().name);
        }
        if (docSnap.data().bio){
          setBio(docSnap.data().bio);
        }
        if(docSnap.data().avatar){
          setPrevImg(docSnap.data().avatar)
        }
      }
      else{              // if user does not exist
        navigate('/');
      }
    })
  }, [])

  return (
    <div className="profile">
      <div className="profile-details">
        <form onSubmit={profileUpdate}>
          <h3>Profile Details</h3>
          <label htmlFor="avatar">
            <input onChange={(e) => setImage(e.target.files[0])} type="file" id='avatar' accept='.png, .jpg, .jpeg' hidden />
            <img src={image ? URL.createObjectURL(image) :prevImg ? prevImg : assets.avatar_icon} alt="" />
            Upload Profile image
          </label>
          <input type="text" onChange={(e) => setName(e.target.value)} value={name} placeholder='Enter your name' required />
          <textarea onChange={(e) => setBio(e.target.value)} value={bio} placeholder='Profile bio' required></textarea>
          <button type='submit'>Save details</button>
        </form>
        <img className='profile-pic' src={image ? URL.createObjectURL(image) :prevImg?prevImg: assets.logo_icon} alt="" />
      </div>
    </div>
  )
}

export default ProfileUpdate