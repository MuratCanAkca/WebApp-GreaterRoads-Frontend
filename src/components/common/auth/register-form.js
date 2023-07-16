import React, { useState } from 'react'
import InputMask from "react-input-mask-next"
import PasswordInput from '../password-input/password-input'
import { Button, Form, Spinner } from 'react-bootstrap'
import * as Yup from "yup"
import {useFormik} from "formik"
import { register } from '../../../api/user-service'
import { toast } from '../../../utils/functions/swal'

const RegisterForm = ({setDefaultTab}) => {

  const [loading , setLoading] =useState(false);

    const initialValues = {
        firstName:"",
        lastName:"",
        phoneNumber:"",
        address:"",
        zipcode:"",
        email:"",
        password:"",
        confirmPassword:"",
    }

    const validationSchema = Yup.object({
        firstName:Yup.string().required("Please enter your first name"),
        lastName:Yup.string().required("Please enter your last name"),
        phoneNumber:Yup.string().required("Please enter your Phone Number"),
        address:Yup.string().required("Please enter your address"),
        zipcode:Yup.string().required("Please enter your zipCode"),
        email:Yup.string().email().required("Please enter your email"),
        password:Yup.string().required("Please enter your password")
        .min(8 , "Must be at least 8 characters")
        .matches(/[a-z]+/,"Bir tane küçük harf girilmeli")
        .matches(/[A-Z]+/,"Bir tane büyük harf girilmeli")
        //.matches(/[]+/,"Özel karakter girilmemelidir")
        .matches(/\d+/,"Bir sayı girilmelidir"),
        confirmPassword:Yup.string().required("Please re-enter your password")
        .oneOf([Yup.ref("password")] , "Girilen şifre öncekiyle aynı olmalı"),
    })

    const onSubmit = async(values) => {

      console.log(values);
      
      setLoading(true);
      
      try {
     
        const resp = await register(values);
        toast("You are registered succesfully" ,"success");
        formik.resetForm();
        setDefaultTab("login");

      } catch (error) {
      
        toast(error.response.data.message, "error") 
        
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
        <Form.Label>First Name</Form.Label>
        <Form.Control
        type='text'
        {...formik.getFieldProps("firstName")} 
        isInvalid={formik.touched.firstName && formik.errors.firstName}
        isValid={formik.touched.firstName && !formik.errors.firstName}/>
        <Form.Control.Feedback>{formik.errors.firstName}</Form.Control.Feedback>
      </Form.Group>

      <Form.Group className="mb-3" >
        <Form.Label>Last Name</Form.Label>
        <Form.Control
        type='text'
        {...formik.getFieldProps("lastName")} 
        isInvalid={formik.touched.lastName && formik.errors.lastName}
        isValid={formik.touched.lastName && !formik.errors.lastName}/>
        <Form.Control.Feedback>{formik.errors.lastName}</Form.Control.Feedback>
      </Form.Group>

      <Form.Group className="mb-3" >
        <Form.Label>Phone Number</Form.Label>
        <Form.Control
        type='text'
        as = {InputMask}
        mask="(999) 999-9999"
        {...formik.getFieldProps("phoneNumber")} 
        isInvalid={formik.touched.phoneNumber && formik.errors.phoneNumber}
        isValid={formik.touched.phoneNumber && !formik.errors.phoneNumber}/>
        <Form.Control.Feedback>{formik.errors.phoneNumber}</Form.Control.Feedback>
      </Form.Group>

      <Form.Group className="mb-3" >
        <Form.Label>Address</Form.Label>
        <Form.Control
        type='text'
        {...formik.getFieldProps("address")} 
        isInvalid={formik.touched.address && formik.errors.address}
        isValid={formik.touched.address && !formik.errors.address}/>
        <Form.Control.Feedback>{formik.errors.address}</Form.Control.Feedback>
      </Form.Group>

      <Form.Group className="mb-3" >
        <Form.Label>Zip Code</Form.Label>
        <Form.Control
        type='text'
        {...formik.getFieldProps("zipcode")} 
        isInvalid={formik.touched.zipcode && formik.errors.zipcode}
        isValid={formik.touched.zipcode && !formik.errors.zipcode}/>
        <Form.Control.Feedback>{formik.errors.zipcode}</Form.Control.Feedback>
      </Form.Group>

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

      <Form.Group className="mb-3" >
        <Form.Label>Confirm Password</Form.Label>
        <PasswordInput
        {...formik.getFieldProps("confirmPassword")} 
        isInvalid={formik.touched.confirmPassword && formik.errors.confirmPassword}
        isValid={formik.touched.confirmPassword && !formik.errors.confirmPassword}
        error={formik.errors.confirmPassword}
        />
      </Form.Group>
      
      
        
       <Button variant='primary' type='submit' disabled={loading}>
          {loading && <Spinner animation='border' size='sm'/>}Register
       </Button>
    </Form>
  )
}

export default RegisterForm