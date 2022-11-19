import React, { useState } from 'react';
import { useFormik } from 'formik';
import Nav from '../Nav/Nav';
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AddFieldOfficer = () => {
  const [notification, setnotification] = useState('')
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
    },

    onSubmit: values => {
      // alert(JSON.stringify(values, null, 2));
      let token = sessionStorage.getItem('token');
      // let data = JSON.stringify(values, null, 2)
      // const value =(JSON.parse(data));
      // console.log(value)

      axios
        .post(`http://localhost:8080/api/users`, values, {
          headers: {
            "token": ` ${token}`
          }
        })
        .then((res) => {
          // console.log(res);
          setnotification(toast.error(res.data.message, { position: toast.POSITION.TOP_CENTER }))
          console.log(res.data.message);
          if (res.data.message == "user create Successful") {
            navigate('/fieldofficer');
          }
        })
        .catch((err) => {
          setnotification(toast.error(err.response.data.message))
          console.log(err.response.data.message);

        });
    },
  });
  return (
    <>
      <Nav />
      <h4 className='d-flex justify-content-center my-3'>Add Field Officier</h4>
      <div className='d-flex justify-content-center'>
        <form className='border w-50 p-5' onSubmit={formik.handleSubmit}>
          <div className='justify-content-around'>
            <label htmlFor="name">Name :</label> <br />
            <input className='w-100 p-1' id="name" name="name" type="text" onChange={formik.handleChange}
              value={formik.values.name} />
          </div>
          <div className='justify-content-around mt-2'>
            <label htmlFor="username">Username :</label> <br />
            <input className='w-100 p-1' id="username" name="username" type="text" onChange={formik.handleChange}
              value={formik.values.username} />
          </div>
          <div className='justify-content-around mt-2'>
            <label htmlFor="password ">password :</label> <br />
            <input className='w-100 p-1' id="password " name="password" type="password " onChange={formik.handleChange}
              value={formik.values.password} />
          </div>
          <div className='justify-content-around mt-2'>
            <label htmlFor="email">Email :</label> <br />
            <input className='w-100 p-1' id="email " name="email" type="text " onChange={formik.handleChange}
              value={formik.values.email} />
          </div>
          <div className='justify-content-around mt-2'>
            <label htmlFor="role ">Role :</label> <br />
            <select className='w-100 p-1' name="role" id="role" form="role"
              onChange={formik.handleChange} value={formik.values.role}>
              <option>----- select role -------</option>
              <option value="2">Field Officer</option>
              <option value="1">Admin</option>
              {/* <option value="">option 3</option> */}
              {/* <option value="">Opel</option>
            <option value="audi">Audi</option> */}
            </select>
          </div>
          <div className='justify-content-around mt-2'>
            <label htmlFor="photo ">Photo :</label> <br />
            <input disabled className='w-100 p-1' id="photo " name="photo " type="file" onChange={formik.handleChange}
              value={formik.values.photo} />
          </div>
          <button class="btn btn-primary mt-3 px-4 py-2" type="submit">Submit</button>
        </form>
      </div>
      <ToastContainer />
    </>
  );
}

export default AddFieldOfficer
