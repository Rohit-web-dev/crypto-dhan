import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from "react-toastify";
import axios from 'axios';
import { GrAdd } from "react-icons/gr";
import { AiOutlineMinus } from "react-icons/ai";
import $ from "jquery";
import validate from 'jquery-validation'
import { useNavigate, useParams } from 'react-router';
import { Link } from 'react-router-dom';
import { MdKeyboardBackspace } from "react-icons/md";
import { Editor } from '@tinymce/tinymce-react';


const Update = () => {

  const baseUrl = useSelector(state => state.baseUrlSlice.baseUrl);
  const addEvent = useSelector(state => state.addSlice);
  const dispatch = useDispatch()
  const param = useParams()
  const navigate = useNavigate()

  const [eventName, setEventName] = useState()
  const [platformName, setPlatformName] = useState()
  const [goldgoose, setGoldgoose] = useState()
  const [price, setPrice] = useState()
  const [date, setDate] = useState()
  const [desc, setDesc] = useState()
  const [forhtml, setforhtml] = useState()
  const [product_name, setProduct_name] = useState()
  const [product_id, setProduct_id] = useState()
  const [e_id, setE_id] = useState()
  const [bitrix_product_id, setbitrix_product_id] = useState()
  const [bitrix_event_id, setbitrix_event_id] = useState()

  const [event_unique_id, setEvent_unique_id] = useState()
  const [getEventName, setGetEventName] = useState([])
  // const [eventName, setEventName] = useState()

  
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
        console.log(error);
      });
    })

  }

  async function setEggs(value){
    setPrice(value)
    let livePrice = await getLivePrice()
    let eggs = parseFloat(value) / parseFloat(livePrice)
    setGoldgoose(eggs)
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

  const addfun = () => {
    SetDynamicData([...dynmicdata, { key: '', value: '' }]);
  }

  const removefun = (index) => {
    const value = [...dynmicdata];
    value.splice(index, 1);
    SetDynamicData(value);
  }

  // console.log(addEvent);






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
        toast.success(res.data.message);
        setEventName(res.data.data.event_name)
        setPlatformName(res.data.data.platform_name)
        setGoldgoose(res.data.data.goldengoose)
        setPrice(res.data.data.price)
        setDate(res.data.data.event_date)
        setDesc(res.data.data.desc)
        setforhtml(res.data.data.event_html)
        setProduct_name(res.data.data.product_name)
        setProduct_id(res.data.data.product_id)
        setE_id(res.data.data.e_id)
        setEvent_unique_id(res.data.data.e_id)
        setbitrix_event_id(res.data.data.bitrix_event_id)
        setbitrix_product_id(res.data.data.bitrix_product_id)
      } else {
        toast.error(res.data.message);
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
        toast.success(res.data.message);
        SetDynamicData(res.data.data)
      } else {
        toast.error(res.data.message);
        SetDynamicData([{ 'key_name': '', value: '' }])
      }
    })
      .catch((err) => {
        console.log(err);
      });
  }





  const handleSubmit = async (event) => {
    event.preventDefault();
    var fd = new FormData;
    fd.append("event_id", param.id);
    fd.append("event_name", eventName);
    fd.append("e_id", event_unique_id);
    fd.append("product_name", product_name);
    fd.append("product_id", product_id);
    fd.append("bitrix_event_id", bitrix_event_id);
    fd.append("bitrix_product_id", bitrix_product_id);
    fd.append("platform_name", platformName);
    fd.append("desc", desc);
    fd.append("event_html", forhtml);
    fd.append("goldengoose", goldgoose);
    fd.append("price", price);
    fd.append("event_date", date);
    fd.append("dynamicdata", JSON.stringify(dynmicdata));
    // console.log(Object.fromEntries(fd));
    // return false;
    return axios.post(`${baseUrl}/event-update`, fd, {
      headers: {
        'Authorization': `Bearer ` + localStorage.getItem('token')
      }
    }).then((res) => {
      // alert("ok")
      // console.log(res)
      // return false
      if (res.data.code == "200") {
        toast.success(res.data.message);
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
            <div class="card-header view-header" >
              <h4>Edit Ticket</h4>
            </div>
            <div className="card-body">
              <form onSubmit={handleSubmit} id="frm">

                <div className="mb-3">
                  <label htmlFor="product_name" className="form-label">Product Name</label>
                  <input type="text" name='product_name' value={product_name} onChange={(e) => setProduct_name(e.target.value)} className="form-control" id="product_name" />
                </div>
                <div className="mb-3">
                  <label htmlFor="product_id" className="form-label">Product id</label>
                  <input type="text" name='product_id' value={product_id} onChange={(e) => setProduct_id(e.target.value)} className="form-control" id="product_id" />
                </div>

                <div className="mb-3">
                  <label htmlFor="bitrix_event_id" className="form-label">Bitrix event id</label>
                  <input type="text" name='bitrix_event_id' value={bitrix_event_id} onChange={(e) => setbitrix_event_id(e.target.value)} className="form-control" id="bitrix_event_id" />
                </div>

                <div className="mb-3">
                  <label htmlFor="bitrix_product_id" className="form-label">Bitrix product id</label>
                  <input type="text" name='bitrix_product_id' value={bitrix_product_id} onChange={(e) => setbitrix_product_id(e.target.value)} className="form-control" id="bitrix_product_id" />
                </div>

                <div className="mb-3">
                  <label htmlFor="getEventName" className="form-label">Event Name</label>
                  <select name='getEventName'
                    // onChange={
                    //   handleChange('eventName')
                    //   } 
                    onChange={async (event) => {
                      // handleChange('eventName');
                      var name = event.target.value;
                      var spl = name.split('-');
                      setEventName(spl[0])
                      setEvent_unique_id(spl[1])
                      // console.log("spl",spl)
                    }}
                    class="form-select" aria-label="Default select example">
                    <option value={''}>Select</option>
                    {
                      getEventName.map((e) => (
                        <option value={e.name + "-" + e.id} selected={e.id == e_id ? 'selected' : ''} >{e.name}</option>
                      ))
                    } 
                  </select>
                </div>

                {/* <div className="mb-3">
                  <label htmlFor="event_name" className="form-label">Event Name</label>
                  <input type="text" name='event_name' value={eventName} onChange={(e) => setEventName(e.target.value)} className="form-control" id="event_name" />
                </div> */}
                <div className="mb-3">
                  <label htmlFor="plateform_name" className="form-label">Plateform Name</label>
                  <input type="text" value={platformName} onChange={(e) => setPlatformName(e.target.value)} className="form-control" id="plateform_name" />
                </div>
                
                <div className="mb-3">
                  <label htmlFor="price" className="form-label">Price</label>
                  <input type="number" value={price} onChange={(e) => setEggs(e.target.value)} className="form-control" id="price" />
                </div>
                <div className="mb-3">
                  <label htmlFor="goldgoose" className="form-label">Ggoose Eggs</label>
                  <input type="number" value={goldgoose} className="form-control" id="goldgoose" readOnly={true}/>
                </div>
                <div className="mb-3">
                  <label htmlFor="date" className="form-label">Event Date</label>
                  <input type="date" name='date' value={date} onChange={(e) => setDate(e.target.value)} className="form-control" id="date" />
                </div>
                <div className="mb-3">
                  <label htmlFor="desc" className="form-label">Desc</label>
                  <textarea value={desc} onChange={(e) => setDesc(e.target.value)} className="form-control" id="desc"></textarea>
                </div>

                <div className="mb-3">
                  <label className="form-label">What's Included</label>
                  <Editor
                    //  onInit={(evt, editor) => editorRef.current = editor}
                    // initialValue="<p>Write your content here</p>"
                    value={forhtml}
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
                  <label className="form-label">Dynamic Data/{dynmicdata.length}</label>
                  {dynmicdata.map((data, index) => (

                    <div key={index} className="dynamic-data">
                      <div>
                        <input type="text" name="key_name" value={data.key_name} onChange={event => dynamicChangeInput(index, event)} placeholder="Key"
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
                  <button type="submit" className="submit-event-btn">Update</button>
                </div>
              </form>
            </div>
          </div>
        </div>
        <div className="col-2">
          <div className="table-heading" style={{ width: '80%', margin: '0 auto', marginBottom: '12px' }}>
            {/* <div>
              <h4>Edit Event</h4>
            </div> */}
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

export default Update