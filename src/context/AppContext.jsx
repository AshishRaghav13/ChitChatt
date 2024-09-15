import { doc, getDoc, updateDoc } from "firebase/firestore";
import { createContext, useEffect, useState } from "react";
import { auth, db } from "../ConfigFiles/firebase";
import { useNavigate } from "react-router-dom";

export const AppContext = createContext();

const AppContextProvider = (props)=>{
    const navigate = useNavigate();
    const [userData,setUserData] = useState(null);
    const [chatData,setChatData] = useState(null);
     
   const loadUserData = async(uid)=>{
    try{
      const userRef = doc(db,'users',uid);
      const userSnap = await getDoc(userRef);
      const userInfo = userSnap.data();
      setUserData(userInfo);

      // if(userData.avatar && userData.name){
      //   navigate('/chat');
      // }
      // else{
      //   navigate('/profile');
      // }

      // await updateDoc(userRef,{
      //   lastseen:Date.now()
      // })
      // setInterval(() => {
      //   if(auth){
      //      updateDoc(userRef,{
      //       lastseen:Date.now()
      //      })
      //   }
      // },60000);

    }catch(error){
        console.error(error)
    }
   }

   useEffect(()=>{
    if(userData?.avatar && userData?.name){
        navigate('/chat');
      }
      else{
        navigate('/profile');
      }
   },[userData])



    const value = {
        userData,setUserData,
        chatData,setChatData,            // can use this state variables in any component
        loadUserData
    }

    return(
        <AppContext.Provider value={value}>
           {props.children}
        </AppContext.Provider>
    )
}

export default AppContextProvider;