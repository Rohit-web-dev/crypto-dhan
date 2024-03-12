import React, { useEffect, useState } from 'react'
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { toast } from "react-toastify";
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { MdKeyboardBackspace } from "react-icons/md";
import $ from "jquery";
import validate from 'jquery-validation'
import swal from "sweetalert";
import Web3 from "web3";
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css
import { nanoid } from '@reduxjs/toolkit';

const BigNumber = require("bignumber.js");

const web3 = new Web3(Web3.givenProvider);


const Purchase = () => {


  const baseUrl = useSelector(state => state.baseUrlSlice.baseUrl);
  const param = useParams()
  const Navigate = useNavigate()
  // -- for form -- 
  const [userName, setUserName] = useState()
  const [email, setEmail] = useState()
  const [mobile, setMobile] = useState()
  const [address, setAddress] = useState()
  const [address2, setAddress2] = useState()

  // -- for listing -- 
  const [eventName, setEventName] = useState()
  const [platformName, setPlatformName] = useState()
  const [goldgoose, setGoldgoose] = useState()
  const [date, setDate] = useState()
  const [price, setPrice] = useState()
  const [desc, setDesc] = useState()
  const [id, setId] = useState()
  const [lastName, setLastName] = useState('')
  const [businessName, setBusinessName] = useState()
  const [state, setState] = useState()
  const [zip, setZip] = useState()
  const [city, setCity] = useState()
  const [state2, setState2] = useState()
  const [zip2, setZip2] = useState()
  const [city2, setCity2] = useState()
  const [count, setCount] = useState(1)
  const [country, setCountry] = useState([])
  const [transaction_id, setTransactionId] = useState()
  const [user_address, setUserAddress] = useState()
  const [countryBack, setCountryBack] = useState()
  const [countryBack2, setCountryBack2] = useState()
  const [amount, setAmount] = useState()
  const [forhtml, setforhtml] = useState()
  const [dynmicdata, SetDynamicData] = useState([])
  const [goldgoosePrice, setGoldgoosePrice] = useState()




  const [productname, setproductname] = useState()
  const [productId, setproductId] = useState()
  const [bitrix_product_id, setBitrix_product_id] = useState()
  const [bitrix_event_id, setbitrix_event_id] = useState()

  const contract_abi = [
    {
      inputs: [
        {
          internalType: "uint256",
          name: "cap",
          type: "uint256",
        },
        {
          internalType: "uint256",
          name: "reward",
          type: "uint256",
        },
      ],
      stateMutability: "nonpayable",
      type: "constructor",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: "address",
          name: "owner",
          type: "address",
        },
        {
          indexed: true,
          internalType: "address",
          name: "spender",
          type: "address",
        },
        {
          indexed: false,
          internalType: "uint256",
          name: "value",
          type: "uint256",
        },
      ],
      name: "Approval",
      type: "event",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "spender",
          type: "address",
        },
        {
          internalType: "uint256",
          name: "amount",
          type: "uint256",
        },
      ],
      name: "approve",
      outputs: [
        {
          internalType: "bool",
          name: "",
          type: "bool",
        },
      ],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "uint256",
          name: "amount",
          type: "uint256",
        },
      ],
      name: "burn",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "account",
          type: "address",
        },
        {
          internalType: "uint256",
          name: "amount",
          type: "uint256",
        },
      ],
      name: "burnFrom",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "spender",
          type: "address",
        },
        {
          internalType: "uint256",
          name: "subtractedValue",
          type: "uint256",
        },
      ],
      name: "decreaseAllowance",
      outputs: [
        {
          internalType: "bool",
          name: "",
          type: "bool",
        },
      ],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [],
      name: "destroy",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "spender",
          type: "address",
        },
        {
          internalType: "uint256",
          name: "addedValue",
          type: "uint256",
        },
      ],
      name: "increaseAllowance",
      outputs: [
        {
          internalType: "bool",
          name: "",
          type: "bool",
        },
      ],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "uint256",
          name: "reward",
          type: "uint256",
        },
      ],
      name: "setBlockReward",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "to",
          type: "address",
        },
        {
          internalType: "uint256",
          name: "amount",
          type: "uint256",
        },
      ],
      name: "transfer",
      outputs: [
        {
          internalType: "bool",
          name: "",
          type: "bool",
        },
      ],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: "address",
          name: "from",
          type: "address",
        },
        {
          indexed: true,
          internalType: "address",
          name: "to",
          type: "address",
        },
        {
          indexed: false,
          internalType: "uint256",
          name: "value",
          type: "uint256",
        },
      ],
      name: "Transfer",
      type: "event",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "from",
          type: "address",
        },
        {
          internalType: "address",
          name: "to",
          type: "address",
        },
        {
          internalType: "uint256",
          name: "amount",
          type: "uint256",
        },
      ],
      name: "transferFrom",
      outputs: [
        {
          internalType: "bool",
          name: "",
          type: "bool",
        },
      ],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "owner",
          type: "address",
        },
        {
          internalType: "address",
          name: "spender",
          type: "address",
        },
      ],
      name: "allowance",
      outputs: [
        {
          internalType: "uint256",
          name: "",
          type: "uint256",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "account",
          type: "address",
        },
      ],
      name: "balanceOf",
      outputs: [
        {
          internalType: "uint256",
          name: "",
          type: "uint256",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "blockReward",
      outputs: [
        {
          internalType: "uint256",
          name: "",
          type: "uint256",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "cap",
      outputs: [
        {
          internalType: "uint256",
          name: "",
          type: "uint256",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "decimals",
      outputs: [
        {
          internalType: "uint8",
          name: "",
          type: "uint8",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "name",
      outputs: [
        {
          internalType: "string",
          name: "",
          type: "string",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "owner",
      outputs: [
        {
          internalType: "address payable",
          name: "",
          type: "address",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "symbol",
      outputs: [
        {
          internalType: "string",
          name: "",
          type: "string",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "totalSupply",
      outputs: [
        {
          internalType: "uint256",
          name: "",
          type: "uint256",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
  ];

  const contract_address = "0xf36ab6738D3F613EF70B49CEDbA62A362aFa9d63";
  const contract = new web3.eth.Contract(contract_abi, contract_address);

  const bscChainId = 97;


  useEffect(() => {
    getPurchaseData()
    getCountry()
  }, [])


  useEffect(() => {
    //validations
    $("#frm").validate({
      rules: {
        user_f_name: {
          required: true,
        },
        user_l_name: {
          required: true,
        },
        user_email: {
          required: true,
        },
        phone: {
          required: true,
        },
        billing_address_street: {
          required: true,
        },
        billing_address_country: {
          required: true,
        },
        // business_name: {
        //   required: true,
        // },
        billing_address_state: {
          required: true,
        },
        billing_address_city: {
          required: true,
        },
        billing_address_zip: {
          required: true,
        },
      }
    });

  }, []);


  // -- get country -- 

  async function getCountry() {
    return axios.get(`https://countriesnow.space/api/v0.1/countries/positions`, {
    }).then((res) => {
      // console.log(res)
      setCountry(res.data.data)
    })
      .catch((err) => {
        console.log(err);
      });
  }

  function plus() {
    // alert('ok')
    setCount(count + 1)
    setAmount((count + 1) * price)
    setGoldgoosePrice((count + 1) * goldgoose)
  }

  function minus() {
    // alert('ok2')
    if (count == 1) {
      setCount(1)
      setAmount(1 * price)
      setGoldgoosePrice(1 * goldgoose)

    } else {
      setCount(count - 1)
      setAmount((count - 1) * price)
      setGoldgoosePrice((count - 1) * goldgoose)


    }
  }

  async function connectMetamask() {
    if (Web3.givenProvider === null) {
      swal("Please install metamask", {
        button: false,
        icon: "error",
        timer: 3000,
      });
    } else {
      const chainId = await web3.eth.getChainId();
      if (typeof web3 !== "undefined" && chainId === bscChainId) {
        window.ethereum
          .request({ method: "eth_requestAccounts" })
          .then(async function (userAddress) {
            const wallet_button = document.getElementById("wallet");
            wallet_button.innerHTML = "Connected";
            wallet_button.style.background = "skyblue";
            setUserAddress(userAddress[0]);
            swal("Wallet connected", {
              button: false,
              icon: "success",
              timer: 3000,
            });
          });
      } else {
        if (chainId) {
          swal("Please connect to ggoose blockchain", {
            button: false,
            icon: "error",
            timer: 3000,
          });
        } else {
          swal("Please install metamask", {
            button: false,
            icon: "error",
            timer: 3000,
          });
        }
      }
    }
  }

  // -- get purchase data -- 
  async function getPurchaseData() {
    // alert(param.slug)
    var fd = new FormData;
    fd.append("slug", param.slug);
    return axios.post(`${baseUrl}/events-slug-get-details-link`, fd, {
    }).then((res) => {
      // console.log(res)
      if (res.data.code == "200") {
        toast.success(res.data.message);
        setEventName(res.data.data.event_name)
        setPlatformName(res.data.data.platform_name)
        setGoldgoose(res.data.data.goldengoose)
        setGoldgoosePrice(parseInt(res.data.data.goldengoose))
        setPrice(parseInt(res.data.data.price))
        setAmount(parseInt(res.data.data.price))
        setDate(res.data.data.event_date)
        setDesc(res.data.data.desc)
        setId(res.data.data.id)
        setforhtml(res.data.data.event_html)
        setproductId(res.data.data.product_name)
        setproductname(res.data.data.product_id)
        setBitrix_product_id(res.data.data.bitrix_product_id)
        setbitrix_event_id(res.data.data.bitrix_event_id)

        if (res.data.status == true) {
          SetDynamicData(res.data.attributeadadata)

        } else {
          SetDynamicData([{ 'key_name': '', value: '' }])
        }
      } else {
        toast.error(res.data.message);
        Navigate('/not-found')
      }
    })
      .catch((err) => {
        console.log(err);
      });
  }




  const handleSubmit = async (event) => {
    // event.preventDefault();
    // if (window.confirm('Are you sure to proceed with this purchase?')) {
    if (user_address !== undefined && user_address !== null && user_address !== "") {
      console.log("user_address", user_address);
      if (Web3.givenProvider === null) {
        swal("Please install metamask", {
          button: false,
          icon: "error",
          timer: 3000,
        });
      } else {
        if (typeof web3 !== "undefined") {
          const chainId = await web3.eth.getChainId();
          if (chainId === bscChainId) {
            window.ethereum
              .request({ method: "eth_requestAccounts" })
              .then(async function (userAddress) {
                // useraddress.push(address[0]);
                // console.log(price);
                await contract.methods
                  .transfer(
                    "0x3Fb78bd3Df96f84399b80269fE428335a27BBC9B",
                    BigNumber(count * goldgoose * 10 ** 18)
                  )
                  .send({ from: userAddress[0] })
                  .on("transactionHash", function (hash) {
                    console.log(hash);
                    setTransactionId(hash.toString());
                    var fd = new FormData;
                    fd.append("event_id", id);
                    fd.append("transaction_id", hash);
                    fd.append("amount", amount);
                    fd.append("user_f_name", userName);
                    fd.append("user_l_name", lastName);
                    fd.append("user_email", email);
                    fd.append("user_mobile", mobile);
                    fd.append("user_address", user_address);
                    fd.append("business_name", businessName);
                    fd.append("billing_address_country", countryBack);
                    fd.append("billing_address_state", state);
                    fd.append("billing_address_street", address);
                    fd.append("billing_address_city", city);
                    fd.append("billing_address_zip", zip);
                    fd.append("billing_address_country_two", countryBack2);
                    fd.append("billing_address_state_two", state2);
                    fd.append("billing_address_street_two", address2);
                    fd.append("billing_address_city_two", city2);
                    fd.append("billing_address_zip_two", zip2);
                    fd.append("total_purchase_event_ticket", count);
                    // console.log(Object.fromEntries(fd));
                    return axios.post(`${baseUrl}/order/order-create`, fd, {
                      // headers: { 
                      //   'Authorization': `Bearer ` + localStorage.getItem('token')
                      // }
                    }).then((res) => {
                      // console.log(res)
                      if (res.data.code == "200") {
                        swal("Transaction Confirm,", {
                          button: false,
                          icon: "success",
                          timer: 4000,
                        });
                        setUserName('')
                        setEmail('')
                        setMobile('')
                        setAddress('')
                        setTimeout(() => {
                          Navigate('/events/thanku')
                        }, 4000)

                      } else {
                        swal("Transcation Error", {
                          button: false,
                          icon: "error",
                          timer: 3000,
                        });
                      }
                    })
                      .catch((err) => {
                        console.log(err);
                      });
                  });
              }); // console.log(tx_hash.transactionHash);
          } else {
            swal("Please select BSC Blockchain", {
              button: false,
              icon: "error",
              timer: 3000,
            });
          }
        } else {
          swal("Please Connect Wallet", {
            button: false,
            icon: "error",
            timer: 3000,
          });
        }
      }
    } else {
      swal("Please Connect Wallet", {
        button: false,
        icon: "error",
        timer: 3000,
      });
    }

    // }
  };



  const submit = async (event) => {
    event.preventDefault();
    confirmAlert({
      customUI: ({ onClose }) => {
        return (
          <div className='popup-custom-ui'>
            {/* <h1>Are you sure?</h1> */}
            <p>Are you sure to proceed with this purchase?</p>
            <div className='d-flex' style={{ justifyContent: 'space-between' }}>
              <button className='new-btn-des' onClick={onClose}>cancel</button>
              <button className='new-btn-des'
                onClick={() => {
                  handleSubmit()
                  onClose();
                }}
              >
                Yes
              </button>
            </div>
          </div>
        );
      }
    });
  };


  function newUrlLinks() {
    window.open('https://pancakeswap.finance/swap', '_blank');
  }


  return (
    <>
      <div className="extra-page-heading">
        <span className="metamask mr-5">
          {/* <button
            id="wallet"
            className="new-btn-des mr-2"
            onClick={connectMetamask}
          >
            Connect Wallet
          </button> */}
        </span>
      </div>
      <div className="extra-new-page">
        <div className="row mx-3">
          <div className="col-md-6 col-12 my-3 px-1">
            <div className="create extra-create">
              <div className="card-header view-header">Purchase Form</div>
              <div className="card-body">
                <h4 className='mb-3'><b>Contact information</b></h4>
                <form id="frm" onSubmit={submit}>
                  <div className="row">
                    <div className="mb-3 col-6">
                      <label htmlFor="user_f_name" className="form-label">First name</label>
                      <input type="text" name='user_f_name' value={userName} onChange={(e) => setUserName(e.target.value)} className="form-control" id="user_f_name" />
                    </div>
                    <div className="mb-3 col-6">
                      <label htmlFor="user_l_name" className="form-label">Last name</label>
                      <input type="text" name='user_l_name' value={lastName} onChange={(e) => setLastName(e.target.value)} className="form-control" id="user_l_name" />
                    </div>
                    <div className="mb-3 col-12">
                      <label htmlFor="user_email" className="form-label">Email</label>
                      <input type="email" name='user_email' value={email} onChange={(e) => setEmail(e.target.value)} className="form-control" id="user_email" />
                    </div>
                    <div className="mb-3 col-6">
                      <label htmlFor="business_name" className="form-label">Business name</label>
                      <input type="text" name='business_name' value={businessName} onChange={(e) => setBusinessName(e.target.value)} className="form-control" id="user_name" />
                    </div>
                    <div className="mb-3 col-6">
                      <label htmlFor="phone" className="form-label">Mobile</label>
                      <input type="number" name='phone' value={mobile} onChange={(e) => setMobile(e.target.value)} className="form-control" id="phone" />
                    </div>
                    <hr />
                    <h4 className='my-3'><b>Billing address 1</b></h4>
                    <div className="mb-3">
                      <label htmlFor="billing_address_street" className="form-label">Street</label>
                      <input type="text" name='billing_address_street' value={address} onChange={(e) => setAddress(e.target.value)} className="form-control" id="billing_address_street" />
                    </div>
                    <div className="mb-3 col-6">
                      <label htmlFor="billing_address_city" className="form-label">City</label>
                      <input type="text" name='billing_address_city' value={city} onChange={(e) => setCity(e.target.value)} className="form-control" id="billing_address_city" />
                    </div>
                    <div className="mb-3 col-6">
                      <label htmlFor="billing_address_state" className="form-label">State</label>
                      <input type="text" name='billing_address_state' value={state} onChange={(e) => setState(e.target.value)} className="form-control" id="billing_address_state" />
                    </div>
                    <div className="mb-3 col-6">
                      <label htmlFor="billing_address_country" className="form-label">Country</label>
                      <select name='billing_address_country' id='billing_address_country'
                        onChange={event => setCountryBack(event.target.value)} className="form-select" aria-label="Default select example">
                        <option value={''}>Select</option>
                        {
                          country.map((e) => (
                            <option value={e.name}>{e.name}</option>
                          ))
                        }
                      </select>
                    </div>
                    <div className="mb-3 col-6">
                      <label htmlFor="billing_address_zip" className="form-label">Pin code</label>
                      <input type="text" name='billing_address_zip' value={zip} onChange={(e) => setZip(e.target.value)} className="form-control" id="billing_address_zip" />
                    </div>
                    {/* <hr /> */}
                    {/* <h4 className='my-3'><b>Billing address 2</b></h4>
                    <div className="mb-3">
                      <label htmlFor="billing_address_street_2" className="form-label">Street</label>
                      <input type="text" name='billing_address_street_2' value={address2} onChange={(e) => setAddress2(e.target.value)} className="form-control" id="billing_address_street_2" />
                    </div>
                    <div className="mb-3 col-6">
                      <label htmlFor="billing_address_city_2" className="form-label">City</label>
                      <input type="text" name='billing_address_city_2' value={city2} onChange={(e) => setCity2(e.target.value)} className="form-control" id="billing_address_city_2" />
                    </div>
                    <div className="mb-3 col-6">
                      <label htmlFor="billing_address_state_2" className="form-label">State</label>
                      <input type="text" name='billing_address_state_2' value={state2} onChange={(e) => setState2(e.target.value)} className="form-control" id="billing_address_state_2" />
                    </div>
                    <div className="mb-3 col-6">
                      <label htmlFor="billing_address_country_2" className="form-label">Country</label>
                      <select name='billing_address_country_2' id='billing_address_country_2'
                        onChange={event => setCountryBack2(event.target.value)} className="form-select" aria-label="Default select example">
                        <option value={''}>Select</option>
                        {
                          country.map((e) => (
                            <option value={e.name}>{e.name}</option>
                          ))
                        }
                      </select>
                    </div>
                    <div className="mb-3 col-6">
                      <label htmlFor="billing_address_zip_2" className="form-label">Pin code</label>
                      <input type="text" name='billing_address_zip_2' value={zip2} onChange={(e) => setZip2(e.target.value)} className="form-control" id="billing_address_zip_2" />
                    </div> */}

                    <div className="pl-3 mt-3">
                      <button type="submit" className="new-btn-des but-now" aria-label="Close">BUY NOW</button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>

          <div className="col-md-6 col-12 my-3 px-1">
            <div className="view-card">
              <div className="card-header view-header">
                Event-ticket details
              </div>
              <div className="card-body">
                <table className='view-table'>
                  <tr>
                    <th>Event name</th>
                    <td>: {eventName}</td>
                  </tr>
                  <tr>
                    <th>product name</th>
                    <td>: {productname}</td>
                  </tr>
                  <tr>
                    <th>product id</th>
                    <td>: {productId}</td>
                  </tr>
                  {/* <tr>
                    <th>Bitrix Event Id</th>
                    <td>: {bitrix_event_id}</td>
                  </tr> */}
                  {/* <tr>
                    <th>Bitrix Product Id</th>
                    <td>: {bitrix_product_id}</td>
                  </tr> */}
                  <tr>
                    <th>Platform name</th>
                    <td>: {platformName}</td>
                  </tr>
                  <tr>
                    <th>Ggoose eggs</th>
                    <td>: {goldgoosePrice}</td>
                  </tr>
                  <tr>
                    <th>Event date</th>
                    <td>: {date}</td>
                  </tr>
                  {/* <tr>
                    <th>Price ($)</th>
                    <td>: {amount}</td>
                  </tr> */}
                  <tr>
                    <th>Quantity</th>
                    <td>:
                      <span className='count-btn' onClick={minus}>-</span>
                      <span>{count}</span>
                      <span className='count-btn' onClick={plus}>+</span>
                    </td>
                  </tr>
                  <tr>
                    <th>Desc</th>
                    <td>: {desc}</td>
                  </tr>
                </table>

                <hr className='my-4' />

                {/* <Link to='https://pancakeswap.finance/swap'>To buy Goldengoose eggs, please click on below</Link> */}

                <h4 className='new-add-text-link mb-3'>To buy Goldengoose eggs, please click below</h4>
                <div className="ch-psn-btn">
                  <button className='new-btn-des' onClick={newUrlLinks}>Buy eggs</button>
                  <button id="wallet" className="new-btn-des" onClick={connectMetamask}>Connect Wallet</button>
                </div>
                <hr className='my-4' />


                <div className="what-inc">
                  <h4 className='mb-3 new-heading-style text-center'><b>What's Included</b></h4>
                  <div dangerouslySetInnerHTML={{ __html: forhtml }} />
                </div>
                {/* {
                dynmicdata.map((e) => (
                  <div className="dynamic-data-view">
                    <div className="mb-3">
                      <label htmlFor="key" className="form-label"><b>Title:</b></label>
                      <input type="text" name='key' value={e.key_name} className="form-control" id="key" disabled />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="value" className="form-label"><b>Body Text:</b></label>
                      <input type="text" name='value' value={e.value} className="form-control" id="value" disabled />
                    </div>
                  </div>
                ))
              } */}


              </div>
            </div>
          </div>
        </div>
      </div>


    </>
  )
}

export default Purchase