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
      <select className=" rounded-sm font-medium block w-full mb-2 px-3 mt-2 py-1x border
             border-gray-300 placeholder-gray-500 text-gray-900 
             sm:text-sm" id="state" name="state" as="select">
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
