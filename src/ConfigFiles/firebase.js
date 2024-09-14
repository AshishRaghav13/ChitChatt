// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { getFirestore, setDoc,doc  } from "firebase/firestore";
import { toast } from "react-toastify";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_API_URL,
  authDomain: "chitchatt-d240f.firebaseapp.com",
  projectId: "chitchatt-d240f",
  storageBucket: "chitchatt-d240f.appspot.com",
  messagingSenderId: "929635047049",
  appId: "1:929635047049:web:e6e223b21231e21a601858"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const signup = async (username,email,password)=>{
  try{
      const res = await createUserWithEmailAndPassword(auth,email,password);
      const user = res.user;
      await setDoc(doc(db,"users",user.uid),{
         id:user.uid,
         username:username.toLowerCase(),
         email,
         name:"",
         avatar: "",
         bio:"Hey,There i am using chitChatt",
         lastseen:Date.now()
      })
      await setDoc(doc(db,"chats",user.uid),{
        chatData:[]
      })
  }catch(error){
     console.error(error);
     toast.error(error.code.split('/')[1].split('-').join(" "))
  }
}

const signin = async(email,password)=>{
  try {
    await signInWithEmailAndPassword(auth,email,password);
  } catch (error) {
    console.error(error);
    toast.error(error.code.split('/')[1].split('-').join(" "));
  }
}

const logout = async()=>{
  try{
    await signOut(auth);
  }catch(error){
     console.error(error);
     toast.error(err.code.split('/')[1].split('-'.join(" ")));
  }
}

export {signup,signin,logout,auth,db};