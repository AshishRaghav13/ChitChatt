import React, { useEffect } from 'react'
import { Route, Routes, useNavigate } from 'react-router-dom'
import Login from './Pages/Login/Login'
import Chat from './Pages/Chatpage/Chat'
import ProfileUpdate from './Pages/UpdateProfile/ProfileUpdate'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from './ConfigFiles/firebase'
import AppContextProvider from './context/AppContext'

const App = () => {
 const navigate = useNavigate();
 useEffect(()=>{
  onAuthStateChanged(auth,async(user)=>{
    if(user){
      navigate('/chat');
    }
    else{
      navigate('/');
    }
  })
 },[])

  return (
    <div>
    <ToastContainer/>
    <Routes>
      <AppContextProvider>
      <Route path='/' element={<Login/>}/>
      <Route path='/chat' element={<Chat/>}/>
      <Route path='/profile' element={<ProfileUpdate/>}/>
      </AppContextProvider>
    </Routes>
      
    </div>
  )
}

export default App