import React, { useEffect, useRef } from "react";
import "../common/SidebarOld.css";
import {
  AiOutlineLogout,
  AiFillDashboard,
  AiOutlineSetting,
  AiOutlineUser,
  AiFillMessage,
  AiOutlineBell,
} from "react-icons/ai";
import { BiPurchaseTagAlt } from "react-icons/bi";
import { TbGridDots } from "react-icons/tb";
import { MdEvent } from "react-icons/md";
import { DiMagento } from "react-icons/di";
import { IoLogoBitbucket } from "react-icons/io";
import { Link } from "react-router-dom";
import { Routes, Route, useLocation } from "react-router-dom";
import Dashboard from "../pages/dashboard/Dashboard";
import Listing from "../pages/event/Listing";
import Add from "../pages/event/Add";
import Header from "./Header";
import Login from "../auth/Login";
import ForgotPass from "../auth/ForgotPass";
import ForgetPassOtp from "../auth/ForgetPassOtp";
import { toast } from "react-toastify";
import $ from "jquery";
import View from "../pages/event/View";
import Update from "../pages/event/Update";
import Purchase from "../pages/purchase/Purchase";
import PageNotFound from "../pages/purchase/PageNotFound";
import OrderList from "../pages/orders/OrderList";
import OrderView from "../pages/orders/OrderView";
import EventPurchased from "../pages/event-purchased/EventPurchased";
import EventPurchaseView from "../pages/event-purchased/EventPurchaseView";
import Thankyou from "../pages/purchase/Thankyou";
import EventNameList from "../pages/event/EventNameList";


