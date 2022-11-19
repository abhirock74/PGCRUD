import React, { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import Nav from '../Nav/Nav';
import axios from "axios";
import {useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AddBenificary = () => {
  const [notification, setnotification] = useState('')
  const navigate = useNavigate();
    const formik = useFormik({
        initialValues: {
        },
    
        onSubmit: values => {
            let token = sessionStorage.getItem('token');
            let data ={
                state:stateId,
                district:districtId,
                block:blockId
            };
            console.log(data)
            const formValue = Object.assign(values, data);
            console.log("abhi",formValue)
  
            axios
            .post(`http://localhost:8080/api/beneficiary`, formValue,{
              headers: {
                "token": ` ${token}`
              }
            })
            .then((res) => {
              // console.log(res);
              setnotification(toast.error(res.data.message,{position:toast.POSITION.TOP_CENTER}))
              console.log(res.data.message);
              if(res.data.message=="beneficiary create Successful"){
                navigate('/benificarylists');
              }
            })
            .catch((err) => {
              console.log(err.response.data.message);
              setnotification(toast.success(err.response.data.message,{position:toast.POSITION.TOP_CENTER}))
            });
          },
      });
        const [state, setState] = useState([]);
        const [stateId , setStateId] = useState('1');
        const [district , setDistrict] = useState([]);
        const [districtId, setdistrictId] = useState([]);
        const[block, setBlock]= useState([]);
        const[blockId, setBlockId]= useState('');
        const [village , setVillage]= useState([])
        // console.log("state", stateId);
        // console.log("district", districtId);
        // console.log("BLOCK", blockId);
        const getState = () =>{
            const token = sessionStorage.getItem('token');
            axios.get('http://localhost:8080/api/state',{
                headers: {
                  "token": ` ${token}`
                }
              })
            .then((res)=>{
              setState(res.data.state);
            });
          };
        const getDistrict = () =>{
            const token = sessionStorage.getItem('token');
            axios.get('http://localhost:8080/api/district',{
                headers: {
                  "token": ` ${token}`,
                  "state_id":`${stateId}`
                }
              })
            .then((res)=>{
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
            });
          };
          const handelState =(e)=>{
            setStateId(e.target.value);
          }
          const handelDistrict =(e)=>{
            setdistrictId(e.target.value)
          };
          const handelBlock = (e)=>{
            setBlockId(e.target.value)
          }
         
      useEffect(()=>{
        getState()
      },[]);
      useEffect(()=>{
        getDistrict()
      },stateId);
      useEffect(()=>{
        getBlock()
      },[districtId]);
      useEffect(()=>{
        getVillage()
      },[blockId])
      return (
        <>
        <Nav/>
        <h4 className='d-flex justify-content-center my-3'>Add Benificary</h4>
        <div className='d-flex justify-content-center'>
        <form className='border w-50 p-5' onSubmit={formik.handleSubmit}>

        <div className='justify-content-around mt-2'>
          <label htmlFor="state ">Select State :</label> <br />
          <select className='w-100 p-1' name="state" id="state" form="state"
           onChange={handelState} value={formik.values.state}>
            <option selected>----Select State ----</option>
            {state.map((ab) => {
            const {id} = ab
            return <option key={id} value={ab.id}>{ab.state_name}</option>;
          })}
          </select>
          </div>
        <div className='justify-content-around mt-2'>
          <label htmlFor="district ">Select district :</label> <br />
          <select className='w-100 p-1' name="district" id="district" form="district"
          onChange={handelDistrict} value={formik.values.district}>
            <option selected>----Select District ----</option>
           {district.map((ab) => {
            const {id} = ab
            return <option key={id} value={ab.id}>{ab.district_name}</option>;
          })}
          </select>
        </div>

        <div className='justify-content-around mt-2'>
          <label htmlFor="block ">Select Block :</label> <br />
          <select className='w-100 p-1' name="block" id="block" form="block"
          onChange={handelBlock} value={formik.values.block}>
            <option selected>----Select Block ----</option>
            {block.map((ab) => {
            const {id} = ab
            return <option key={id} value={ab.id}>{ab.block_name}</option>;
          })}
          </select>
        </div>

        <div className='justify-content-around mt-2'>
          <label htmlFor="village">Select Village :</label> <br />
          <select className='w-100 p-1' name="village" id="village" form="village"
          onChange={formik.handleChange} value={formik.values.village}>
            <option selected>----Select Village ----</option>
            {village.map((ab) => {
            const {id} = ab
            return <option key={id} value={ab.id}>{ab.vill_name}</option>;
          })}
          </select>
        </div>

          <div className='justify-content-around'>
          <label htmlFor="first_name">First Name :</label> <br />
          <input className='w-100 p-1' id="nfirst_nameame" name="first_name" type="text" onChange={formik.handleChange} 
            value={formik.values.first_name}/>
          </div>
    
          <div className='justify-content-around mt-2'>
          <label htmlFor="email">Email :</label> <br />
          <input className='w-100 p-1' id="email " name="email" type="text " onChange={formik.handleChange} 
            value={formik.values.email}/>
          </div>
          <div className='justify-content-around mt-2'>
          <label htmlFor="mobile">Mobile :</label> <br />
          <input className='w-100 p-1' id="mobile " name="mobile" type="text " onChange={formik.handleChange} 
            value={formik.values.mobile}/>
          </div>
         
          <div className='justify-content-around mt-2'>
          <label htmlFor="gender">Select Gender :</label> <br />
          <select className='w-100 p-1' name="gender" id="gender" form="gender"
          onChange={formik.handleChange} value={formik.values.gender}>
            <option selected>----</option>
            <option value="0">Male</option>
            <option value="1">Female</option>
          </select>
        </div>

          <div className='justify-content-around mt-2'>
          <label htmlFor="education">Select Education :</label> <br />
          <select className='w-100 p-1' name="education" id="education" form="education"
          onChange={formik.handleChange} value={formik.values.education}>
            <option value="0">8 th</option>
            <option value="1">9 th</option>
            <option value="2">10 th</option>
            <option value="3">11 th</option>
            <option value="4">12 th</option>
            <option value="5">Graduation</option>
            <option value="6">Postgraduation</option>
          </select>
        </div>
        <div className='justify-content-around mt-2'>
          <label htmlFor="address">Address :</label> <br />
          <textarea className='w-100 p-1' id="address " name="address" rows="4" cols="50" onChange={formik.handleChange} 
            value={formik.values.address}/>
          </div>
          <div className='justify-content-around mt-2'>
          <label htmlFor="photo ">Photo :</label> <br />
          <input disabled className='w-100 p-1' id="photo " name="photo " type="file" onChange={formik.handleChange} 
            value={formik.values.photo }/>
          </div>
          <button class="btn btn-primary mt-3 px-4 py-2" type="submit">Submit</button>
        </form>
        </div>
        <ToastContainer />
        </>
      );
}

export default AddBenificary
