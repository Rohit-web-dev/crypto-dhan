import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { MdKeyboardBackspace } from "react-icons/md";


const OrderView = () => {

  const baseUrl = useSelector(state => state.baseUrlSlice.baseUrl);
  const param = useParams()

  const [eventName, setEventName] = useState()
  const [productname, setproductname] = useState()
  const [productId, setproductId] = useState()
  const [userName, setUserName] = useState()
  const [email, setEmail] = useState()
  const [phone, setPhone] = useState()
  const [amount, setAmount] = useState()
  const [transaction, setTransaction] = useState()
  const [address, setAddress] = useState()
  const [bitrix_product_id, setBitrix_product_id] = useState()
  const [bitrix_event_id, setbitrix_event_id] = useState()
  const [newObject, setNewObject] = useState(
    // {
    //   "id": '',
    //   "event_id": 52,
    //   "transaction_id": "testttt",
    //   "user_f_name": "test",
    //   "user_l_name": "yuas",
    //   "user_email": "a@m.com",
    //   "user_mobile": "1111111111",
    //   "user_address": "23 road",
    //   "amount": "100.00",
    //   "status": "S",
    //   "business_name": "srv",
    //   "billing_address_country": "india",
    //   "billing_address_state": "billing_address_state",
    //   "billing_address_street": "billing_address_street",
    //   "billing_address_city": "billing_address_city",
    //   "billing_address_zip": "billing_address_zip",
    //   "total_purchase_event_ticket": 1,
    //   "billing_address_country_two": null,
    //   "billing_address_state_two": null,
    //   "billing_address_street_two": null,
    //   "billing_address_city_two": null,
    //   "billing_address_zip_two": "billing_address_zip",
    //   "created_at": "2022-12-30T08:22:55.000Z",
    //   "updated_at": "2022-12-30T08:22:55.000Z",
    //   "event": {
    //     "id": 52,
    //     "event_name": "1000k",
    //     "product_name": "jjj",
    //     "product_id": "kk",
    //     "bitrix_event_id": null,
    //     "bitrix_product_id": null,
    //     "e_id": 2,
    //     "platform_name": "abcplatform",
    //     "desc": "perfect",
    //     "status": "A",
    //     "goldengoose": 20,
    //     "price": "200.00",
    //     "slug": "52-jjj-kk",
    //     "event_date": "2022-12-31",
    //     "event_html": "<p>qq</p>",
    //     "created_at": "2022-12-29T14:15:45.000Z",
    //     "updated_at": "2022-12-29T16:02:38.000Z"
    //   }
    // }
  )


  // -- get single order data -- 
  async function getOrderSingleData() {
    var fd = new FormData;
    fd.append("order_id", param.id);
    return axios.post(`${baseUrl}/order/orders-view`, fd, {
      headers: {
        'Authorization': `Bearer ` + localStorage.getItem('token')
      }
    }).then((res) => {
      //console.log(res)
      if (res.data.code == "200") {
        // toast.success(res.data.message);
        setEventName(res.data.data.event.event_name)
        setUserName(res.data.data.user_f_name)
        setEmail(res.data.data.user_email)
        setPhone(res.data.data.user_mobile)
        setAmount(res.data.data.event.goldengoose)
        setTransaction(res.data.data.transaction_id)
        setAddress(res.data.data.user_address)
        setproductId(res.data.data.event.product_name)
        setproductname(res.data.data.event.product_id)
        setBitrix_product_id(res.data.data.event.bitrix_product_id)
        setbitrix_event_id(res.data.data.event.bitrix_event_id)
        setNewObject(res.data.data)
      } else {
        console.log(res.data.message);
      }
    })
      .catch((err) => {
        console.log(err);
      });
  }



  useEffect(() => {
    getOrderSingleData()
  }, [])



  return (
    <>
      <div className="row">
        <div className="col-10">
          <div className="card view-card">
            <div className="card-header view-header">
              View Order Event
            </div>
            <div className="card-body">
              <table className='view-table'>
                <tr>
                  <th>Event Name</th>
                  <td>: {eventName}</td>
                </tr>
                <tr>
                  <th>product Name</th>
                  <td>: {productname}</td>
                </tr>
                <tr>
                  <th>product id</th>
                  <td>: {productId}</td>
                </tr>
                <tr>
                  <th>Bitrix Event Id</th>
                  <td>: {bitrix_event_id}</td>
                </tr>
                <tr>
                  <th>Bitrix Product Id</th>
                  <td>: {bitrix_product_id}</td>
                </tr>
                <tr>
                  <th>User Name</th>
                  <td>: {userName}</td>
                </tr>
                <tr>
                  <th>Email</th>
                  <td>: {email}</td>
                </tr>
                <tr>
                  <th>Phone</th>
                  <td>: {phone}</td>
                </tr>
                <tr>
                  <th>Ggoose Eggs</th>
                  <td>: {amount}</td>
                </tr>
                <tr>
                  <th>Transaction</th>
                  <td>: {transaction}</td>
                </tr>
                <h2 className='my-3' style={{color: '#5d9f0f'}}><b>Billing Address 1</b></h2>
                <tr>
                  <th>Street</th>
                  <td>: {newObject?.billing_address_street}</td>
                </tr>
                <tr>
                  <th>City</th>
                  <td>: {newObject?.billing_address_city}</td>
                </tr>
                <tr>
                  <th>State</th>
                  <td>: {newObject?.billing_address_state}</td>
                </tr>
                <tr>
                  <th>Country</th>
                  <td>: {newObject?.billing_address_country}</td>
                </tr>
                <tr>
                  <th>Pin Code</th>
                  <td>: {newObject?.billing_address_zip}</td>
                </tr>
                <h2 className='my-3' style={{color: '#5d9f0f'}}><b>Billing Address 2</b></h2>
                <tr>
                  <th>Street</th>
                  <td>: {newObject?.billing_address_street_two}</td>
                </tr>
                <tr>
                  <th>City</th>
                  <td>: {newObject?.billing_address_city_two}</td>
                </tr>
                <tr>
                  <th>State</th>
                  <td>: {newObject?.billing_address_state_two}</td>
                </tr>
                <tr>
                  <th>Country</th>
                  <td>: {newObject?.billing_address_country_two}</td>
                </tr>
                <tr>
                  <th>Pin Code</th>
                  <td>: {newObject?.billing_address_zip_two}</td>
                </tr>
              </table>
            </div>
          </div>
        </div>
        <div className="col-2">
          <div className="table-heading" style={{ width: '80%', margin: '0 auto', marginBottom: '12px' }}>
            <div>
              <Link to='/order' className="back-btns">
                <MdKeyboardBackspace />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default OrderView