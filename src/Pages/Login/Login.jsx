import React, { useState } from 'react'
import './Login.css'

const Login = () => {
    const [currState,setCurrState] = useState("Sign Up");
  return (
    <div className='login'>
        <form className='login-form'>
            <h2 >{currState}</h2>
            {currState ==="Sign Up" ?<input type="text" placeholder='Username' required className='form-input' />:null }
            <input type="email" placeholder='Email address' required className='form-input'/>
            <input type="password" placeholder='Password' required className='form-input'/>
            <button type='submit' className='btn'>{currState ==="Sign Up" ? "Create Account": "Login"}</button>
            <div className="forget-login">
                {
                    currState =="Sign Up" 
                    ?
                    <p className="login-toggle">Already have an account! <span onClick={()=> setCurrState("Login")}>Login</span></p>
                    :
                    <p className="login-toggle">Create an account! <span onClick={()=> setCurrState("Sign Up    ")}>click here</span></p>
                }
            </div>
        </form>
    </div>
  )
}

export default Login