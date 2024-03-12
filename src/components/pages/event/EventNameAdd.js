import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setAddEventSlice } from '../../../redux/slices/addSlice';
import { toast } from "react-toastify";
import axios from 'axios';
import { GrAdd } from "react-icons/gr";
import { AiOutlineMinus } from "react-icons/ai";
import { RxCross2 } from "react-icons/rx";
import $ from "jquery";
import validate from 'jquery-validation'
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { MdKeyboardBackspace } from "react-icons/md";
import { Editor } from '@tinymce/tinymce-react';
import EventNameAdd from './EventNameAdd';
import EventNameList from './EventNameList';


const EventNameAdd = () => {

  const baseUrl = useSelector(state => state.baseUrlSlice.baseUrl);
  const dispatch = useDispatch()
  const navigate = useNavigate()

const [eventName, setEventName] = useState()
const [wallet, setWallet] = useState()

  useEffect(() => {
    //validations
    $("#frm").validate({
      rules: {
        event_name: {
          required: true,
        },
        wallet: {
          required: true,
        },
      }
    });

  }, []);


  // console.log(addEvent);

  const handleChange = (prop) => (event) => {
    const aaaa = dispatch(setAddEventSlice({ ...addEvent, [prop]: event.target.value }))
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    var fd = new FormData;
    fd.append("name", eventName);
    fd.append("wallet", wallet);
    
    fd.append("dynamicdata", JSON.stringify(dynmicdata));
    // console.log(Object.fromEntries(fd));
    return axios.post(`${baseUrl}/event-name-insert`, fd, {
      headers: {
        'Authorization': `Bearer ` + localStorage.getItem('token')
      }
    }).then((res) => {
      // console.log(res)
      if (res.data.code == "200") {
        toast.success(res.data.message);
      } else {
        toast.error(res.data.message);
      }
    })
      .catch((err) => {
        console.log(err);
      });
  }


  return (
    <>
      <div className="row">
        <div className="col-10">
          <div className="create">
            <div className="card-header view-header" >
              <h4>Create Event</h4>
            </div>
            <div className="card-body">
              <form onSubmit={handleSubmit} id="frm">
                
                <div className="mb-3">
                  <label htmlFor="event_name" className="form-label">Event Name</label>
                  <input type="text" name='event_name' value={eventName} onChange={handleChange('eventName')} className="form-control" id="event_name" />
                </div>
                <div className="mb-3">
                  <label htmlFor="wallet" className="form-label">Wallet</label>
                  <input type="text" name='wallet' value={wallet} onChange={handleChange('gooldgoose')} className="form-control" id="wallet" />
                </div>
               



                <div className="add-event-btns">
                  <Link to='/event' className='cancle-btn'>Cancle</Link>
                  <button type="submit" className="submit-event-btn">Add</button>
                </div>
              </form>
            </div>
          </div>
        </div>

      </div>




    </>
  )
}

export default EventNameAdd