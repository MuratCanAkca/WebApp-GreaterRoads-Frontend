import { Formik } from 'formik'
import React, { useState } from 'react'
import {useFormik} from "formik"
import { Button, Form, Spinner } from 'react-bootstrap'
import * as Yup from "yup"
import PasswordInput from '../password-input/password-input'
import { getUser, login } from '../../../api/user-service'
import { toast } from '../../../utils/functions/swal'
import secureLocalStorage from 'react-secure-storage'
import { useDispatch } from 'react-redux'
import { loginFailed, loginSuccess } from '../../../store/slices/auth-slice'
import { useNavigate } from 'react-router-dom'

const LoginForm = () => {

  const [loading , setLoading] = useState(false);

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const initialValues = {
    email :"",
    password:"",
  }

  const validationSchema = Yup.object({
    email:Yup.string().email().required("Please enter your email"),
    password:Yup.string().required("Please enter your password")
  });

  const onSubmit  =async (values) => { 
    
    try {
      
      const respAuth = await login(values);
      //respAuto içinde tokeni bulundurucak
      secureLocalStorage.setItem("token",respAuth.data.token);
      //console.log(respAuth.data);
      const respUser = await getUser();
      console.log(respUser.data);
      dispatch(loginSuccess(respUser.data));
      navigate("/"); // öncekı sayfaya yonlendırır

    } catch (error) {
      
      dispatch(loginFailed());
      toast(error.response.data.message , "error");
      

    }finally{
      setLoading(false);
    }

   }

   const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit 
   })


  return (
    <Form noValidate onSubmit={formik.handleSubmit}>
      
      <Form.Group className="mb-3" >
        <Form.Label>email</Form.Label>
        <Form.Control
        type='email'
        {...formik.getFieldProps("email")} 
        isInvalid={formik.touched.email && formik.errors.email}
        isValid={formik.touched.email && !formik.errors.email}/>
        <Form.Control.Feedback>{formik.errors.email}</Form.Control.Feedback>
      </Form.Group>
      
      <Form.Group className="mb-3" >
        <Form.Label>Password</Form.Label>
        <PasswordInput
        {...formik.getFieldProps("password")} 
        isInvalid={formik.touched.password && formik.errors.password}
        isValid={formik.touched.password && !formik.errors.password}
        error={formik.errors.password}
        />
      </Form.Group>
        
       <Button variant='primary' type='submit' disabled={loading}>
       {loading && <Spinner animation='border' size='sm'/>} Login
       </Button>
    </Form>
  )
}

export default LoginForm