import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { MdKeyboardBackspace } from "react-icons/md";
import DataTable from 'react-data-table-component';


const EventPurchaseView = () => {


  const keys = ['user_name', 'user_mobile', 'event'];

  const ExpandedComponent = ({ data }) => <pre>{JSON.stringify(data, null, 2)}</pre>;
  const columns = [
    {
      name: 'Event Name',
      selector: row => row.event.event_name,
      sortable: true,
    },
    {
      name: 'product Name',
      selector: row => row.event.product_name,
      sortable: true,
    },
    {
      name: 'product Id',
      selector: row => row.event.product_id,
      sortable: true,
    },
    {
      name: 'User Name',
      selector: row => row.user_f_name + " " + row.user_l_name,
      sortable: true,
    },
    {
      name: 'Phone',
      selector: row => row.user_mobile,
      sortable: true,
    },
    {
      name: 'total purchase ticket',
      selector: row => row.total_purchase_event_ticket,
      sortable: true,
    },
    {
      name: 'total Ggoose Eggs',
      selector: row => row.amount,
      sortable: true,
    },
    {
      name: 'Base Ggoose Eggs',
      selector: row => row.event.price,
      sortable: true,
    },
    {
      name: 'Status',
      selector: row => 'success',
      sortable: true,
    },
    {
      name: 'Transaction Id',
      selector: row => row.transaction_id,
      sortable: true,
    },

  ];





  const baseUrl = useSelector(state => state.baseUrlSlice.baseUrl);
  const param = useParams()
  const [list, setList] = useState([])
  const [search, setSearch] = useState('');
  const [eventName, setEventName] = useState()
  const [platformName, setPlatformName] = useState()
  const [goldgoose, setGoldgoose] = useState()
  const [price, setPrice] = useState()
  const [desc, setDesc] = useState()
  const [eventDate, seteventDate] = useState()
  const [eventCreated, seteventCreated] = useState()
  const [productname, setproductname] = useState()
  const [productId, setproductId] = useState()
  const [bitrix_product_id, setBitrix_product_id] = useState()
  const [bitrix_event_id, setbitrix_event_id] = useState()


  //for dynamic form
  const [dynmicdata, SetDynamicData] = useState([])

  //dynamic  part
  const dynamicChangeInput = (index, event) => {
    const value = [...dynmicdata];
    value[index][event.target.name] = event.target.value;
    SetDynamicData(value);
  }


  // -- get single order data -- 
  async function getOrderSingleData() {
    // return false
    var fd = new FormData;
    // return false
    fd.append("event_id", param.id);
    return axios.post(`${baseUrl}/order/get-users-under-single-event`, fd, {
      headers: {
        'Authorization': `Bearer ` + localStorage.getItem('token')
      }
    }).then((res) => {
      // console.log(res)
      if (res.data.code == "200") {
        // toast.success(res.data.message);
        setList(res.data.data)
      } else {
        // toast.error(res.data.message);
      }
    })
      .catch((err) => {
        console.log(err);
      });
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
        setEventName(res.data.data.event_name)
        setPlatformName(res.data.data.platform_name)
        setGoldgoose(res.data.data.goldengoose)
        setPrice(res.data.data.price)
        setDesc(res.data.data.desc)
        seteventCreated(res.data.data.created_at)
        seteventDate(res.data.data.event_date)
        setproductId(res.data.data.product_name)
        setproductname(res.data.data.product_id)
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


  useEffect(() => {
    getOrderSingleData()
    getEventSingleData()
    getDynamicData()
  }, [])


  const handleSearch = (event) => {
    setSearch(event.target.value);
  };


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
                        <th>Title</th>
                        <td>: {e.key_name}</td>
                      </tr>
                      <tr key={e.id}>
                        <th>Body Text</th>
                        <td>: {e.value}</td>
                      </tr>
                    </>
                  ))
                }

              </table>
              {/* {
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
          } */}
            </div>
          </div>
        </div>
        <div className="col-2">
          <div className="table-heading" style={{ width: '98%', margin: '0 auto', marginBottom: '12px' }}>
            <div>
              <Link to='/event-purchase' className="back-btns">
                <MdKeyboardBackspace />
              </Link>
            </div>
          </div>
        </div>
      </div>








      <div className="table-heading mt-5">
        <div>
          <h4>All event purchase data</h4>
        </div>
        <div>
          {/* <Link to='/event-purchase' className="back-btns">
            <MdKeyboardBackspace />
          </Link> */}
        </div>
      </div>
      <div className="new-page-add">
        <div className='listing'>
          <label htmlFor="search" className='data-search'>
            Search by Task:
            <input id="search" className="form-control" type="text" onChange={handleSearch} />
          </label>
          <DataTable
            columns={columns}
            // data={list}
            data={list.filter((item) => {
              if (search === "") {
                return item;
              } else if (
                // console.log(item)
                // item.event.event_name.toLowerCase().includes(search.toLowerCase())
                // keys.some((key)=>(console.log(item[key])))
                keys.some((key) => (item[key].toString().toLowerCase().includes(search)))
              ) {
                return item;
              }
            })}
            selectableRows
            expandableRowsComponent={ExpandedComponent}
          // pagination
          />
        </div>
      </div>
    </>
  )
}

export default EventPurchaseView