import React, { useState } from 'react';
import { useFormik } from 'formik';
import Nav from '../Nav/Nav';
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AddState = () => {
  const [notification, setnotification] = useState('')
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
    },

    onSubmit: values => {
      //   alert(JSON.stringify(values, null, 2));
      let token = sessionStorage.getItem('token');
      // let data = JSON.stringify(values, null, 2)
      // const value =(JSON.parse(data));
      // console.log(value)

      axios
        .post(`http://localhost:8080/api/state`, values, {
          headers: {
            "token": ` ${token}`
          }
        })
        .then((res) => {
          // console.log(res);
          setnotification(toast.success(res.data.message, { position: toast.POSITION.BOTTOM_LEFT }))
          console.log(res.data.message);
          if (res.data.message == "State create Successful") {
            navigate('/state');
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
      <h4 className='d-flex justify-content-center my-3'>Add State</h4>
      <div className='d-flex justify-content-center'>
        <form className='border w-50 p-5' onSubmit={formik.handleSubmit}>
          <div className='justify-content-around'>
            <label htmlFor="state_name"> State Name :</label> <br />
            <input className='w-100 p-1' id="state_name" name="state_name" type="text" onChange={formik.handleChange}
              value={formik.values.state_name} />
          </div>


          <div className='text-center'>
            <button class="btn btn-primary mt-3 px-5 py-2" type="submit">Submit</button>
          </div>
        </form>
      </div>
      <ToastContainer />
    </>
  );
}

export default AddState
