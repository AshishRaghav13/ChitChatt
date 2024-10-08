import React, { useContext, useEffect } from 'react'
import { Route, Routes, useNavigate } from 'react-router-dom'
import Login from './Pages/Login/Login'
import Chat from './Pages/Chatpage/Chat'
import ProfileUpdate from './Pages/UpdateProfile/ProfileUpdate'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from './ConfigFiles/firebase'
import { AppContext } from './context/AppContext'
import RightSideBar from './Components/RightSideBar/RightSideBar'

const App = () => {

  const {loadUserData} = useContext(AppContext);
 const navigate = useNavigate();
 useEffect(()=>{
  onAuthStateChanged(auth,async(user)=>{
    if(user){
      navigate('/chat');
      // console.log(user);
      await loadUserData(user.uid);
    }
    else{
      navigate('/');
    }
  })
 },[])

  return (
    <>
    <ToastContainer/>
    <Routes>
      <Route path='/' element={<Login/>}/>
      <Route path='/chat' element={<Chat/>}/>
      <Route path='/profile' element={<ProfileUpdate/>}/>
      <Route path='/rightSide' element={<RightSideBar/>}></Route>
    </Routes>
      
    </>
  )
}

export default App