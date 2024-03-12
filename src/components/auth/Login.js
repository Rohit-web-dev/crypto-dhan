import React, { useState } from 'react'
import { FcGoogle } from "react-icons/fc";
import { FaFacebookF } from "react-icons/fa";
import { BsApple } from "react-icons/bs";
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import setUserSlice from '../../redux/slices/authSlice'
import axios from 'axios'
import { Link } from 'react-router-dom';
import { toast } from "react-toastify";

const Login = () => {

  const baseUrl = useSelector(state => state.baseUrlSlice.baseUrl);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')



  // console.log(baseUrl.baseUrl);
  // console.log(email);
  // console.log(password);


  const handleSubmit = async (event) => {
    console.log(`${baseUrl}/login`)
    event.preventDefault();
    var fd = new FormData();
    fd.append("email", email);
    fd.append("password", password);
     const res = await axios.post(`${baseUrl}/login`, fd).then((res) => {
      // console.log(res)
      if (res.data.code == 200) {
        console.log(res.data.message);
        toast.success(res.data.message);
        localStorage.setItem("token",res.data.access_token)
        window.location="/reports"
      } else {
        console.log(res.data.message);
        toast.error(res.data.message);
      }
    })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <div>
      <main className="main">
        <div className="container">
          <section className="wrapper">
            <div className="heading">
              <h1 className="text text-large">Sign In</h1>
              <p className="text text-normal">New user? <span><a href="#" className="text text-links">Create an account</a></span>
              </p>
            </div>
            <form onSubmit={handleSubmit} className="form">
              <div className="input-control">
                <label htmlFor="email" className="input-label" hidden>Email Address</label>
                <input type="email" value={email} onChange={(e) => { setEmail(e.target.value) }} name="email" id="email" className="input-field" placeholder="Email Address" />
              </div>
              <div className="input-control">
                <label htmlFor="password" className="input-label" hidden>Password</label>
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} name="password" id="password" className="input-field" placeholder="Password" />
              </div>
              <div className="input-control">
                <Link to="/forgotpass" className="text text-links">Forgot Password</Link>
                <button className="input-submit">Sign In</button>
              </div>
            </form>
            {/* <div className="striped">
              <span className="striped-line"></span>
              <span className="striped-text">Or</span>
              <span className="striped-line"></span>
            </div>
            <div className="method">
              <div className="method-control">
                <a href="#" className="method-action">
                  <div className="react-icon">
                    <FcGoogle />
                  </div>
                  <span>Sign in with Google</span>
                </a>
              </div>
              <div className="method-control">
                <a href="#" className="method-action">
                <div className="react-icon facebook">
                    <FaFacebookF />
                  </div>
                  <span>Sign in with Facebook</span>
                </a>
              </div>
              <div className="method-control">
                <a href="#" className="method-action">
                <div className="react-icon">
                    <BsApple />
                  </div>
                  <span>Sign in with Apple</span>
                </a>
              </div>
            </div> */}
          </section>
        </div>
      </main>
    </div>
  )
}

export default Login