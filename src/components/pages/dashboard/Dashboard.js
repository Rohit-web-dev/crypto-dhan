import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux';
import axios from 'axios';
import { BsCalendarEvent, BsTags, BsBookmarkStarFill, BsCalendarCheck } from "react-icons/bs";
import { BiPurchaseTagAlt, BiPurchaseTag } from "react-icons/bi";
import { GiShinyPurse } from "react-icons/gi";
import { SiPurgecss } from "react-icons/si";
import { GoCalendar } from "react-icons/go";
import Listing from "../event/Listing";
import PassedEvents from "../event/PassedEvents";
import UpcommingEvents from "../event/UpcommingEvents";
import OrderList from "../orders/OrderList";

const Dashboard = () => {

  const baseUrl = useSelector(state => state.baseUrlSlice.baseUrl);
  const [totalEvent, setTotalEvent] = useState()
  const [totalPurchase, setTotalPurchase] = useState()
  const [totalPurchaseSuccess, setTotalPurchaseSuccess] = useState()
  const [totalPurchaseFail, setTotalPurchaseFail] = useState()
  const [totalPurchaseId, setTotalPurchaseId] = useState()
  const [passedEvent, setPassedEvent] = useState([])
  const [upcommingEvent, setUpcommingEvent] = useState([])


  const [state, setstate] = useState(0)

  async function get_AllCounts() {
    var res = await axios.get(`${baseUrl}/order/all-counts`, {
      headers: {
        'Authorization': `Bearer ` + localStorage.getItem('token')
      }
    });
    // var data = await res.json()
    // console.log(res.data);
    setTotalEvent(res.data.totalEvent)
    setTotalPurchase(res.data.totalPurchase)
    setTotalPurchaseSuccess(res.data.totalPurchaseSuccess)
    setTotalPurchaseFail(res.data.totalPurchaseFail)
    setTotalPurchaseId(res.data.totalPurchaseIp)

    var date=new Date();
  var adt=date.setDate(date.getDate() - 1);
  var today=new Date(adt);

    var filter1 = res.data.allEvent;
    const filtered1 = filter1.filter(data => {
      // console.log(data.event_date)
      // var EvntDate=new Date(data.event_date);
      return new Date(data.event_date) > today;
    });

    var filter2 = res.data.allEvent;
    const filtered2 = filter2.filter(data => {
      // console.log(data.event_date)
      // var EvntDate=new Date(data.event_date);
      return new Date(data.event_date) < today;
    });

    setPassedEvent(filtered2)
    setUpcommingEvent(filtered1)
  }


  useEffect(() => {
    get_AllCounts()
  }, [])


  return (
    <>
      {/* <div className="table-heading">
        <div>
          <h4>Dashboard</h4>
        </div>
        <div>
        </div>
      </div> */}
      <div className='purchase-card'>
        <div className="row m-0">
          {/* <div className="col-md-4 col-12 my-3">
            <div className="card dash">
              <div className="card-body">
                <h5 className="card-title"><p>Total Event</p><div className="dash-icon">
                  <BsCalendarEvent />
                </div></h5>
                <p className="dash-text">{totalEvent}</p>
              </div>
            </div>
          </div> */}

          {/* {state} */}


          <div className="col-md-3 col-12 my-3" onClick={() => {
            setstate(1)
          }}
          >
            <div className="card dash">
              <div className="card-body">
                <div className='new-dash'>
                  <div>
                    <h5 className="card-title"><p>Total Event</p> </h5>
                    <p className="dash-text">{totalEvent}</p>
                  </div>
                  <div className="dash-icon" style={{
                    backgroundColor: state == 1 ? 'lime' : '',
                  }}
                  >
                    <GoCalendar />
                  </div>
                </div>
              </div>
            </div>
          </div>

        

          <div className="col-md-3 col-12 my-3" onClick={() => {
            setstate(3)
          }}>
            <div className="card dash">
              <div className="card-body">
                <div className='new-dash'>
                  <div>
                    <h5 className="card-title"><p>Passed Event</p> </h5>
                    <p className="dash-text">{passedEvent.length}</p>
                  </div>
                  <div className="dash-icon" style={{
                    backgroundColor: state == 3 ? 'lime' : '',
                  }}>
                    <BsBookmarkStarFill />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="col-md-3 col-12 my-3" onClick={() => {
            setstate(4)
          }}>
            <div className="card dash">
              <div className="card-body">
                <div className='new-dash'>
                  <div>
                    <h5 className="card-title"><p>Upcomming Event</p> </h5>
                    <p className="dash-text">{upcommingEvent.length}</p>
                  </div>
                  <div className="dash-icon" style={{
                    backgroundColor: state == 4 ? 'lime' : '',
                  }}>
                    <BsCalendarCheck />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="col-md-3 col-12 my-3" onClick={() => {
            setstate(2)
          }}>
            <div className="card dash">
              <div className="card-body">
                <div className='new-dash'>
                  <div>
                    <h5 className="card-title"><p>Total Purchase</p> </h5>
                    <p className="dash-text">{totalPurchase}</p>
                  </div>
                  <div className="dash-icon" style={{
                    backgroundColor: state == 2 ? 'lime' : '',
                  }}>
                    <BsTags />
                  </div>
                </div>
              </div>
            </div>
          </div>



          {/* -------------------------------------------------------------------------------------- */}

          {state == 1 ? (<><Listing /></>) : state == 2 ? (<> <OrderList /></>) : state == 3 ? (<><PassedEvents /></>) : state == 4 ? (<> < UpcommingEvents /></>) : (<></>)}









          {/* <div className="col-md-4 col-12 my-3">
            <div className="card dash">
              <div className="card-body">
                <h5 className="card-title"><p>Passed Event</p><div className="dash-icon">
                  <SiPurgecss />
                </div></h5>
                <p className="dash-text">{passedEvent.length}</p>
              </div>
            </div>
          </div>
          <div className="col-md-4 col-12 my-3">
            <div className="card dash">
              <div className="card-body">
                <h5 className="card-title"><p>Upcomming Event</p><div className="dash-icon">
                  <BiPurchaseTag />
                </div></h5>
                <p className="dash-text">{upcommingEvent.length}</p>
              </div>
            </div>
          </div> */}




          {/* <div className="col-md-4 col-12 my-3">
            <div className="card dash">
              <div className="card-body">
                <h5 className="card-title"><p>Purchase (Success)</p><div className="dash-icon">
                  <GiShinyPurse />
                </div></h5>
                <p className="dash-text">{totalPurchaseSuccess}</p>
              </div>
            </div>
          </div>
          <div className="col-md-4 col-12 my-3">
            <div className="card dash">
              <div className="card-body">
                <h5 className="card-title"><p>Purchase (Fail)</p><div className="dash-icon">
                  <BiPurchaseTag />
                </div></h5>
                <p className="dash-text">{totalPurchaseFail}</p>
              </div>
            </div>
          </div>
          <div className="col-md-4 col-12 my-3">
            <div className="card dash">
              <div className="card-body">
                <h5 className="card-title"><p>Purchase (In Progress)</p><div className="dash-icon">
                  <SiPurgecss />
                </div></h5>
                <p className="dash-text">{totalPurchaseId}</p>
              </div>
            </div>
          </div> */}
        </div>
      </div>
    </>
  )
}

export default Dashboard