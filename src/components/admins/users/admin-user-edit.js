import { useFormik } from 'formik'
import React, { useEffect, useState } from 'react'

import { Alert, Button, ButtonGroup, Col, Form, Row, Spinner } from 'react-bootstrap'
import ReactInputMask from 'react-input-mask-next'
import * as Yup from "yup"
import { deleteUserById, getUserById, updateUser, updateUserById } from '../../../api/user-service'
import { question, toast } from '../../../utils/functions/swal'
import { useNavigate, useParams } from 'react-router-dom'
import Loading from '../../common/loading.js/loading'

const AdminUserEdit = () => {

    const [saving , setSaving]=useState(false);
    const [deleting , setDeleting ]=useState(false);
    const [loading, setLoading] = useState(true)
    const navigate=useNavigate();
    const {userId} =useParams();

    //const [loading, setLoading] = useState(false);
 
    const [initialValues, setInitialValues] = useState({

        firstName:"",
        lastName:"",
        phoneNumber:"",
        email:"",
        address:"",
        zipCode:"",
        userName:"",
        password:"",
        roles:[],
        builtIn: false,


    })

    const validationSchema=Yup.object({
        firstName:Yup.string().required("Isminizi giriniz"),
        lastName:Yup.string().required("Soyadinizi giriniz"),
        phoneNumber:Yup.string().required("Telefon numaranizi giriniz"),
        address:Yup.string().required("Adresinizi giriniz"),
        zipCode:Yup.string().required("-Zip code giriniz"),
        email:Yup.string().email().required("emailinizi giriniz"),
        roles:Yup.array().required("Please select a role"),
        password:Yup.string(),

    })

    const onSubmit =async (values) => {
        setSaving(true);
        
        const data = {...values};
        if(!data.password){
            delete data.password
        } 

        try {
            
            await updateUserById(userId , data);
            toast("User was updated" , "success")

        } catch (error) {
         
            toast(error.response.data.message, "error");
            
        }finally{
            setSaving(false);
        }
       

    }

    const formik=useFormik({
        initialValues,
        validationSchema,
        onSubmit,
        enableReinitialize: true,
        //sonradan formık initialValues egerini tekrar initialize yapmak ıcın kullanıldı

    })

    const loadData = async() => { 
        
        try {
            
            const resp = await getUserById(userId);
            setInitialValues({...resp.data , password:""});
           // console.log(resp.data);

        } catch (error) {
            
            console.log(error);
        }finally{
            setLoading(false);
        }
     }

     useEffect(() => {
     
        loadData();

     }, [])

     const removeUser =async () => { 
        
        setDeleting(true);

        try {
            
            await deleteUserById(userId);
            toast("User was delete" , "success");
            navigate("/admin/users")

        } catch (error) {
            toast(error.response.data.message , "error");
        }finally{
            setDeleting(false);
        }

      }
     
     const handleDelete = () => { 
        
       question("Are you sure to delete" , "You wont be able to revert this!").
       then((result) => {
        if(result.isConfirmed){
            removeUser();
        }
       })

      }


  return (

    loading ? (Loading):(

    <Form noValidate onSubmit={formik.handleSubmit}>

        <Row>

        <Form.Group as={Col} md={6} lg={4} className="mb-3" >
            <Form.Label>First Name</Form.Label>
            <Form.Control type="text" 
            {...formik.getFieldProps("firstName")}
            isInvalid={formik.touched.firstName && formik.errors.firstName}
            isValid={formik.touched.firstName && !formik.errors.firstName}
            />
            <Form.Control.Feedback type='invalid'>{formik.errors.firstName}</Form.Control.Feedback>
        </Form.Group>

        <Form.Group as={Col} md={6} lg={4} className="mb-3" >
            <Form.Label>Last Name</Form.Label>
            <Form.Control type="text" 
            {...formik.getFieldProps("lastName")}
            isInvalid={formik.touched.lastName && formik.errors.lastName}
            isValid={formik.touched.lastName && !formik.errors.lastName}
            />
            <Form.Control.Feedback type='invalid'>{formik.errors.lastName}</Form.Control.Feedback>
        </Form.Group>

        <Form.Group as={Col} md={6} lg={4} className="mb-3" >
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

        <Form.Group as={Col} md={6} lg={4} className="mb-3">
            <Form.Label>Email address</Form.Label>
            <Form.Control type="email"  
            {...formik.getFieldProps("email")}
            isInvalid={formik.touched.email && formik.errors.email}
            isValid={formik.touched.email && !formik.errors.email}
            />
            <Form.Control.Feedback type='invalid'>{formik.errors.email}</Form.Control.Feedback>
        </Form.Group>

        <Form.Group as={Col} md={6} lg={4} className="mb-3" >
            <Form.Label>Address</Form.Label>
            <Form.Control type="text"  
            {...formik.getFieldProps("address")}
            isInvalid={formik.touched.address && formik.errors.address}
            isValid={formik.touched.address && !formik.errors.address}
            />
            <Form.Control.Feedback type='invalid'>{formik.errors.address}</Form.Control.Feedback>
        </Form.Group>

        <Form.Group as={Col} md={6} lg={4} className="mb-3" >
            <Form.Label>zipCode</Form.Label>
            <Form.Control type="text" 
            {...formik.getFieldProps("zipCode")}
            isInvalid={formik.touched.zipCode && formik.errors.zipCode}
            isValid={formik.touched.zipCode && !formik.errors.zipCode}
            />
            <Form.Control.Feedback type='invalid'>{formik.errors.zipCode}</Form.Control.Feedback>
        </Form.Group>

        <Form.Group as={Col} md={6} lg={4} className="mb-3" >
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" 
            {...formik.getFieldProps("password")}
            isInvalid={formik.touched.password && formik.errors.password}
            isValid={formik.touched.password && !formik.errors.password}
            />
            <Form.Control.Feedback type='invalid'>{formik.errors.password}</Form.Control.Feedback>
        </Form.Group>

        <Form.Group as={Col} md={6} lg={4} className='mb-3'>
            <Form.Label>Roles</Form.Label>

            <div>
                <Form.Check label="Customer" type='checkbox' name='roles' value="Customer" 
                checked={formik.values.roles.includes("Customur")} onChange={formik.handleChange}/>
                <Form.Check label="Admin" type='checkbox' name='roles' value="Administrator" 
                checked={formik.values.roles.includes("Administrator")} onChange={formik.handleChange}/>
            </div>

        </Form.Group>
       
        </Row>

        {initialValues.builtIn && (
            <Alert variant='danger'>Build-in account can not be deleted and updated</Alert>
        )}

        <div className='text-end'>

            <ButtonGroup aria-label='Basic example'>

            <Button variant='secondary' type="button" onClick={()=>navigate(-1)} >Cancel</Button>

            {!initialValues.builtIn && (

                <>

                    <Button variant="primary" type="submit" disabled={saving}>
                        {saving && <Spinner animation="border" size='sm' />}Update
                    </Button>

                    <Button variant="danger" type="button" disabled={deleting} onClick={handleDelete} >
                        {deleting && <Spinner animation="border" size='sm' />}Delete
                    </Button>

                </>

            )}



            </ButtonGroup>

        </div>

    </Form>
  )
  )
}

export default AdminUserEdit