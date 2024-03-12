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
import $ from "jquery";




const EventNameList = () => {


  const [eventName, setEventName] = useState()
  const [wallet, setWallet] = useState()

  const [eventNameEdit, setEventNameEdit] = useState()
  const [walletEdit, setWalletEdit] = useState()
  const [edit_id, setEdit_id] = useState()

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

  // const handleChange = (prop) => (event) => {
  //   const aaaa = dispatch(setAddEventSlice({ ...addEvent, [prop]: event.target.value }))
  // }

  const handleSubmit = async (event) => {
    event.preventDefault();
    var fd = new FormData;
    fd.append("name", eventName);
    fd.append("wallet", wallet);

    // console.log(Object.fromEntries(fd));
    return axios.post(`${baseUrl}/event-name-insert`, fd, {
      headers: {
        'Authorization': `Bearer ` + localStorage.getItem('token')
      }
    }).then((res) => {
      // console.log(res)
      if (res.data.code == "200") {
        toast.success(res.data.message);
        setEventName('')
        setWallet('')
        get_Events()
      } else {
        toast.error(res.data.message);
      }
    })
      .catch((err) => {
        console.log(err);
      });
  }











  const handleEdit = async (event) => {

    event.preventDefault();
    var fd = new FormData;
    fd.append("name", eventNameEdit);
    fd.append("wallet", walletEdit);
    fd.append("event_name_id", edit_id);

    // console.log(Object.fromEntries(fd));
    return axios.post(`${baseUrl}/event-name-update`, fd, {
      headers: {
        'Authorization': `Bearer ` + localStorage.getItem('token')
      }
    }).then((res) => {
      // console.log(res)
      if (res.data.code == "200") {
        toast.success(res.data.message);
        $('#addEvent').show()
        $('#editEvent').hide()
        get_Events()
      } else {
        toast.error(res.data.message);
      }
    })
      .catch((err) => {
        console.log(err);
      });
  }


























  const keys = ['name', 'wallet'];
  const today = new Date();
  // console.log(today)
  const ExpandedComponent = ({ data }) => <pre>{JSON.stringify(data, null, 2)}</pre>;
  const columns = [

    {
      name: 'Event Name',
      selector: row => row.name,
      sortable: true,
    },
    {
      name: 'Wallet',
      selector: row => row.wallet,
      sortable: true,
    },


    // {
    //   name: 'Status',
    //   sortable: true,
    //   selector: row => row.status,
    //   cell: (e) => {
    //     return (
    //       <>
    //         {today > new Date(e.event_date) ? (<div className='status-progress'> Passed</div>) :

    //           e.status == "A" ? (<div className='status-active'>
    //             Active
    //           </div>)
    //             : (<div className='status-deactive'>
    //               Deactive
    //             </div>)}
    //       </>
    //     );
    //   },
    // },

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
                <li><Link className="dropdown-item" onClick={(event) => {
                  // alert(e.name)
                  $('#addEvent').hide()
                  $('#editEvent').show()

                  setWalletEdit(e.wallet)
                  setEventNameEdit(e.name)
                  setEdit_id(e.id)

                }}>Edit</Link></li>
                <li><Link className="dropdown-item"
                  onClick={async () => {
                    if (window.confirm('Delete the item?')) {
                      var fd = new FormData;
                      fd.append('event_name_id', e.id)
                      return axios.post(`${baseUrl}/event-name-delete`, fd, {
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

  // -- get data -- 
  async function get_Events() {
    var res = await axios.get(`${baseUrl}/event-name-list`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ` + localStorage.getItem('token')
      }
    });
    // var data = await res.json()
    // console.log(res.data.data);
    setUserData(res.data.data);
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
      <div className="row" id='addEvent'>
        <div className="col-12">
          <div className="create">
            <div className="card-header view-header" >
              <h4>Create Event</h4>
            </div>
            <div className="card-body">
              <form onSubmit={handleSubmit} id="frm">

                <div className="mb-3">
                  <label htmlFor="event_name" className="form-label">Event Name</label>
                  <input type="text" name='event_name' value={eventName} onChange={(e) => setEventName(e.target.value)} className="form-control" id="event_name" />
                </div>
                <div className="mb-3">
                  <label htmlFor="wallet" className="form-label">Wallet</label>
                  <input type="text" name='wallet' value={wallet} onChange={(e) => setWallet(e.target.value)} className="form-control" id="wallet" />
                </div>
                <div className="add-event-btns">
                  <button type="submit" className="submit-event-btn">Add</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* -- update --  */}
      <div className="row" id='editEvent' style={{ display: 'none' }}>
        <div className="col-12">
          <div className="create">
            <div className="card-header view-header" >
              <h4>Edit Event</h4>
            </div>
            <div className="card-body">
              <form onSubmit={handleEdit} id="frm2">

                <div className="mb-3">
                  <label htmlFor="event_name" className="form-label">Event Name</label>
                  <input type="text" name='event_name' value={eventNameEdit} onChange={(e) => setEventNameEdit(e.target.value)} className="form-control" id="event_name_edit" />
                </div>
                <div className="mb-3">
                  <label htmlFor="wallet" className="form-label">Wallet</label>
                  <input type="text" name='wallet' value={walletEdit} onChange={(e) => setWalletEdit(e.target.value)} className="form-control" id="wallet_edit" />
                </div>
                <div className="add-event-btns">
                  <button type="submit" className="submit-event-btn">Edit</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>















      <div className="table-heading mb-0 mt-5 ml-5">
        <div>
          <h4>All Event data</h4>
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
                keys.some((key) => (item[key].toString().toLowerCase().includes(search)))
              ) {
                return item;
              }
            })}
            selectableRows
            expandableRowsComponent={ExpandedComponent}
            pagination
          />
        </div>
      </div>
    </>

  )
}

export default EventNameList