import React, { useState } from 'react'
import './Login.css'
import { signup,signin } from '../../ConfigFiles/firebase';
import { toast } from 'react-toastify';

const Login = () => {
    const [currState,setCurrState] = useState("Sign Up");
    const [userName,setUserName] = useState("");
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");

    const onSubmitHandler = (event)=>{
       event.preventDefault();
       if(currState === "Sign Up"){
        signup(userName,email,password);
        // toast.success("Success!");
       }
       else{
         signin(email,password);
       }
    }

  return (
    <div className='login'>
        <form className='login-form' onSubmit={onSubmitHandler}>
            <h2 >{currState}</h2>
            {currState ==="Sign Up" ?<input type="text" placeholder='Username' onChange={(e)=>setUserName(e.target.value)} value={userName} required className='form-input' />:null }
            <input type="email" placeholder='Email address' onChange={(e)=>setEmail(e.target.value)} value={email} required className='form-input'/>
            <input type="password" placeholder='Password' onChange={(e)=>setPassword(e.target.value)} value={password} required className='form-input'/>
            <button type='submit' className='btn'>{currState ==="Sign Up" ? "Create Account": "Login"} </button>
            <div className="forget-login">
                {
                    currState ==="Sign Up" 
                    ?
                    <p className="login-toggle">Already have an account! <span onClick={()=> setCurrState("Login")}>Login</span></p>
                    :
                    <p className="login-toggle">Create an account! <span onClick={()=> setCurrState("Sign Up")}>click here</span></p>
                }
            </div>
        </form>
    </div>
  )
}

export default Login