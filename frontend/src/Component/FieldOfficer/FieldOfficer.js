import React, { useState, useEffect } from 'react';
import Nav from '../Nav/Nav';
import { Link } from "react-router-dom";
import axios from 'axios';






const FieldOfficer = () => {
  const [users , setusers] = useState([]);
  let token = sessionStorage.getItem('token');
  const getCompany = () => {
    axios.get('http://localhost:8080/api/users',{
      headers: {
        "token": ` ${token}`
      }
    })
      .then((res) => {
        console.log(res.data)
        setusers(res.data.user)
      })
  };
  useEffect(() => {
    getCompany()
  }, []);
  return (
    <div>
      <Nav/>
      <div className='d-flex  justify-content-between mx-4 mt-3'>
      <h5 className='text-center mt-3'>Field Officer Lists</h5>
      <Link to="add" class="btn btn-primary px-5">Add FieldOfficer</Link>
      </div>
      <hr/>
      <table class="table">
      <thead>
    <tr>
      <th className='col-1'>No</th>
      <th className='col-3'>Name</th>
      <th className='col-3'>username</th>
      <th className='col-3'>email</th>
      <th className='col-1'>Role</th>
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
      <td className='col-3'>{item.name}</td>
      <td className='col-3'>{item.username}</td>
      <td className='col-3'>{item.email}</td>
      <td className='col-1'>{item.id==="1"?<p>Admin</p>:<p>F officer</p>}</td>
    </tr>
  </tbody>
</table>
      </div>
      
    );
  })}
    </div>
  )
}

export default FieldOfficer
