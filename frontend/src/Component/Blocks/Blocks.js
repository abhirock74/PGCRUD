import React, { useState, useEffect } from 'react';
import Nav from '../Nav/Nav';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Blocks = () => {
  const [district, setdistrict] = useState([]);
  const [districtId, setdistrictId] = useState([]);
  const [notification, setnotification] = useState('');
  const [state, setState] = useState([]);
  const [stateId, setStateId] = useState([]);
  const [block, setBlock] = useState([]);
  // const[blockId, setBlockId]= useState('');

  let token = sessionStorage.getItem('token');
  const getDistrict = () => {
    axios.get('http://localhost:8080/api/district', {
      headers: {
        "token": ` ${token}`,
        "state_id": `${stateId}`
      }
    })
      .then((res) => {
        console.log(res.data)
        setdistrict(res.data.District)
      })
  };
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
        console.log(res);
        setnotification(toast.success(res.data.message, { position: toast.POSITION.BOTTOM_LEFT }))
        // console.log(block)
      });
  };

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
  }, [stateId]);
  useEffect(() => {
    getBlock()
  }, [districtId])
  return (
    <div>
      <Nav />
      <div className='d-flex  justify-content-between mx-4 mt-3'>
        <h5 className='text-center mt-3'>Block Lists</h5>
        <div className='d-flex  justify-content-between mx-4 mt-3'>
          <select onChange={handelState} className='w-100' name="state" id="state" form="state">
            <option selected>----Select State ----</option>
            {state.map((ab) => {
              const { id } = ab
              return <option key={id} value={ab.id}>{ab.state_name}</option>;
            })}
          </select>
        </div>
        <div className='d-flex  justify-content-between mx-4 mt-3'>
          <select className='w-100' name="district" id="district" form="district"
            onChange={handelDistrict}>
            <option selected>----Select District ----</option>
            {district.map((ab) => {
              const { id } = ab
              return <option key={id} value={ab.id}>{ab.district_name}</option>;
            })}
          </select>
        </div>

        <Link to="/AddBlock" type="button" class="btn btn-primary px-5">Add Blocks</Link>
      </div>
      <hr />
      {block.length == '0' ? <><h4 className='d-flex  justify-content-center align-self-center py-5 mt-5'>Please Select State and District</h4>
      </> : <table class="table">
        <thead>
          <tr>
            <th className='col-2'>ID</th>
            <th className='col-10'>Name</th>
          </tr>
        </thead>
      </table>}
      {block.map((item) => {
        return (
          <div>
            <table class="table">
              <tbody>
                <tr>
                  <th className='col-2'>{item.id}</th>
                  <td className='col-10'>{item.block_name}</td>
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

export default Blocks
