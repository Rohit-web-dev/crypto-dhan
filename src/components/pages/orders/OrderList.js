import React, { useState, useEffect } from 'react'
import { BiDotsVerticalRounded } from "react-icons/bi";
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useSelector } from 'react-redux';
import DataTable from 'react-data-table-component';





const OrderList = () => {


  const keys=['event','user_f_name','user_l_name','user_mobile','transaction_id']
  const ExpandedComponent = ({ data }) => <pre>{JSON.stringify(data, null, 2)}</pre>;
  const columns = [
    {
      name: 'User Name',
      selector: row => row.user_f_name+" "+ row.user_l_name,
      sortable: true,
    },
    {
      name: 'Phone',
      selector: row => row.user_mobile,
      sortable: true,
    },
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
      name: 'Ggoose Eggs',
      selector: row => row.event.goldengoose,
      sortable: true,
    },
    {
      name: 'Transaction Id',
      selector: row => row.transaction_id,
      sortable: true,
    },
    {
      name: 'Status',
      selector: row => row.status,
      sortable: true,
      cell: (e) => {
        return (
          <>
            {e.status == "S" ? (<div className='status-active'>
              Success
            </div>)
              : e.status == "F" ?
                (<div className='status-deactive'>Failed

                </div>)
                :
                (<div className='status-active'>
                  Passed
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
                <li><Link className="dropdown-item" to={"/order/view/" + e.id}>View</Link></li>
              </ul>
            </div>
          </>
        );
      },
    },

  ];


  const baseUrl = useSelector(state => state.baseUrlSlice.baseUrl);
  const [orderData, setOrderData] = useState([])
  const [search, setSearch] = useState('');

  async function get_Order() {
    var res = await axios.get(`${baseUrl}/order/all-orders`, {
      headers: {
        'Authorization': `Bearer ` + localStorage.getItem('token')
      }
    });
    // var data = await res.json()
    const data = res.data.data
    // console.log(data);
    setOrderData(res.data.data);
  }


  useEffect(() => {
    get_Order()
  }, [])




  const handleSearch = (event) => {
    setSearch(event.target.value);
  };



  return (
    <>
      <div className="table-heading">
        <div>
          <h4>All Order data</h4>
        </div>
        <div>
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
          // data={orderData}
          data={orderData.filter((item) => {
            if (search === "") {
              return item;
            } else if (
              // item.event.event_name.toLowerCase().includes(search.toLowerCase())
              keys.some((key)=>(item[key]?.toString()?.toLowerCase().includes(search)))
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

export default OrderList