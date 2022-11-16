import React from 'react'
import './login.css';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup'
import axios from 'axios'
// import { Link, useNavigate } from "react-router-dom";


const initialValues = {
    username: '',
    password: ''
  }
  const validationSchema = Yup.object({
    username: Yup.string().required('Password is required !'),
    password: Yup.string().required('Password is required !')
  })
const Login = () => {

const onSubmit = values =>{
    console.log(values);
    axios
    .post(
      `http://localhost:8080/api/login`,
      { username: values.username, password: values.password },
    )
    .then((res) => {
      sessionStorage.setItem('token', (res.data.token))
      if (res.data.token) {
       console.log(res.data.token)
        // navigate('/home')
        let token = res.data.token
        let payload = token.split(".")
        let data = atob(payload[1]);
        console.log(JSON.parse(data))

        sessionStorage.setItem('paylode', data)
      } else {
        console.log("unauthorized")
      }
    })
    .catch((err) => {
    //   seterror(err.response.data.message)
    });

}
  return (
    <div>
        <section className="vh-100">
  <div className="container py-5 h-100">
    <div className="row d-flex align-items-center justify-content-center h-100">
      <div className="col-md-8 col-lg-7 col-xl-6">
        <img
          src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.svg"
          className="img-fluid"
          alt="Phone image"
        />
      </div>
      <div className="col-md-7 col-lg-5 col-xl-5 offset-xl-1 border rounded p-5">
        <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
        >
        <Form>
          {/* Email input */}
          <div className="form-outline mb-4">
          <ErrorMessage className='text-red' name='username' component='p' />
            <Field
              type="text"
              name="username"
              id="username"
              className="form-control form-control-lg"
            />
            <label className="form-label" htmlFor="username">
                username
            </label>
          </div>
          {/* Password input */}
          <div className="form-outline mb-4">
          <ErrorMessage className='text-red' name='password' component='p' />
            <Field
              type="password"
              id="password"
              name="password"
              className="form-control form-control-lg"
            />
            <label className="form-label" htmlFor="password">
              Password
            </label>
          </div>
          <div className="d-flex justify-content-around align-items-center mb-4 ">
            {/* Checkbox */}
            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                defaultValue=""
                id="form1Example3"
                defaultChecked=""
              />
              <label className="form-check-label" htmlFor="form1Example3">
                {" "}
                Remember me{" "}
              </label>
            </div>
            <a href="#!">Forgot password?</a>
          </div>
          {/* Submit button */}
          <button type="submit" className="btn btn-primary btn-lg btn-block">
            Sign in
          </button>
        </Form>
        </Formik>
        
      </div>
    </div>
  </div>
</section>

    </div>
  )
}

export default Login
