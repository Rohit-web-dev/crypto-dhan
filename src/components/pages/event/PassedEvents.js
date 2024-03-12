import React, { useState, useEffect } from 'react'
import { MdModeEditOutline } from "react-icons/md";
import { AiFillEye } from "react-icons/ai";
import { BsFillTrashFill } from "react-icons/bs";
import { BiDotsVerticalRounded } from "react-icons/bi";
import { GrAdd } from "react-icons/gr";
import axios from 'axios';
import { useSelector } from 'react-redux';
import Add from './Add';
import { Link } from 'react-router-dom';
import { toast } from "react-toastify";
import DataTable from 'react-data-table-component';




const PassedEvents = () => {

  const keys = ['product_name', 'platform_name', 'goldengoose'];
  var date=new Date();
  var adt=date.setDate(date.getDate() - 1);
  var today=new Date(adt);
  // console.log(today)
  const ExpandedComponent = ({ data }) => <pre>{JSON.stringify(data, null, 2)}</pre>;
  const columns = [
    {
      name: 'Product Name',
      selector: row => row.product_name,
      sortable: true,
    },
    {
      name: 'Event Name',
      selector: row => row.event_names?.name,
      sortable: true,
    },
    {
      name: 'Platform Name',
      selector: row => row.platform_name,
      sortable: true,
    },
    {
      name: 'Event Date',
      selector: row => row.event_date,
      sortable: true,
    },
    {
      name: 'Ggoose Eggs',
      selector: row => row.goldengoose,
      sortable: true,
    },
    {
      name: "Link",
      key: "action",
      text: "Action",
      className: "action",
      width: 100,
      align: "left",
      sortable: true,
      selector: row => row.slug,
      cell: (e) => {
        return (
          <>
            {origin + '/events'}/{e.slug}
          </>
        );
      },
    },
    {
      name: 'Status',
      sortable: true,
      selector: row => row.status,
      cell: (e) => {
        return (
          <>
            {today > new Date(e.event_date) ? (<div className='status-progress'> Passed</div>) :

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
                <li><Link className="dropdown-item" to={"/event/edit/" + e.id}>Edit</Link></li>
                <li><Link className="dropdown-item" to={"/event/view/" + e.id}>View</Link></li>
                <li><Link className="dropdown-item"
                  onClick={async () => {
                    if (window.confirm('Delete the item?')) {
                      var fd = new FormData;
                      fd.append('event_id', e.id)
                      return axios.post(`${baseUrl}/event-delete`, fd, {
                        headers: {
                          'Authorization': `Bearer ` + localStorage.getItem('token')
                        }
                      }).then((res) => {
                        // console.log(res)
                        if (res.data.code == "200") {
                          toast.success(res.data.message);
                          get_Events()
                        } else {
                          toast.error(res.data.message);
                        }
                      })
                        .catch((err) => {
                          console.log(err);
                        });
                    }
                  }}
                >Delete</Link></li>
                {e.status == "A" ? (<>
                  <li><Link className="dropdown-item" onClick={() => inactive(e.id)}>Inactive</Link></li>

                </>)
                  : (<>
                    <li><Link className="dropdown-item" onClick={() => active(e.id)}>Active</Link></li>
                  </>)}


              </ul>
            </div>
          </>
        );
      },
    },

  ];





  const baseUrl = useSelector(state => state.baseUrlSlice.baseUrl);
  const [search, setSearch] = useState(''); //2
  const [userData, setUserData] = useState([])
  const [url, setUrl] = useState(window.location.href)
  // console.log(url)
  const [origin, setOrigin] = useState(window.location.origin)

  // -- get data -- 
  async function get_Events() {
    var res = await axios.get(`${baseUrl}/event-list`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ` + localStorage.getItem('token')
      }
    });
    // var data = await res.json()
    var f=res.data.data;
    var filterData=f.filter((item) => {
     return today > new Date(item.event_date)

    });
    // console.log(filterData);
    setUserData(filterData);
  }

  useEffect(() => {
    get_Events()
  }, [])


  async function inactive(id) {
    if (window.confirm('Inactive the item?')) {
      var fd = new FormData;
      fd.append('event_id', id)
      return axios.post(`${baseUrl}/event-deactive`, fd, {
        headers: {
          'Authorization': `Bearer ` + localStorage.getItem('token')
        }
      }).then((res) => {
        // console.log(res)
        if (res.data.code == "200") {
          toast.success(res.data.message);
          get_Events()
        } else {
          toast.error(res.data.message);
        }
      })
        .catch((err) => {
          console.log(err);
        });
    }
  }

  async function active(id) {
    if (window.confirm('Active the item?')) {
      var fd = new FormData;
      fd.append('event_id', id)
      return axios.post(`${baseUrl}/event-active`, fd, {
        headers: {
          'Authorization': `Bearer ` + localStorage.getItem('token')
        }
      }).then((res) => {
        // console.log(res)
        if (res.data.code == "200") {
          toast.success(res.data.message);
          get_Events()
        } else {
          toast.error(res.data.message);
        }
      })
        .catch((err) => {
          console.log(err);
        });
    }
  }


  const handleSearch = (event) => {
    setSearch(event.target.value);
  };


  // console.log(userData);



  return (
    <>
      <div className="table-heading">
        <div>
          <h4>All Passed Event data</h4>
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
            data={userData.filter((item) => {
              if (search === "") {
                return item;
              } else if (
                //item[key].toLowerCase().includes(search)
                // item.event_name.toLowerCase().includes(search.toLowerCase())
                keys.some((key) => (item[key]?.toString()?.toLowerCase()?.includes(search)))
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

export default PassedEvents