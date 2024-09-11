import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Login from './Pages/Login/Login'
import Chat from './Pages/Chatpage/Chat'
import ProfileUpdate from './Pages/UpdateProfile/ProfileUpdate'

const App = () => {
  return (
    <div>
    <Routes>
      <Route path='/' element={<Login/>}/>
      <Route path='/chat' element={<Chat/>}/>
      <Route path='/profile' element={<ProfileUpdate/>}/>
    </Routes>
      
    </div>
  )
}

export default App