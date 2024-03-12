import React, { useState, useEffect } from 'react'
import { BiDotsVerticalRounded } from "react-icons/bi";
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useSelector } from 'react-redux';


const OrderList = () => {

  const baseUrl = useSelector(state => state.baseUrlSlice.baseUrl);
  const [orderData, setOrderData] = useState([])

  async function get_Order() {
    var res = await axios.get(`${baseUrl}/order/all-orders`, {
      headers: {
        'Authorization': `Bearer ` + localStorage.getItem('token')
      }
    });
    // var data = await res.json()
    // console.log(res.data.data);
    setOrderData(res.data.data);
  }



  useEffect(() => {
    get_Order()
  }, [])


  return (
    <>
      <div className="table-heading">
        <div>
          <h4>All Order data</h4>
        </div>
        <div>
        </div>
      </div>
      <div className='listing'>
        <table className="table">
          <thead>
            <tr>
              <th scope="col">Event Name</th>
              <th scope="col">User Name</th>
              <th scope="col">Phone</th>
              <th scope="col">Amount</th>
              <th scope="col">Status</th>
              <th scope="col">Transaction Id</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            {
              orderData.map((e) => (
                <tr key={e.id}>
                  <th scope="row">{e.event.event_name}</th>
                  <td>{e.user_name}</td>
                  <td>{e.user_mobile}</td>
                  <td>{e.amount}</td>
                  <td>
                    {e.status == "S" ? (<>
                      Success
                    </>)
                      : e.status == "F" ?
                        (<>Failed

                        </>)
                        :
                        (<>
                          Inprogress
                        </>)}
                  </td>
                  <td>{e.transaction_id}</td>
                  <td>
                    <div className="dropdown">
                      <button className="" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                        <BiDotsVerticalRounded />
                      </button>
                      <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                        <li><Link className="dropdown-item" to={"/order/view/" + e.id}>View</Link></li>
                      </ul>
                    </div>
                  </td>
                </tr>
              ))
            }
          </tbody>
        </table>
      </div>
    </>
  )
}

export default OrderList