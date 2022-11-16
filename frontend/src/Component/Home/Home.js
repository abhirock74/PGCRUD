import React from 'react';
import Nav from '../Nav/Nav';
import Form from '../BenificaryForm/benificForm';
import { Outlet, Link } from 'react-router-dom'
const Home = () => {
  return (
    <div>
        <Nav/>
        <Form/>
    </div>
  )
}

export default Home;
