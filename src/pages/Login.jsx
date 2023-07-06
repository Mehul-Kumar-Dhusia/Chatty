import { signInWithEmailAndPassword } from "firebase/auth";
import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../Firebase";
import { AuthContext } from "../context/AuthContext";
import Loading from "../components/Loading";
const Login = () => {
  const [err,setError] = useState('')
  const [loading , setLoading] = useState(false)
  const {setMessageUser,setDark} = useContext(AuthContext)
  const navigate = useNavigate()

  const submitHandler = async (e) => {
    setLoading(true)
    e.preventDefault()
    const email = e.target[0].value
    const password = e.target[1].value

    setDark(false)

    try { 
      await signInWithEmailAndPassword(auth,email,password)
      setMessageUser(null)
      setLoading(false)
      navigate('/')

    } catch (error) {
      setError(error.message)
    }
    
  }
  return (
    <div className="register">
      {loading ? <Loading /> : <div className="wrapper">
        <h1>Chatty</h1>
        <span>Login</span>
        <form onSubmit={submitHandler}>
          <input type="email" placeholder="email" />
          <input type="text" placeholder="password" />
          <p style={{color:"red"}}>{err}</p>
          <button>Log in</button>
        </form>
        <p>Don't have an account ? <Link style={{textDecoration:"none",fontWeight:"500"}} to='/register'>Register</Link></p>
      </div>}
    </div>
  );
};

export default Login;
