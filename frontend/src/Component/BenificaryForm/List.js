import React, { useState, useEffect } from 'react';
import Nav from '../Nav/Nav';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const List = () => {
  const [users , setusers] = useState([]);
  const [notification, setnotification] = useState('')
  let token = sessionStorage.getItem('token');
  const getCompany = () => {
    axios.get('http://localhost:8080/api/beneficiary',{
      headers: {
        "token": ` ${token}`
      }
    })
      .then((res) => {
        console.log(res.data)
        setnotification(toast.success(res.data.message,{position:toast.POSITION.BOTTOM_LEFT}))
        setusers(res.data.beneficiary)
        
      })
  };
  useEffect(() => {
    getCompany()
  },[]);
  return (
    <div>
      <Nav/>
      <div className='d-flex  justify-content-between mx-4 mt-3'>
      <h5 className='text-center mt-3'>Benificiary Lists</h5>
      <Link to="/addbenificary" type="button" class="btn btn-primary px-5">Add Benificiary</Link>
      </div>
      <hr/>
      <table class="table">
      <thead>
    <tr>
      <th className='col-1'>No</th>
      <th className='col-3'>Name</th>
      <th className='col-3'>mobile</th>
      <th className='col-3'>email</th>
      <th className='col-1'>Gender</th>
    </tr>
  </thead>
      </table>
      {users.map((item) => {
    return (
      <div>
        <table class="table">
  <tbody>
    <tr>
      <th className='col-1'>{item.id}</th>
      <td className='col-3'>{item.first_name}</td>
      <td className='col-3'>{item.mobile}</td>
      <td className='col-3'>{item.email}</td>
      <td className='col-1'>{item.gender=="0"?<p>Male</p>:<p>Female</p>}</td>
    </tr>
  </tbody>
</table>
      </div>
      
    );
  })}
  <ToastContainer />
    </div>
  )
}

export default List
