import { useFormik } from 'formik'
import React, { useState } from 'react'
import { Button, Form, Spinner } from 'react-bootstrap'
import ReactInputMask from 'react-input-mask-next'
import * as Yup from "yup"
import { updateUser } from '../../../api/user-service'
import { toast } from '../../../utils/functions/swal'
import { userUpdate } from '../../../store/slices/auth-slice'

const ProfileForm = ({user}) => {

    const [loading, setLoading] = useState(false);

    const initialValues={
        firstName:user.firstName,
        lastName:user.lastName,
        phoneNumber:user.phoneNumber,
        address:user.address,
        zipCode:user.zipCode,
        email:user.email,
    }

    const validationSchema=Yup.object({
        firstName:Yup.string().required("Isminizi giriniz"),
        lastName:Yup.string().required("Soyadinizi giriniz"),
        phoneNumber:Yup.string().required().
            test("includes_", "Please enter your phone number",
            (value)=> value && !value.includes("_")),
        address:Yup.string().required("Adresinizi giriniz"),
        zipCode:Yup.string().required("-Zip code giriniz"),
        email:Yup.string().email().required("emailinizi giriniz")

    })

    const onSubmit = async(values) => {

        console.log(values);

        setLoading(true);
        try {
            
            await updateUser(values);
            //burada backend bize guncellenmıs bılgıyı gonderseydı
            //dispatch(userUpdate(values));
            toast("Your profile was update succesfully", "success");

        } catch (error) {
            
            toast(error.response.data.message , "error")

        }finally{
            setLoading(false);
        }

    }

    const formik=useFormik({
        initialValues,
        validationSchema,
        onSubmit
    })

  return (

    <Form noValidate onSubmit={formik.handleSubmit}>

        <Form.Group className="mb-3" >
            <Form.Label>First Name</Form.Label>
            <Form.Control type="text" 
            {...formik.getFieldProps("firstName")}
            isInvalid={formik.touched.firstName && formik.errors.firstName}
            isValid={formik.touched.firstName && !formik.errors.firstName}
            />
            <Form.Control.Feedback type='invalid'>{formik.errors.firstName}</Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3" >
            <Form.Label>Last Name</Form.Label>
            <Form.Control type="text" 
            {...formik.getFieldProps("lastName")}
            isInvalid={formik.touched.lastName && formik.errors.lastName}
            isValid={formik.touched.lastName && !formik.errors.lastName}
            />
            <Form.Control.Feedback type='invalid'>{formik.errors.lastName}</Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3" >
            <Form.Label>Phone Number</Form.Label>
            <Form.Control type="text"  
            as={ReactInputMask}
            mask="(999) 999-9999"
            {...formik.getFieldProps("phoneNumber")}
            isInvalid={formik.touched.phoneNumber && formik.errors.phoneNumber}
            isValid={formik.touched.phoneNumber && !formik.errors.phoneNumber}
            />
            <Form.Control.Feedback type='invalid'>{formik.errors.phoneNumber}</Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3" >
            <Form.Label>Address</Form.Label>
            <Form.Control type="text"  
            {...formik.getFieldProps("address")}
            isInvalid={formik.touched.address && formik.errors.address}
            isValid={formik.touched.address && !formik.errors.address}
            />
            <Form.Control.Feedback type='invalid'>{formik.errors.address}</Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3" >
            <Form.Label>zipCode</Form.Label>
            <Form.Control type="text" 
            {...formik.getFieldProps("zipCode")}
            isInvalid={formik.touched.zipCode && formik.errors.zipCode}
            isValid={formik.touched.zipCode && !formik.errors.zipCode}
            />
            <Form.Control.Feedback type='invalid'>{formik.errors.zipCode}</Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3">
            <Form.Label>Email address</Form.Label>
            <Form.Control type="email"  
            {...formik.getFieldProps("email")}
            isInvalid={formik.touched.email && formik.errors.email}
            isValid={formik.touched.email && !formik.errors.email}
            />
            <Form.Control.Feedback type='invalid'>{formik.errors.email}</Form.Control.Feedback>
        </Form.Group>

        <Button variant="primary" type="submit" disabled={loading}>
            {loading && <Spinner animation="border" size='sm' />}Update
        </Button>

    </Form>
  )
}

export default ProfileForm