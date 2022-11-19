import React, { usevillage, useEffect, useState } from 'react';
import Nav from '../Nav/Nav';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Village = () => {
  const [village, setvillage] = useState([]);
  const [state, setState] = useState([]);
  const [stateId, setStateId] = useState([]);
  const [district, setDistrict] = useState([]);
  const [districtId, setdistrictId] = useState([]);
  const[block, setBlock]= useState([]);
  const[blockId, setBlockId]= useState('');
  // console.log(blockId)
  let token = sessionStorage.getItem('token');
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

  const getVillage = () => {
    axios.get('http://localhost:8080/api/village', {
      headers: {
        "token": ` ${token}`
      }
    })
      .then((res) => {
        console.log(res.data)
        setvillage(res.data.Village)
        console.log(village)
      })
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
  const getBlock = () =>{
    const token = sessionStorage.getItem('token');
    axios.get('http://localhost:8080/api/block',{
        headers: {
          "token": ` ${token}`,
          "dist_id":`${districtId}`
        }
      })
    .then((res)=>{
        setBlock(res.data.block);
        // console.log(res)
        // console.log(block)
    });
  };
  useEffect(() => {
    getState()
  }, []);
  useEffect(()=>{
    getDistrict()
  },stateId);
  useEffect(()=>{
    getBlock()
  }, districtId)
  useEffect(() => {
    getVillage()
  }, blockId);
  const handelState = (e) => {
    setStateId(e.target.value);
  }
  const handelDistrict = (e) => {
    setdistrictId(e.target.value)
  };
  const handelBlock = (e)=>{
    setBlockId(e.target.value)
  }
  return (
    <div>
      <Nav />
      <div className='d-flex  justify-content-between mx-4 mt-3'>
        <h5 className='text-center mt-3'>Village Lists</h5>
        <div className='justify-content-around mt-2'>
          <label htmlFor="state ">Select State :</label> <br />
          <select onChange={handelState} className='w-100 p-1' name="state" id="state" form="state">
            <option selected>----Select State ----</option>
            {state.map((ab) => {
              const { id } = ab
              return <option key={id} value={ab.id}>{ab.state_name}</option>;
            })}
          </select>
        </div>
        <div className='justify-content-around mt-2'>
          <label htmlFor="district ">Select district :</label> <br />
          <select onChange={handelDistrict} className='w-100 p-1' name="district" id="district" form="district">
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
         onClick={handelBlock}>
            <option selected>----Select Block ----</option>
            {block.map((ab) => {
            const {id} = ab
            return <option key={id} value={ab.id}>{ab.block_name}</option>;
          })}
          </select>
        </div>

        {/* <Link onClick={getVillage} class="btn btn-primary px-5">Get Village List</Link> */}
      </div>
      <hr />
      <table class="table">
        <thead>
          <tr>
            <th className='col-2'>No</th>
            <th className='col-10'>Name</th>
          </tr>
        </thead>
      </table>
      {village.map((item) => {
        return (
          <div>
            <table class="table">
              <tbody>
                <tr>
                  <th className='col-2'>{item.id}</th>
                  <td className='col-10'>{item.vill_name}</td>
                </tr>
              </tbody>
            </table>
          </div>

        );
      })}
    </div>
  )
}

export default Village
