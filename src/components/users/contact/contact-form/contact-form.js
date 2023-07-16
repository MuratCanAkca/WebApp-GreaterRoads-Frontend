import React, { useState } from 'react'
import { Button, Col, Container, Form, Row, Spinner } from 'react-bootstrap'
import SectionHeader from '../../common/section-header/section-header'
import ContactInfo from '../contact-info'
import * as Yup from "yup";
import { useFormik } from 'formik';
import "./contact-form.scss"
import { sendMessage } from '../../../../api/contact-service';
import { toast } from '../../../../utils/functions/swal';

const ContactForm = () => {

    const [loading, setLoading] = useState(false)

    const initialValues={
        name:"",
        subject:"",
        body:"",
        email:"",

    }

    const validationSchema=Yup.object({
        name:Yup.string().required("Isminizi giriniz"),
        subject:Yup.string().max(50 , "Your message should be max 50 char").min(5 , "Your message should be min 5 char").required("Soyadinizi giriniz"),
        body:Yup.string().max(200 , "Your message should be max 50 char").min(20 , "Your message should be min 20 char").required("Adresinizi giriniz"),
        email:Yup.string().email().required("emailinizi giriniz")

    })

    const onSubmit = async(values) => {

        setLoading(true);

        try {
            
            await sendMessage(values);
            formik.resetForm();
            toast("Your message is send" , "success")

        } catch (error) {
            
            console.log(error);

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
    
    <Container className='contact-form'>
        <Row>
            <Col md={6}>
                <SectionHeader title="Contact Us" subTitle="Need additional info?" />
                <p>Looking for a small or medium economy car rental or something a little larger to fit all the family? We have a great range pf new and comfortable renral
                    cars to choose from. Browse our fleet range now and rent a car online today. if you have ask please send us
                </p>
                <ContactInfo/>
            </Col>
            <Col md={6}>

                                            <Form noValidate onSubmit={formik.handleSubmit}>

                                <Form.Group className="mb-3" >
                                    <Form.Label>Name</Form.Label>
                                    <Form.Control type="text" 
                                    {...formik.getFieldProps("name")}
                                    isInvalid={formik.touched.name && formik.errors.name}
                                    isValid={formik.touched.name && !formik.errors.name}
                                    />
                                    <Form.Control.Feedback type='invalid'>{formik.errors.name}</Form.Control.Feedback>
                                </Form.Group>

                                <Form.Group className="mb-3" >
                                    <Form.Label>Subject</Form.Label>
                                    <Form.Control type="text" 
                                    {...formik.getFieldProps("subject")}
                                    isInvalid={formik.touched.subject && formik.errors.subject}
                                    isValid={formik.touched.subject && !formik.errors.subject}
                                    />
                                    <Form.Control.Feedback type='invalid'>{formik.errors.subject}</Form.Control.Feedback>
                                </Form.Group>

                                <Form.Group className="mb-3" >
                                    <Form.Label>Body</Form.Label>
                                    <Form.Control   
                                    as="textarea"
                                    rows={3}
                                    maxLength={200}
                                    type="text"
                                    
                                    {...formik.getFieldProps("body")}
                                    isInvalid={formik.touched.body && formik.errors.body}
                                    isValid={formik.touched.body && !formik.errors.body}
                                    />
                                    <Form.Control.Feedback type='invalid'>{formik.errors.body}</Form.Control.Feedback>
                                </Form.Group>

                                <Form.Group className="mb-3" >
                                    <Form.Label>Email</Form.Label>
                                    <Form.Control type="email"  
                                    {...formik.getFieldProps("email")}
                                    isInvalid={formik.touched.email && formik.errors.email}
                                    isValid={formik.touched.email && !formik.errors.email}
                                    />
                                    <Form.Control.Feedback type='invalid'>{formik.errors.email}</Form.Control.Feedback>
                                </Form.Group>

                                

                                <Button variant="primary" type="submit" 
                                disabled={!(formik.dirty && formik.isValid) || loading}>
                                    {loading && <Spinner animation="border" size='sm' />}Send
                                </Button>

                                </Form>


            </Col>
        </Row>
    </Container>
    
  )
}

export default ContactForm