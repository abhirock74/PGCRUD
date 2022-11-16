import React, { useEffect, useState } from 'react';
import axios from 'axios';


const Village = () => {
    const [village, setvillage]= useState([])
    const token = sessionStorage.getItem('token');
    useEffect(()=>{
        axios.get('http://localhost:8080/api/village',{
        headers: {
            "token": ` ${token}`
          }})
    .then((res)=>{
    //   console.log(res.data)
      setvillage(res.data.Village)
    });
    },[])
    
  return (
    <div>
      <select className=" rounded-sm font-medium village w-full mb-2 px-3 mt-2 py-1x border
             border-gray-300 placeholder-gray-500 text-gray-900 
             sm:text-sm" id="village" name="village" as="select">
          <option  value="">Select village</option>
           
          {village.map((ab) => {
            const {id} = ab
            return <option key={id} value={ab.id}>{ab.vill_name}</option>;
          })}
        </select>
    </div>
  )
}

export default Village
