import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setAddEventSlice } from '../../../redux/slices/addSlice';
import { toast } from "react-toastify";
import axios from 'axios';
import { GrAdd } from "react-icons/gr";
import { AiOutlineMinus } from "react-icons/ai";
import { RxCross2 } from "react-icons/rx";
import $ from "jquery";
import validate from 'jquery-validation'
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { MdKeyboardBackspace } from "react-icons/md";
import { Editor } from '@tinymce/tinymce-react';

import EventNameList from './EventNameList';


const Add = () => {

  const baseUrl = useSelector(state => state.baseUrlSlice.baseUrl);
  const addEvent = useSelector(state => state.addSlice);
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [getEventName, setGetEventName] = useState([])
  const [event_unique_id, setEvent_unique_id] = useState()
  const [eventName, setEventName] = useState()

  const [gooldgooseCount, setGooldgooseCount] = useState(0)
  const [usdPrice, setUSDPrice] = useState()


  useEffect(() => {
    //validations
    $("#frm").validate({
      rules: {
        event_name: {
          required: true,
        },
        product_name: {
          required: true,
        },
        product_id: {
          required: true,
        },
        plateform_name: {
          required: true,
        },
        goldgoose: {
          required: true,
        },
        price: {
          required: true,
        },
        date: {
          required: true,
        },
        bitrix_product_id: {
          required: true,
        },
        bitrix_event_id: {
          required: true,
        },
      }
    });

  }, []);

  async function getLivePrice(){
    return new Promise((resolve, reject) => {
      var config = {
        method: 'get',
        url: 'https://api.coingecko.com/api/v3/simple/price?ids=GOLD8&vs_currencies=usd',
        headers: { 
          'accept': 'application/json'
        }
      };
      
      axios(config)
      .then(function (response) {
        resolve(response.data.gold8.usd)
      })
      .catch(function (error) {
        // console.log(error);
      });
    })

  }

  async function setEggs(value){
    setUSDPrice(value)
    let livePrice = await getLivePrice()
    let eggs = parseFloat(value) / parseFloat(livePrice)
    setGooldgooseCount(eggs)
  }


  async function get_Events() {
    var res = await axios.get(`${baseUrl}/event-name-list`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ` + localStorage.getItem('token')
      }
    });
    // var data = await res.json()
    // console.log(res.data.data);
    setGetEventName(res.data.data);
  }


  useEffect(() =>{
    // -- event name get -- 
    get_Events()
  },[])

  //for dynamic form
  const [dynmicdata, SetDynamicData] = useState([{
    key: '', value: '',
  }])

  const [forhtml, setforhtml] = useState()

  //dynamic  part
  const dynamicChangeInput = (index, event) => {
    const value = [...dynmicdata];
    value[index][event.target.name] = event.target.value;
    SetDynamicData(value);
  }

  const addfun = () => {
    SetDynamicData([...dynmicdata, { key: '', value: '' }]);
  }

  const removefun = (index) => {
    const value = [...dynmicdata];
    value.splice(index, 1);
    SetDynamicData(value);
  }

  // console.log(addEvent);

  const handleChange = (prop) => (event) => {
    const aaaa = dispatch(setAddEventSlice({ ...addEvent, [prop]: event.target.value }))
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    var fd = new FormData;
    // fd.append("event_name", addEvent.eventName);
    fd.append("event_name", eventName);
    fd.append("e_id", event_unique_id);
    fd.append("product_name", addEvent.product_name);
    fd.append("product_id", addEvent.product_id);
    fd.append("bitrix_event_id", addEvent.bitrix_event_id);
    fd.append("bitrix_product_id", addEvent.bitrix_product_id);
    fd.append("platform_name", addEvent.plateformName);
    fd.append("desc", addEvent.desc);
    fd.append("event_html", forhtml);
    fd.append("goldengoose", gooldgooseCount);
    fd.append("price", usdPrice);
    fd.append("event_date", addEvent.event_date);
    fd.append("dynamicdata", JSON.stringify(dynmicdata));
    // console.log(Object.fromEntries(fd));
    return axios.post(`${baseUrl}/event-insert`, fd, {
      headers: {
        'Authorization': `Bearer ` + localStorage.getItem('token')
      }
    }).then((res) => {
      // console.log(res)
      if (res.data.code == "200") {
        toast.success(res.data.message);
        dispatch(setAddEventSlice(''))
        navigate('/event')
      } else {
        toast.error(res.data.message);
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
          <div className="create">
            <div className="card-header view-header" >
              <h4>Create Ticket</h4>
            </div>
            <div className="card-body">
              <form onSubmit={handleSubmit} id="frm">
              <div className="mb-3">
                  <label htmlFor="product_name" className="form-label">Product Name</label>
                  <input type="text" name='product_name' value={addEvent.product_name} onChange={handleChange('product_name')} className="form-control" id="product_name" />
                </div>
                <div className="mb-3">
                  <label htmlFor="product_id" className="form-label">Product id</label>
                  <input type="text" name='product_id' value={addEvent.product_id} onChange={handleChange('product_id')} className="form-control" id="product_id" />
                </div>

                <div className="mb-3">
                  <label htmlFor="bitrix_event_id" className="form-label">bitrix event id </label>
                  <input type="text" name='bitrix_event_id' value={addEvent.bitrix_event_id} onChange={handleChange('bitrix_event_id')} className="form-control" id="bitrix_event_id" />
                </div>

                <div className="mb-3">
                  <label htmlFor="bitrix_product_id" className="form-label">bitrix product id</label>
                  <input type="text" name='bitrix_product_id' value={addEvent.bitrix_product_id} onChange={handleChange('bitrix_product_id')} className="form-control" id="bitrix_product_id" />
                </div>

                <div className="mb-3">
                      <label htmlFor="getEventName" className="form-label">Event Name</label>
                      <select name='getEventName'
                        // onChange={
                        //   handleChange('eventName')
                        //   } 
                        onChange={async (event) => {
                          // handleChange('eventName');
                          var name=event.target.value;
                          var spl=name.split('-');
                          setEventName(spl[0])
                          setEvent_unique_id(spl[1])
                          // console.log(spl)
                          }}
                          class="form-select" aria-label="Default select example">
                        <option value={''}>Select</option>
                        {
                          getEventName.map((e) => (
                            <option  value={e.name+"-"+e.id}>{e.name}</option>
                          ))
                        }
                      </select>
                    </div>
                {/* <div className="mb-3">
                  <label htmlFor="event_name" className="form-label">Event Name</label>
                  <input type="text" name='event_name' value={addEvent.eventName} onChange={handleChange('eventName')} className="form-control" id="event_name" />
                </div> */}
                <div className="mb-3">
                  <label htmlFor="plateform_name" className="form-label">Plateform Name</label>
                  <input type="text" name='plateform_name' value={addEvent.plateformName} onChange={handleChange('plateformName')} className="form-control" id="plateform_name" />
                </div>
                
                <div className="mb-3">
                  <label htmlFor="price" className="form-label">Price</label>
                  <input type="number" name='price' value={usdPrice}  onChange={e => {
                    setEggs(e.target.value)
                  }}  className="form-control" id="price" />
                </div>
                <div className="mb-3">
                  <label htmlFor="goldgoose" className="form-label">Ggoose Eggs</label>
                  <input type="number" name='goldgoose' value={gooldgooseCount} className="form-control" id="goldgoose" readOnly={true} />
                </div>
                <div className="mb-3">
                  <label htmlFor="date" className="form-label">Event Date</label>
                  <input type="date" name='date' value={addEvent.event_date} onChange={handleChange('event_date')} className="form-control" id="date" />
                </div>
                <div className="mb-3">
                  <label htmlFor="desc" className="form-label">Desc</label>
                  <textarea value={addEvent.desc} onChange={handleChange('desc')} className="form-control" id="desc"></textarea>
                </div>
                <div className="mb-3">
                  <label className="form-label">What's Included</label>
                  <Editor
                    //  onInit={(evt, editor) => editorRef.current = editor}
                    initialValue="<p>Write your content here</p>"
                    init={{
                      height: 500,
                      menubar: false,
                      valid_children : '+body[style]',
                      plugins: [
                        'code',
                        'advlist autolink lists link image charmap print preview anchor',
                        'searchreplace visualblocks code fullscreen',
                        'insertdatetime media table paste code help wordcount'
                      ],
                   toolbar:'code | insertfile undo redo | styleselect | fontselect | fontsizeselect | forecolor backcolor | bold italic underline | superscript subscript | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | image | table tabledelete | tableprops tablerowprops tablecellprops | tableinsertrowbefore tableinsertrowafter tabledeleterow | tableinsertcolbefore tableinsertcolafter tabledeletecol',
                      content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
                    }}
                    onEditorChange={(newtext) => { setforhtml(newtext) }}
                  />
                </div>








                <div className="mb-3">
                  <label className="form-label">Dynamic Data</label>
                  {dynmicdata.map((data, index) => (

                    <div key={index} className="dynamic-data">
                      <div>
                        <input type="text" name="key" value={data.key} onChange={event => dynamicChangeInput(index, event)} placeholder="Key"
                          className="form-control"
                        />
                      </div>
                      <div>
                        <input type="text" name="value" value={data.value} onChange={event => dynamicChangeInput(index, event)} placeholder="Value"
                          className="form-control"
                        />
                      </div>


                      {/* add icon with condition start*/}
                      {dynmicdata.length < 2 ? (<>

                        <span onClick={() => addfun()}
                          className="dynamic-btn"> <GrAdd /> </span>
                        {/* <span onClick={()=>removefun(index)}>  -  </span> */}

                      </>)
                        :
                        (<div className='dynamic-data-btn'>

                          <span onClick={() => addfun()}
                            className="dynamic-btn">  <GrAdd />  </span>
                          <span onClick={() => removefun(index)}
                            className="dynamic-btn">  <AiOutlineMinus />  </span>

                        </div>)}
                      {/* add icon with condition end */}

                    </div>
                  ))}

                </div>




                <div className="add-event-btns">
                  <Link to='/event' className='cancle-btn'>Cancle</Link>
                  <button type="submit" className="submit-event-btn">Add</button>
                </div>
              </form>
            </div>
          </div>
        </div>
        <div className="col-2">
          <div className="table-heading" style={{display: 'flex', gap: '7px', justifyContent: 'flex-start'}}>
            {/* <div>
              <h4>Create Event</h4>
            </div> */}
            <div>
              <Link to='/event' className="back-btns">
                <MdKeyboardBackspace />
              </Link>
            </div>
            <div>

              {/* <button type="button" className="back-btns" data-bs-toggle="modal" data-bs-target="#exampleModal">
                Create Event
              </button> */}

            </div>
          </div>
        </div>
      </div>


      {/* -- modal --  */}
      <div className="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">Create Event Name</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal"><RxCross2 /></button>
            </div>
            <div className="modal-body">
             <EventNameList />
            </div>
            {/* <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <button type="button" className="btn btn-primary">Save changes</button>
            </div> */}
          </div>
        </div>
      </div>

    </>
  )
}

export default Add