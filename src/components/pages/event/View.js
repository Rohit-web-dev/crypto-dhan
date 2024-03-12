import React, { useEffect, useState } from 'react'
import { MdKeyboardBackspace } from "react-icons/md";
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { toast } from "react-toastify";
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import $ from "jquery";


const View = () => {

  const baseUrl = useSelector(state => state.baseUrlSlice.baseUrl);
  const addEvent = useSelector(state => state.addSlice);
  const dispatch = useDispatch()
  const param = useParams()

  const [eventName, setEventName] = useState()
  const [platformName, setPlatformName] = useState()
  const [goldgoose, setGoldgoose] = useState()
  const [price, setPrice] = useState()
  const [desc, setDesc] = useState()
  const [eventDate, seteventDate] = useState()
  const [eventCreated, seteventCreated] = useState()
  const [forhtml, setforhtml] = useState()
  const [product_name, setProduct_name] = useState()
  const [product_id, setProduct_id] = useState()
  const [bitrix_product_id, setBitrix_product_id] = useState()
  const [bitrix_event_id, setbitrix_event_id] = useState()


  useEffect(() => {
    getEventSingleData()
    getDynamicData()
  }, [])











  //for dynamic form
  const [dynmicdata, SetDynamicData] = useState([])

  //dynamic  part
  const dynamicChangeInput = (index, event) => {
    const value = [...dynmicdata];
    value[index][event.target.name] = event.target.value;
    SetDynamicData(value);
  }




  // -- get single data -- 
  async function getEventSingleData() {
    var fd = new FormData;
    fd.append("event_id", param.id);
    return axios.post(`${baseUrl}/event-view`, fd, {
      headers: {
        'Authorization': `Bearer ` + localStorage.getItem('token')
      }
    }).then((res) => {
      // console.log(res)
      if (res.data.code == "200") {
        //  log(res.data.message);
        setEventName(res.data.data.event_names?.name)
        setPlatformName(res.data.data.platform_name)
        setGoldgoose(res.data.data.goldengoose)
        setPrice(res.data.data.price)
        setDesc(res.data.data.desc)
        seteventCreated(res.data.data.created_at)
        seteventDate(res.data.data.event_date)
        setforhtml(res.data.data.event_html)
        setProduct_name(res.data.data.product_name)
        setProduct_id(res.data.data.product_id)
        setBitrix_product_id(res.data.data.bitrix_product_id)
        setbitrix_event_id(res.data.data.bitrix_event_id)
      } else {
        console.log(res.data.message);
      }
    })
      .catch((err) => {
        console.log(err);
      });
  }






  // -- get dynamic data -- 
  async function getDynamicData() {
    var fd = new FormData;
    fd.append("event_id", param.id);
    return axios.post(`${baseUrl}/events-attributes`, fd, {
      headers: {
        'Authorization': `Bearer ` + localStorage.getItem('token')
      }
    }).then((res) => {
      // console.log(res)
      if (res.data.status == true) {
        // toast.success(res.data.message);
        SetDynamicData(res.data.data)
      } else {
        // toast.error(res.data.message);
        SetDynamicData([])
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
          <div className="card view-card">
            <div className="card-header view-header">
              View All Single Event
            </div>
            <div className="card-body">
              <table className='view-table'>
                <tr>
                  <th>Product Name</th>
                  <td>: {product_name}</td>
                </tr>
                <tr>
                  <th>Product Id</th>
                  <td>: {product_id}</td>
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
                  <th>Event Name</th>
                  <td>: {eventName}</td>
                </tr>
                <tr>
                  <th>Platform Name</th>
                  <td>: {platformName}</td>
                </tr>
                <tr>
                  <th>Ggoose Eggs</th>
                  <td>: {goldgoose}</td>
                </tr>
                {/* <tr>
              <th>Price</th>
              <td>: {price}</td>
            </tr> */}
                <tr>
                  <th>Desc</th>
                  <td>: {desc}</td>
                </tr>

                <tr>
                  <th>Event date</th>
                  <td>: {eventDate}</td>
                </tr>

                <tr>
                  <th>Event created at</th>
                  <td>: {eventCreated}</td>
                </tr>

                {
                  dynmicdata.map((e) => (
                    <>
                     <tr key={e.id}>
                        <th>{e.key_name}</th>
                        <td>: {e.value}</td>
                      </tr>
                    </>
                  ))
                }

                <tr>
                  <th>What's Included</th>
                  <td>: 
                    <div>
                      {/* {forhtml} */}
                      <div dangerouslySetInnerHTML={{ __html: forhtml }} />
                    </div>
                  </td>
                </tr>




              </table>
              {
                dynmicdata.map((e) => (
                  <div className="dynamic-data-view" key={e.id}>
                    <div className="mb-3">
                      <label htmlFor="key" className="form-label"><b>Key:</b></label>
                      <input type="text" name='key' value={e.key_name} className="form-control" id="key" disabled />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="value" className="form-label"><b>Value:</b></label>
                      <input type="text" name='value' value={e.value} className="form-control" id="value" disabled />
                    </div>
                  </div>
                ))
              }


            </div>
          </div>
        </div>
        <div className="col-2">
          <div className="table-heading" style={{ width: '80%', margin: '0 auto', marginBottom: '12px' }}>
            <div>
              <Link to='/event' className="back-btns">
                <MdKeyboardBackspace />
              </Link>
            </div>
          </div>
        </div>
      </div>


    </>
  )
}

export default View