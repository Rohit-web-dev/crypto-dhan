import React, { useState, useEffect } from 'react'
import { BiDotsVerticalRounded } from "react-icons/bi";
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { MdKeyboardBackspace } from "react-icons/md";
import DataTable from 'react-data-table-component';


const EventPurchased = () => {


  const keys=['event_name','event_date','purchase_count'];

  const ExpandedComponent = ({ data }) => <pre>{JSON.stringify(data, null, 2)}</pre>;
  const columns = [
    {
      name: 'Event Name',
      selector: row => row.event_name,
      sortable: true,
    },
    {
      name: 'product Name',
      selector: row => row.product_name,
      sortable: true,
    },
    {
      name: 'product Id',
      selector: row => row.product_id,
      sortable: true,
    },
    {
      name: 'Event Date',
      selector: row => row.event_date,
      sortable: true,
    },
    {
      name: 'Total Purchase',
      selector: row => row.purchase_count      ,
      sortable: true,
    },
    {
      name: 'Status',
      selector: row => row.status,
      sortable: true,
      cell: (e) => {
        return (
          <>
            {today>new Date(e.event_date) ? (<div className='status-progress'> Passed</div>):
            
              e.status == "A" ? (<div className='status-active'>
              Active
            </div>)
              : (<div className='status-deactive'>
                Deactive
              </div>)}
          </>
        );
      },
    },
    {
      name: "Action",
      key: "action",
      text: "Action",
      className: "action",
      width: 100,
      align: "left",
      sortable: false,
      cell: (e) => {
        return (
          <>
            <div className="dropdown">
              <button className="" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                <BiDotsVerticalRounded />
              </button>
              <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                <li><Link className="dropdown-item" to={"/event-report/view/" + e.id}>View</Link></li>
              </ul>
            </div>
          </>
        );
      },
    },
    

  ];


  const baseUrl = useSelector(state => state.baseUrlSlice.baseUrl);
  const [eventPurchaseData, setEventPurchaseData] = useState([])
  const [search, setSearch] = useState('');
  const [allData, setAllData] = useState([]);
  var date=new Date();
  var adt=date.setDate(date.getDate() - 1);
  var today=new Date(adt);

  async function get_EventPurchase() {
    var res = await axios.get(`${baseUrl}/order/event-order-count`, {
      headers: {
        'Authorization': `Bearer ` + localStorage.getItem('token')
      }
    });

    // console.log(res.data.data);
    var datas=res.data.data;
    const filtered = datas.filter(data => {
      // console.log(data)
      return data.purchase_count >0;
    });
   
    setEventPurchaseData(datas);
  }



  useEffect(() => {
    get_EventPurchase()
  }, [])


  const handleSearch = (event) => {
    setSearch(event.target.value);
  };



  return (
    <>
    <div className="table-heading">
      <div>
        <h4>All event purchase data</h4>
      </div>
      <div>
        {/* <Link to='/event-report' className="back-btns">
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
        // data={eventPurchaseData}
        data={eventPurchaseData.filter((item) => {
          if (search === "") {
            return item;
          } else if (
            // item.event_name.toLowerCase().includes(search.toLowerCase())
            keys.some((key)=>(item[key].toString().toLowerCase().includes(search)))
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
    // <>
    //   <div className="table-heading">
    //     <div>
    //       <h4>Event Purchase</h4>
    //     </div>
    //     <div>
    //     </div>
    //   </div>
    //   <div className='purchase-card'>
    //     <div className="row m-0">
    //       {
    //         eventPurchaseData.map((e) => (
    //           <> {e.purchase_count > 0 && e.status!="D" ? (<>
    //             <div className="col-md-4 col-12 my-3" key={e.id}>
    //               <div className="card">
    //                 <div className="card-body">
    //                   <h5 className="card-title"><p>Event Name:</p>&nbsp;{e.event_name}</h5>
    //                   <h5 className="card-text mb-2 d-flex"><p>Event Date:</p>&nbsp;{e.event_date}</h5>
    //                   <p className="card-text mb-2 d-flex">Event Status: &nbsp;
    //                     <b>
    //                       {today> new Date(e.event_date) ? (<> passed </>)
    //                       :
    //                         e.status == "A" ? (<div className='status-active'>
    //                         Active
    //                       </div>)
    //                         : e.status == "I" ?
    //                           (<div className='status-progress'>
    //                             Deactive
    //                           </div>)
    //                           :
    //                           (<div className='status-deactive'>
    //                             Delete
    //                           </div>)}
    //                     </b>
    //                   </p>
    //                   <p className="card-text mb-4">Purchase Count: <b>{e.purchase_count}</b></p>
    //                   <Link to={"/event-report/view/" + e.id} className="event-purchase-view-btns">View Details</Link>
    //                 </div>
    //               </div>
    //             </div>
    //           </>) : (<></>)}

    //           </>
    //         ))
    //       }
    //     </div>

    //   </div>
    // </>
  )
}

export default EventPurchased