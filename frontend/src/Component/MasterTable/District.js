import React, { useEffect, useState } from 'react';
import axios from 'axios';


const District = () => {
  const [district, setdistrict] = useState([])
  const token = sessionStorage.getItem('token');
  useEffect(() => {
    axios.get('http://localhost:8080/api/district', {
      headers: {
        "token": ` ${token}`
      }
    })
      .then((res) => {
        //   console.log(res.data)
        setdistrict(res.data.District)
      });
  }, [])

  return (
    <div>
      <label className='mx-4' htmlFor="state">Select District :</label>
      <select className="" id="district" name="district" as="select">
        <option value="">Select district</option>

        {district.map((ab) => {
          const { id } = ab
          return <option key={id} value={ab.id}>{ab.district_name}</option>;
        })}
      </select>
    </div>
  )
}

export default District
