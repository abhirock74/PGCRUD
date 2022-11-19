import React, { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import Nav from '../Nav/Nav';
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AddVillage = () => {
  const [notification, setnotification] = useState('');
  const [state, setState] = useState([]);
  const [stateId, setStateId] = useState('0');
  const [district, setDistrict] = useState([]);
  const [districtId, setdistrictId] = useState([]);
  const [block, setBlock] = useState([]);
  const [blockId, setBlockId] = useState('');
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
      //   console.log(values.district_name)
      let data = {
        vill_name: values.vill_name,
        block_id: blockId
      }
      axios
        .post(`http://localhost:8080/api/village`, data, {
          headers: {
            "token": ` ${token}`
          }
        })
        .then((res) => {
          console.log(res);
          setnotification(toast.success(res.data.message, { position: toast.POSITION.BOTTOM_LEFT }))
          console.log(res.data.message);
          if (res.data.message == "village create Successful") {
            navigate('/village');
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
  const getDistrict = () => {
    const token = sessionStorage.getItem('token');
    axios.get('http://localhost:8080/api/district', {
      headers: {
        "token": ` ${token}`,
        "state_id": `${stateId}`
      }
    })
      .then((res) => {
        setDistrict(res.data.District);
        // console.log(district)
      });
  };
  const getBlock = () => {
    const token = sessionStorage.getItem('token');
    axios.get('http://localhost:8080/api/block', {
      headers: {
        "token": ` ${token}`,
        "dist_id": `${districtId}`
      }
    })
      .then((res) => {
        setBlock(res.data.block);
        // console.log(res)
        // console.log(block)
      });
  };
  const handelBlock = (e) => {
    setBlockId(e.target.value)
  }
  const handelState = (e) => {
    setStateId(e.target.value);
  };
  const handelDistrict = (e) => {
    setdistrictId(e.target.value)
  };
  useEffect(() => {
    getState()
  }, []);
  useEffect(() => {
    getDistrict()
  }, stateId);
  useEffect(() => {
    getBlock()
  }, [districtId]);
  return (
    <>
      <Nav />
      <h4 className='d-flex justify-content-center my-3'>Add Village</h4>
      <div className='d-flex justify-content-center'>
        <form className='border w-50 p-5' onSubmit={formik.handleSubmit}>
          <div className='justify-content-around'>
            <label htmlFor="vill_name"> Village Name :</label> <br />
            <input className='w-100 p-1' id="vill_name" name="vill_name" type="text" onChange={formik.handleChange}
              value={formik.values.vill_name} />
          </div>
          <div className='justify-content-around mt-2'>
            <label htmlFor="state ">Select State :</label> <br />
            <select className='w-100 p-1' name="state" id="state" form="state"
              onChange={handelState} value={formik.values.state}>
              <option>----Select State ----</option>
              {state.map((ab) => {
                const { id } = ab
                return <option key={id} value={ab.id}>{ab.state_name}</option>;
              })}
            </select>
          </div>
          <div className='justify-content-around mt-2'>
            <label htmlFor="district ">Select district :</label> <br />
            <select className='w-100 p-1' name="district" id="district" form="district"
              onChange={handelDistrict} value={formik.values.district}>
              <option selected>----Select District ----</option>
              {district.map((ab) => {
                const { id } = ab
                return <option key={id} value={ab.id}>{ab.district_name}</option>;
              })}
            </select>
          </div>
          <div className='justify-content-around mt-2'>
            <label htmlFor="block ">Select Block :</label> <br />
            <select className='w-100 p-1' name="block" id="block" form="block"
              onChange={handelBlock} value={formik.values.block}>
              <option selected>----Select Block ----</option>
              {block.map((ab) => {
                const { id } = ab
                return <option key={id} value={ab.id}>{ab.block_name}</option>;
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

export default AddVillage
