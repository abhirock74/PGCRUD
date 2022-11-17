import React from 'react'
import Nav from '../Nav/Nav';
import { Link } from "react-router-dom";
const List = () => {
  return (
    <div>
      <Nav/>
      <div className='d-flex  justify-content-between mx-4 mt-3'>
      <h5 className='text-center mt-3'>Benificiary Lists</h5>
      <button type="button" class="btn btn-primary px-5">Add Benificiary</button>
      </div>
      <hr/>
    </div>
  )
}

export default List
