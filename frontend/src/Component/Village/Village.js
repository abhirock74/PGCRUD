import React, { useState, useEffect } from 'react';
import Nav from '../Nav/Nav';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Village = () => {
  const [district , setdistrict] = useState([]);
  const [districtId, setdistrictId] = useState([]);
  const [notification, setnotification] = useState('');
  const [state, setState] = useState([]);
  const [stateId, setStateId] = useState([]);
  const[block, setBlock]= useState([]);
  const[blockId, setBlockId]= useState('');
  const [village , setVillage]= useState([])
  // const[blockId, setBlockId]= useState('');
  
  let token = sessionStorage.getItem('token');
  const getDistrict = () => {
    axios.get('http://localhost:8080/api/district',{
      headers: {
        "token": ` ${token}`,
        "state_id":`${stateId}`
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
        console.log(res);
        // console.log(block)
    });
  };
  const getVillage = () =>{
    const token = sessionStorage.getItem('token');
    axios.get('http://localhost:8080/api/village',{
        headers: {
          "token": ` ${token}`,
          "block_id":`${blockId}`
        }
      })
    .then((res)=>{
        setVillage(res.data.Village);
        // console.log(res)
        setnotification(toast.success(res.data.message,{position:toast.POSITION.BOTTOM_LEFT}))
    });
  };
  const handelState = (e) => {
    setStateId(e.target.value);
  };
  const handelDistrict =(e)=>{
    setdistrictId(e.target.value)
  };
  const handelBlock = (e)=>{
    setBlockId(e.target.value)
  }
  useEffect(() => {
    getState()
  }, []);
  useEffect(()=>{
    getDistrict()
  },[stateId]);
  useEffect(()=>{
    getBlock()
  },[districtId]);
  useEffect(()=>{
    getVillage()
  },[blockId])
  return (
    <div>
      <Nav/>
      <div className='d-flex  justify-content-between mx-4'>
      <h5 className='text-center mt-3'>Village Lists</h5>
      <div className='d-flex'>
          <select onChange={handelState} className='w-100 p-1 mt-3' name="state" id="state" form="state">
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
            const {id} = ab
            return <option key={id} value={ab.id}>{ab.district_name}</option>;
          })}
          </select>
        </div>
        <div className='justify-content-around'>
          <select className='w-100 p-1 mt-3' name="block" id="block" form="block"
          onChange={handelBlock}>
            <option selected>----Select Block ----</option>
            {block.map((ab) => {
            const {id} = ab
            return <option key={id} value={ab.id}>{ab.block_name}</option>;
          })}
          </select>
        </div>


      <Link to="/AddVillage" type="button" class="btn btn-primary px-5 mt-2">Add Village</Link>
      </div>
      <hr/>
      {village.length=='0'?<><h4 className='d-flex  justify-content-center align-self-center py-5 mt-5'>Please Select State and District and Village</h4>
      </>:<table class="table">
      <thead>
    <tr>
      <th className='col-2'>ID</th>
      <th className='col-10'>Name</th>
    </tr>
  </thead>
      </table>}
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
  <ToastContainer />
    </div>
  )
}

export default Village
