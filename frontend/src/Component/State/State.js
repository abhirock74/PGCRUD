import React, { useState, useEffect } from 'react';
import Nav from '../Nav/Nav';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const State = () => {
  const [state , setstate] = useState([]);
  const [notification, setnotification] = useState('')
  let token = sessionStorage.getItem('token');
  const getState = () => {
    axios.get('http://localhost:8080/api/state',{
      headers: {
        "token": ` ${token}`
      }
    })
      .then((res) => {
        console.log(res.data)
        setnotification(toast.success(res.data.message,{position:toast.POSITION.TOP_CENTER}))
        setstate(res.data.state)
      })
  };
  useEffect(() => {
    getState()
  }, []);
  return (
    <div>
      <Nav/>
      <div className='d-flex  justify-content-between mx-4 mt-3'>
      <h5 className='text-center mt-3'>State Lists</h5>
      <Link to="/addstate" type="button" class="btn btn-primary px-5">Add State</Link>
      </div>
      <hr/>
      <table class="table">
      <thead>
    <tr>
      <th className='col-2'>No</th>
      <th className='col-10'>Name</th>
    </tr>
  </thead>
      </table>
      {state.map((item) => {
    return (
      <div>
        <table class="table">
  <tbody>
    <tr>
      <th className='col-2'>{item.id}</th>
      <td className='col-10'>{item.state_name}</td>
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

export default State
