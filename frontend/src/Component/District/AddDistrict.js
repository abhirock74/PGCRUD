import React, { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import Nav from '../Nav/Nav';
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AddDistrict = () => {
  const [notification, setnotification] = useState('');
  const [state, setState] = useState([]);
  const [stateId, setStateId] = useState('1');
  console.log(stateId)
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
    },

    onSubmit: values => {
      //   alert(JSON.stringify(values, null, 2));
      let token = sessionStorage.getItem('token');
      // let data = JSON.stringify(values, null, 2)
      // const value =(JSON.parse(data));
      console.log(values.district_name)
      let data = {
        district_name: values.district_name,
        state_id: stateId
      }
      axios
        .post(`http://localhost:8080/api/district`, data, {
          headers: {
            "token": ` ${token}`
          }
        })
        .then((res) => {
          console.log(res);
          setnotification(toast.success(res.data.message, { position: toast.POSITION.BOTTOM_LEFT }))
          console.log(res.data.message);
          if (res.data.message == "district create Successful") {
            navigate('/district');
          }
        })
        .catch((err) => {
          setnotification(toast.error(err.response.data.message))
          console.log(err.response.data.message);

        });
    }
  });
  const getState = () => {
    const token = sessionStorage.getItem('token');
    axios.get('http://localhost:8080/api/state', {
      headers: {
        "token": ` ${token}`
      }
    })
      .then((res) => {
        setState(res.data.state);
      });
  };
  const handelState = (e) => {
    setStateId(e.target.value);
  };
  useEffect(() => {
    getState()
  }, [])
  return (
    <>
      <Nav />
      <h4 className='d-flex justify-content-center my-3'>Add District</h4>
      <div className='d-flex justify-content-center'>
        <form className='border w-50 p-5' onSubmit={formik.handleSubmit}>
          <div className='justify-content-around'>
            <label htmlFor="district_name"> District Name :</label> <br />
            <input className='w-100 p-1' id="district_name" name="district_name" type="text" onChange={formik.handleChange}
              value={formik.values.district_name} />
          </div>
          <div className='justify-content-around mt-2'>
            <label htmlFor="state ">Select State :</label> <br />
            <select className='w-100 p-1' name="state" id="state" form="state"
              onChange={handelState} value={formik.values.state}>
              <option selected>----Select State ----</option>
              {state.map((ab) => {
                const { id } = ab
                return <option key={id} value={ab.id}>{ab.state_name}</option>;
              })}
            </select>
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

export default AddDistrict
