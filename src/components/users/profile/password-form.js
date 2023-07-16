import { useFormik } from 'formik'
import React, { useState } from 'react'
import { Button, Form, Spinner } from 'react-bootstrap'
import ReactInputMask from 'react-input-mask-next'
import * as Yup from "yup"
import PasswordInput from '../../common/password-input/password-input'
import { updatePassword } from '../../../api/user-service'
import { toast } from '../../../utils/functions/swal'

const PasswordForm = () => {

    const [loading, setLoading] = useState(false);

    const initialValues={
        
        oldPassword: "",
        newPassword:"",
        passwordConfirm:""

    }

    const validationSchema=Yup.object({

        oldPassword:Yup.string().required("Şifrenizi giriniz"),
        newPassword:Yup.string().required("Yeni Şifrenizi giriniz").
            min(8 , "En az 8 karakter olmalı").matches(/[a-z]+/, "Bir Küçük harf olmalıdır").matches(/[A-Z]+/, "Bir Büyük harf olmalıdır")
            .matches(/\d+/ , "Bir numara giriniz"),
        passwordConfirm:Yup.string().required("Yeni Şifrenizi tekrar giriniz").oneOf([Yup.ref("newPassword")] , "Şifreler aynı olmalıdır"),
        

    })

    const onSubmit = async(values) => {

      setLoading(true);

      try {

        console.log(values);
        await updatePassword(values);
        toast("Your password was updated succesfully" ,"success");
        formik.resetForm(); 
        
      } catch (error) {
        
        toast(error.response.data.message ,"error");

      }
      finally{
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
            <Form.Label>Old Password</Form.Label>
            <PasswordInput
            {...formik.getFieldProps("oldPassword")}
            isInvalid={formik.touched.oldPassword && formik.errors.oldPassword}
            isValid={formik.touched.oldPassword && !formik.errors.oldPassword}
            error={formik.errors.oldPassword}
            />
          
        </Form.Group>

        <Form.Group className="mb-3" >
            <Form.Label>New Password</Form.Label>
            <PasswordInput
            {...formik.getFieldProps("newPassword")}
            isInvalid={formik.touched.newPassword && formik.errors.newPassword}
            isValid={formik.touched.newPassword && !formik.errors.newPassword}
            error={formik.errors.newPassword}
            />
          
        </Form.Group>

        <Form.Group className="mb-3" >
            <Form.Label>Password Confirm</Form.Label>
            <PasswordInput
            {...formik.getFieldProps("passwordConfirm")}
            isInvalid={formik.touched.passwordConfirm && formik.errors.passwordConfirm}
            isValid={formik.touched.passwordConfirm && !formik.errors.passwordConfirm}
            error={formik.errors.passwordConfirm}
            />
          
        </Form.Group>



        

        <Button variant="primary" type="submit" disabled={(!formik.dirty && !formik.isValid) ||loading}>
            {loading && <Spinner animation="border" size='sm' />}Update
        </Button>

    </Form>
  )
}

export default PasswordForm