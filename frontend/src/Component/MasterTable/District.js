import React, { useEffect, useState } from 'react';
import axios from 'axios';


const District = () => {
    const [district, setdistrict]= useState([])
    const token = sessionStorage.getItem('token');
    useEffect(()=>{
        axios.get('http://localhost:8080/api/district',{
        headers: {
            "token": ` ${token}`
          }})
    .then((res)=>{
    //   console.log(res.data)
      setdistrict(res.data.District)
    });
    },[])
    
  return (
    <div>
      <select className=" rounded-sm font-medium block w-full mb-2 px-3 mt-2 py-1x border
             border-gray-300 placeholder-gray-500 text-gray-900 
             sm:text-sm" id="district" name="district" as="select">
          <option  value="">Select district</option>
           
          {district.map((ab) => {
            const {id} = ab
            return <option key={id} value={ab.id}>{ab.district_name}</option>;
          })}
        </select>
    </div>
  )
}

export default District
