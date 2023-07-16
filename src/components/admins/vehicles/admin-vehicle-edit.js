import { useFormik } from 'formik';
import React, { useEffect, useRef, useState } from 'react'
import { Alert, Badge, Button, ButtonGroup, Col, Form, Row, Spinner} from 'react-bootstrap'
import * as Yup from "yup";
import "./admin-vehicle-new.scss"
import { createVehicle, getVehicle, updateVehicle, uploadVehicleImage } from '../../../api/vehicle-service';
import { question, toast } from '../../../utils/functions/swal';
import { useNavigate, useParams } from 'react-router-dom';
import Loading from '../../common/loading.js/loading';
import { getVehicleImage } from '../../../utils/functions/vehicle';
import {deleteVehicleById} from "../../../api/vehicle-service"


let isImageChanged = false;

const AdminVehicleEdit = () => {

    const [imageSrc, setImageSrc] = useState("");
    const fileImageRef = useRef();
    const [loading, setLoading] = useState(false)
    const navigate=useNavigate();
    const {vehicleId} = useParams();
    const [saving, setSaving] = useState(false);
    const [deleting , setDeleting ]=useState(false);
    

    const [initialValues, setInitialValues] = useState({

        model: "",
        doors: "",
        seats: "",
        luggage: "",
        transmission: "",
        airConditioning: "",
        fuelType: "",
        age: "",
        pricePerHour: "",
        image:"",

    })
    
    

    const validationSchema = Yup.object({
        model:Yup.string().required("Modeli giriniz"),
        doors:Yup.number().required("Kapı sayisini giriniz"),
        seats:Yup.number().required("Koltuk sayisini giriniz"),
        luggage:Yup.number().required("Luggage giriniz"),
        transmission:Yup.string().required("Vites türünü giriniz"),
        airConditioning:Yup.string().required("Klima var mi yok mu giriniz"),
        fuelType:Yup.string().required("Yakıt türünü giriniz"),
        age:Yup.number().required("Yaşini giriniz"),
        pricePerHour:Yup.number().required("Saatlik ücretini giriniz"),
        image:Yup.mixed().required("Resim giriniz"),

    })

    const onSubmit =async (values) => { 
        
       setSaving(true);

       try {

        let imageId = values.image[0];
        
        //isİmageChange görüntü değiştirildiğinde true olacak
        if(isImageChanged){
            
            //veritabanı foto silme işini buraya yazıcaksın

            const newImageFile = fileImageRef.current.files[0];
            const formData = new FormData();
            formData.append("file" , newImageFile);
            const resp = await uploadVehicleImage();
            imageId = resp.data.imageId;
            isImageChanged=false;

        }

        const payload = {...values};
        delete payload.image;

        await updateVehicle(imageId , vehicleId , payload);
        toast("Vehicle update succesfully", "success");
       console.log(values);
        
       } catch (error) {
        console.log(error);
        toast(error.response.data.message , "error");
       }finally{
        setSaving(false);
       }

     }

     const formik = useFormik ({
        initialValues,
        validationSchema,
        onSubmit,
        enableReinitialize: true
     })

     //******************************** */

    const isError = (field) => { 

        return(

        formik.touched[field] && formik.errors[field]
        
        )
    }


    const handleSelectImage = () => { 
        
        fileImageRef.current.click();

     }

    const handleImageChange = () => { 
        
        const file = fileImageRef.current.files[0];
        if(!file) return;

        //formik.setFieldValue("image" , file);
        //formik statenin manuel olarak set etme işlemi. Seçilen dosyayı image alanına yerleştirdik

        const reader = new FileReader();
        reader.readAsDataURL(file);

        reader.onloadend = () => {
            setImageSrc(reader.result);
        }
        //standart file upload işlemidir 
        isImageChanged=true;
     }


     const removeVehicle =async () => { 
        
        setDeleting(true);

        try {
            
            await deleteVehicleById(vehicleId);
            toast("Vehicle was delete" , "success");
            navigate("/admin/vehicles")

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
             removeVehicle();
         }
        })
 
       }



      const loadData = async () => {
        setLoading(true);

        try {
            
            const resp = await getVehicle(vehicleId);
            setInitialValues(resp.data);
            setImageSrc(getVehicleImage(resp.data.image))
            console.log(resp.data.image);


        } catch (error) {
            console.log(error);
        }finally{
            setLoading(false);
        }


      }

      useEffect(() => {
    
        loadData();
      }, [])
      



  return (
    loading ?( <Loading/>) :(
    <Form noValidate onSubmit={formik.handleSubmit} >
        <Row>
            <Col xl={3} className='image-area' >

                <Form.Control type='file' name='image' className='d-none' onChange={handleImageChange} ref={fileImageRef} />
                <img src={imageSrc} className='img-fluid' alt='Please select image'/>
                {formik.errors.image && 
                (
                    <Badge bg='danger' className='image-area-error'>
                        Please Select an Image
                    </Badge>
                    //parentında bulunan sıze uyumludur arastır badge
                )}
                <Button variant={formik.errors.image ? "danger" : "primary"} onClick={handleSelectImage} >Select Image</Button>
           
            </Col>

            <Col lg={9}>

                <Row>

                    <Form.Group as={Col} md={4} lg={3} className='mb-3'>
                        <Form.Label>Model</Form.Label>
                        <Form.Control type='text'
                        {...formik.getFieldProps("model")}
                        className={isError("model") && "is-invalid"}
                        />
                        <Form.Control.Feedback type='invalid' >
                            {formik.errors.model}
                        </Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group as={Col} md={4} lg={3} className='mb-3'>
                        <Form.Label>Doors</Form.Label>
                        <Form.Control type='number'
                        {...formik.getFieldProps("doors")}
                        className={isError("doors") && "is-invalid"}
                        />
                        <Form.Control.Feedback type='invalid' >
                            {formik.errors.doors}
                        </Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group as={Col} md={4} lg={3} className='mb-3'>
                        <Form.Label>Seats</Form.Label>
                        <Form.Control type='number'
                        {...formik.getFieldProps("seats")}
                        className={isError("seats") && "is-invalid"}
                        />
                        <Form.Control.Feedback type='invalid' >
                            {formik.errors.seats}
                        </Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group as={Col} md={4} lg={3} className='mb-3'>
                        <Form.Label>Luggage</Form.Label>
                        <Form.Control type='number'
                        {...formik.getFieldProps("luggage")}
                        className={isError("luggage") && "is-invalid"}
                        />
                        <Form.Control.Feedback type='invalid' >
                            {formik.errors.luggage}
                        </Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group as={Col} md={4} lg={3} className='mb-3'>
                        <Form.Label>Transmission</Form.Label>
                        <Form.Select
                        {...formik.getFieldProps("transmission")}
                        className={isError("transmission") && "is-invalid"} >
                            <option>Select</option>
                                <option value="Automatic">Automatic</option>
                                <option value="Manuel">Manuel</option>
                                <option value="Triptonic">Triptonic</option>
                        </Form.Select>
                        <Form.Control.Feedback type='invalid' >
                            {formik.errors.transmission}
                        </Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group as={Col} md={4} lg={3} className='mb-3'>
                        <Form.Label>Air Conditioning</Form.Label>
                        <Form.Select
                        {...formik.getFieldProps("airConditioning")}
                        className={isError("airConditioning") && "is-invalid"} >
                            <option>Select</option>
                                <option value={true}>Yes</option>
                                <option value={false}>No</option>
                        </Form.Select>
                        <Form.Control.Feedback type='invalid' >
                            {formik.errors.airConditioning}
                        </Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group as={Col} md={4} lg={3} className='mb-3'>
                        <Form.Label>Fuel Type</Form.Label>
                        <Form.Select
                        {...formik.getFieldProps("fuelType")}
                        className={isError("fuelType") && "is-invalid"} >
                            <option>Select</option>
                                <option value="Electricity">Electricity</option>
                                <option value="Hybrid">Hybrid</option>
                                <option value="Gasoline">Gasoline</option>
                                <option value="Dizel">Dizel</option>
                                <option value="Hydrogen">Hydrogen</option>
                                <option value="LPG">LPG</option>
                                <option value="CNG">CNG</option>
                        </Form.Select>
                        <Form.Control.Feedback type='invalid' >
                            {formik.errors.fuelType}
                        </Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group as={Col} md={4} lg={3} className='mb-3'>
                        <Form.Label>Age</Form.Label>
                        <Form.Control type='number'
                        {...formik.getFieldProps("age")}
                        className={isError("age") && "is-invalid"}
                        />
                        <Form.Control.Feedback type='invalid' >
                            {formik.errors.age}
                        </Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group as={Col} md={4} lg={3} className='mb-3'>
                        <Form.Label>Price Per Hour</Form.Label>
                        <Form.Control type='number'
                        {...formik.getFieldProps("pricePerHour")}
                        className={isError("pricePerHour") && "is-invalid"}
                        />
                        <Form.Control.Feedback type='invalid' >
                            {formik.errors.pricePerHour}
                        </Form.Control.Feedback>
                    </Form.Group>

                </Row>
                
            </Col>

        </Row>

        {initialValues.builtIn && (
            <Alert variant='danger' className='mt-5'>Build-in account can not be deleted and updated</Alert>
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

export default AdminVehicleEdit