import React, { useState } from 'react'
import { FcGoogle } from "react-icons/fc";
import { FaFacebookF } from "react-icons/fa";
import { BsApple } from "react-icons/bs";
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const ForgetPassOtp = () => {

  const baseUrl = useSelector(state => state.baseUrlSlice.baseUrl);
  const navigate = useNavigate();
  const [otp, setOtp] = useState('')
  const [newPassword, setNewPassword] = useState('')


  const handleSubmit = async (event) => {
    // console.log(`${baseUrl}/login`)
    event.preventDefault();
    var fd = new FormData();
    fd.append("otp", otp);
    fd.append("password", newPassword);
    const res = await axios.post(`${baseUrl}/forget-password/enter-newpassword`, fd).then((res) => {
      // console.log(res)
      if (res.data.code == 200) {
        // console.log(res.data.message);
        toast.success(res.data.message);
        navigate('/')
      } else {
        toast.error(res.data.message);
      }
    })
      .catch((err) => {
        console.log(err);
      });
  }


  return (
    <main className="main">
    <div className="container">
      <section className="wrapper">
        <div className="heading">
          <h1 className="text text-large">Forgot Password</h1>
          <p className="text text-normal">Enter New Password
          </p>
        </div>
        <form onSubmit={handleSubmit} className="form">
          <div className="input-control">
            <label htmlFor="otp" className="input-label" hidden>Email Address</label>
            <input type="text" value={otp} onChange={(e) => { setOtp(e.target.value) }} name="otp" id="otp" className="input-field" placeholder="Enter OTP" />
          </div>
          <div className="input-control">
            <label htmlFor="password" className="input-label" hidden>Email Address</label>
            <input type="text" value={newPassword} onChange={(e) => { setNewPassword(e.target.value) }} name="password" id="password" className="input-field" placeholder="Enter New Password" />
          </div>
          <div className="input-control">
            <p></p>
            <button className="input-submit">Change Password</button>
          </div>
        </form>
      </section>
    </div>
  </main>
  )
}

export default ForgetPassOtp