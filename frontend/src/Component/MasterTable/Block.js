import React, { useEffect, useState } from 'react';
import axios from 'axios';


const Block = () => {
    const [block, setblock]= useState([])
    const token = sessionStorage.getItem('token');
    useEffect(()=>{
        axios.get('http://localhost:8080/api/block',{
        headers: {
            "token": ` ${token}`
          }})
    .then((res)=>{
    //   console.log(res.data)
      setblock(res.data.block)
    });
    },[])
    
  return (
    <div>
      <select className=" rounded-sm font-medium block w-full mb-2 px-3 mt-2 py-1x border
             border-gray-300 placeholder-gray-500 text-gray-900 
             sm:text-sm" id="block" name="block" as="select">
          <option  value="">Select block</option>
           
          {block.map((ab) => {
            const {id} = ab
            return <option key={id} value={ab.id}>{ab.block_name}</option>;
          })}
        </select>
    </div>
  )
}

export default Block
