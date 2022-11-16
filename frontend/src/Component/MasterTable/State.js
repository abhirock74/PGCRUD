import React, { useEffect, useState } from 'react';
import axios from 'axios';


const State = () => {
    const [state, setState]= useState([])
    const token = sessionStorage.getItem('token');
    useEffect(()=>{
        axios.get('http://localhost:8080/api/state',{
        headers: {
            "token": ` ${token}`
          }})
    .then((res)=>{
    //   console.log(res.data)
      setState(res.data.state)
    });
    },[])
    // console.log("State",state)
    
  return (
    <div>
      <label className='mx-4' htmlFor="state">Select State :</label>
      <select className="border-none" id="state" name="state" as="select">
          <option  value="">Select State</option>
           
          {state.map((ab) => {
            const {id} = ab
            return <option key={id} value={ab.id}>{ab.state_name}</option>;
          })}
        </select>
    </div>
  )
}

export default State