const SidebarOld = () => {
  function toggleSidebar() {
    document.body.classList.toggle("open");
    //here
    // console.log($("#dash").is(":visible"));
    if ($("#dash").is(":visible") === true) {
      $("#dash").hide(200);
      $("#main-content").css("padding-left", "84px");
      $("#header").css("padding-left", "84px");
    } else {
      $("#dash").show(200);
      $("#main-content").css("padding-left", "272px");
      $("#header").css("padding-left", "272px");
    }
  }

  function logout() {
    localStorage.removeItem("token");
    window.location = "/";
  }

  //assigning location variable
  const location = useLocation();
  //destructuring pathname from location
  const { pathname } = location;
  //Javascript split method to get the name of the path in array
  const splitLocation = pathname.split("/");

  // console.log(splitLocation[1]);

  

  return (
    <>
      {!localStorage.getItem("token") ? (
        <>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/forgotpass" element={<ForgotPass />} />
            <Route
              path="/forget-password/enter-opt"
              element={<ForgetPassOtp />}
            />
            <Route exact path="/events/:slug" element={<Purchase />} />
            <Route exact path="/reportss/:slug" element={<Purchase />} />
            <Route exact path="/reportss/:slug" element={<Purchase />} />
            <Route path="*" element={<PageNotFound />} />
          </Routes>
        </>
      ) : (
        <>
          {splitLocation[1] === "events" ? (
            ""
          ) : (
            <>
              <aside className="sidebar">
                <div className="sidebar-inner">
                  {/* <header className="sidebar-header">
                      <button
                        type="button"
                        className="sidebar-burger"
                        onClick={toggleSidebar}
                      ></button>
                      <Link className={splitLocation[1] === "dashboard" ? 'actives nav-links' : 'nav-links'}>GGoose </Link>
                    </header> */}
                  <nav className="sidebar-nav">
                    <button type="button" className="logo">
                      <Link to="" className="logo-text">
                        <IoLogoBitbucket />
                        <span id="dash" style={{ display: "none" }}>
                          GGoose 
                        </span>
                      </Link>
                    </button>
                    <button type="button">
                      <Link
                        className={
                          splitLocation[1] === "reports"
                            ? "active nav-links"
                            : "nav-links"
                        }
                        to="/reports"
                      >
                        <AiFillDashboard />
                        Reports
                      </Link>
                    </button>
                    <button type="button">
                      <Link
                        className={
                          splitLocation[1] === "event-names"
                            ? "active nav-links"
                            : "nav-links"
                        }
                        to="/event-names"
                      >
                        <MdEvent /> Event Names
                      </Link>
                    </button>
                    <button type="button">
                      <Link
                        className={
                          splitLocation[1] === "event"
                            ? "active nav-links"
                            : "nav-links"
                        }
                        to="/event"
                      >
                        <MdEvent /> Products
                      </Link>
                    </button>
                    <button type="button">
                      <Link
                        className={
                          splitLocation[1] === "order"
                            ? "active nav-links"
                            : "nav-links"
                        }
                        to="/order"
                      >
                        <DiMagento /> Order
                      </Link>
                    </button>
                    <button type="button">
                      <Link
                        className={
                          splitLocation[1] === "event-report"
                            ? "active nav-links"
                            : "nav-links"
                        }
                        to="/event-report"
                      >
                        <BiPurchaseTagAlt /> Event Report
                      </Link>
                    </button>
                  </nav>
                  <footer className="sidebar-footer">
                    {/* <button type="button">
                        <Link className='nav-links' onClick={logout}><AiOutlineLogout /> Logout</Link>
                      </button> */}
                  </footer>
                </div>
              </aside>
              <div className="header" id="header">
                <header className="sidebar-header">
                  <button
                    type="button"
                    className="sidebar-burger"
                    onClick={toggleSidebar}
                  ></button>
                </header>
                <div className="add-event-btn">
                  {/* <div className="dott">
                    <TbGridDots />
                  </div>
                  <div className="bell">
                    <AiOutlineBell />
                  </div> */}
                   
                  <div class="half">
                    {/* <label for="profile2" class="profile-dropdown">
                        <input type="checkbox" id="profile2" />
                        <img src="https://cdn0.iconfinder.com/data/icons/avatars-3/512/avatar_hipster_guy-512.png" />
                        <span>John Doe</span>
                        <ul>
                          <li><Link to="#" className='prof-det'><AiFillMessage />Messages</Link></li>
                          <li><Link to="#" className='prof-det'><AiOutlineUser />Account</Link></li>
                          <li><Link to="#" className='prof-det'><AiOutlineSetting />Settings</Link></li>
                          <li><Link to="#" onClick={logout} className='prof-det'><AiOutlineLogout />Logout</Link></li>
                        </ul>
                      </label> */}

                     
                    <span class="dropdown">
                    
                      <button
                        class="profile-dropdown"
                        type="button"
                        id="dropdownMenuButton1"
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                      >
                        
                        <img
                          src="https://cdn0.iconfinder.com/data/icons/avatars-3/512/avatar_hipster_guy-512.png"
                          style={{ width: "40px", height: "40px" }}
                        />
                        <span>John Doe</span>
                      </button>
                      <ul
                        class="dropdown-menu"
                        aria-labelledby="dropdownMenuButton1"
                      >
                        <li>
                          <Link to="#" onClick={logout} className="prof-det">
                            <AiOutlineLogout />
                            Logout
                          </Link>
                        </li>
                      </ul>
                    </span>
                  </div>
                </div>
              </div>
            </>
          )}

          <br /> <br /><br /><br />

          <div className="main-content" id="main-content">
            <Routes>
              <Route exact path="/" element={<Dashboard />} />
              <Route exact path="/reports" element={<Dashboard />} />
              <Route exact path="/event" element={<Listing />} />
              <Route exact path="/event/add" element={<Add />} />
              <Route exact path="/event/view/:id" element={<View />} />
              <Route exact path="/event/edit/:id" element={<Update />} />
              <Route exact path="/events/:slug" element={<Purchase />} />
              <Route exact path="/reportss/:slug" element={<Purchase />} />
              <Route exact path="/events/thanku" element={<Thankyou />} />
              <Route exact path="/not-found" element={<PageNotFound />} />
              <Route exact path="/order" element={<OrderList />} />
              <Route exact path="/order/view/:id" element={<OrderView />} />
              <Route exact path="/event-names" element={<EventNameList />} />
              <Route
                exact
                path="/event-report"
                element={<EventPurchased />}
              />
              <Route
                exact
                path="/event-report/view/:id"
                element={<EventPurchaseView />}
              />
              <Route path="*" element={<PageNotFound />} />
            </Routes>
          </div>
        </>
      )}
    </>
  );
};

export default SidebarOld;
