import React, {useState} from 'react'
import { FcGoogle } from "react-icons/fc";
import { FaFacebookF } from "react-icons/fa";
import { BsApple } from "react-icons/bs";
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom';

const ForgotPass = () => {

  const baseUrl = useSelector(state => state.baseUrlSlice.baseUrl);
  const navigate = useNavigate();
  const [email, setEmail] = useState('')

  const handleSubmit = async (event) => {
    // console.log(`${baseUrl}/login`)
    event.preventDefault();
    var fd = new FormData();
    fd.append("email", email);
     const res = await axios.post(`${baseUrl}/forget-password/enter-email`, fd).then((res) => {
      // console.log(res)
      if (res.data.code == 200) {
        console.log(res.data.message);
        // alert(res.data.otp)
        navigate('/forget-password/enter-opt')
      } else {
        console.log(res.data.message);
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
            <p className="text text-normal">Enter register email Id
            </p>
          </div>
          <form onSubmit={handleSubmit} className="form">
            <div className="input-control">
              <label htmlFor="email" className="input-label" hidden>Email Address</label>
              <input type="email" value={email} onChange={(e) => { setEmail(e.target.value) }} name="email" id="email" className="input-field" placeholder="Email Address" />
            </div>
            <div className="input-control">
              <p></p>
              <button className="input-submit">Send OTP</button>
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
  )
}

export default ForgotPass