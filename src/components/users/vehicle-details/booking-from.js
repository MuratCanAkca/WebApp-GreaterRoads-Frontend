import React, { useState } from 'react'
import SectionHeader from '../common/section-header/section-header'
import { Alert, Button, ButtonGroup, FloatingLabel, Form, FormCheck, InputGroup, Spinner } from 'react-bootstrap'
import * as Yup from "yup";
import {useFormik} from "formik";
import { createReservation, isVehicleAvailable } from '../../../api/reservation-service';
import { useSelector } from 'react-redux';
import { checkDates, checkExpireDate, combineDateAndTime, getCurrentDate, getDate } from '../../../utils/functions/date-time';
import { toast } from '../../../utils/functions/swal';
import InputMask from 'react-input-mask-next';
import { useNavigate } from 'react-router-dom';

const BookingForm = () => {

    const isUserLogin = useSelector(state => state.auth.isUserLogin);

    const vehicle = useSelector(state => state.reservation.vehicle);

    const [carAvailable , setCarAvailable ] = useState(false);

    const [totalPrice, seTotalPrice] = useState();

    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    const initialValues = {
        
        pickUpLocation:"",
        dropOffLocation:"",
        pickUpDate:"",
        pickupTime:"",
        dropOffDate:"",
        dropOffTime:"",
        cardNo:"",
        nameOnCard:"",
        expireDate:"",
        cvc:"",
        contract:false
    
    }

    const validationSchema = Yup.object({

        pickUpLocation:Yup.string().required("Enter a pick-up location"),
        dropOffLocation:Yup.string().required("Enter a drop-off location"),
        pickUpDate:Yup.string().required("Select a pick up date"),
        pickupTime:Yup.string().required("Select a pick up time"),
        dropOffDate:Yup.string().required("Select a drop off date"),
        dropOffTime:Yup.string().required("Select a drop off time"),
        cardNo:Yup.string().required("Please Enter your card number"),
        nameOnCard:Yup.string().required("Please enter name on card"),
        expireDate:Yup.string().required("Please your expire date").
            test("month_check", "Enter a valid expire date (MM/YY)" , (value)=> checkExpireDate(value)),
        cvc:Yup.number().typeError("Must be number").required().min(1).max(999, "Please enter cvc"),
        contract:Yup.boolean().oneOf([true], "Please read the contract and check the box")


    });

    const onSubmit =async (values) => {

        const {pickUpDate , pickupTime , dropOffDate , dropOffTime , pickUpLocation , dropOffLocation} = values;

        setLoading(true);

        try {
            
            const dto = {

                pickUpTime:combineDateAndTime(pickUpDate , pickupTime),
                dropOffTime:  combineDateAndTime(dropOffDate , dropOffTime),
                pickUpLocation: pickUpLocation,
                dropOffLocation: dropOffLocation

            }

            console.log(dto.pickUpTime);
            console.log(dto.dropOffTime);

            await createReservation(vehicle.id , dto);
            toast("Reservation Created" , "success");
            formik.resetForm();
            navigate("/");


        } catch (error) {
            
            toast(error.response.data.message);

        }finally{
            setLoading(false);
        }

    };

    const formik = useFormik({
        initialValues,
        validationSchema,
        onSubmit
    })
    

    const chechVehicleAvailability = async ( ) => {

        const {pickUpDate , pickupTime, dropOffDate , dropOffTime}=formik.values;
        setLoading(true);

        try {

            if(!checkDates(formik.values)) throw new Error("Drop-off date should get at  least 1 hour later the pick-up date");
            
            const dto = {
                carId: vehicle.id ,
                pickUpDateTime: combineDateAndTime(pickUpDate , pickupTime) , 
                dropOffDateTime:combineDateAndTime(dropOffDate , dropOffTime)};

            const resp =await  isVehicleAvailable(dto);

           const {available , totalPrice} = resp.data;

           setCarAvailable(available);
           seTotalPrice(totalPrice);

           if(!available) throw new Error("The Vehicle you selected is not available . Please select different date ");

        } catch (error) {

            //biri backendden gelecek hata bırı de yukardan gelen yanı bızden kaynaklı hata
            toast(error.message || error.response.data.message , "error");

        }finally{
            setLoading(false);
        }

    }

  return (
    <>
    <SectionHeader title="Booking Form"/>

    {!isUserLogin && <Alert>Please Login first to check the car is available.</Alert>}

    <Form noValidate onSubmit={formik.handleSubmit}>

    <fieldset disabled={!isUserLogin || carAvailable}>

    <FloatingLabel
        
        label="Pick-Up Location"
        className="mb-3"
      >
        <Form.Control 
        type="text" 
        placeholder="Pick-Up Location" 
        {...formik.getFieldProps("pickUpLocation")}
        isInvalid={formik.touched.pickUpLocation && formik.errors.pickUpLocation}
        isValid={formik.touched.pickUpLocation && !formik.errors.pickUpLocation}/>
        <Form.Control.Feedback type='invalid'>{formik.errors.pickUpLocation}</Form.Control.Feedback>
      </FloatingLabel>

      <FloatingLabel
        
        label="Drop-Off Location"
        className="mb-3"
      >
        <Form.Control type="text" placeholder="Drop-Off Location" 
        {...formik.getFieldProps("dropOffLocation")}
        isInvalid={formik.touched.dropOffLocation && formik.errors.dropOffLocation}
        isValid={formik.touched.dropOffLocation && !formik.errors.dropOffLocation}/>
        <Form.Control.Feedback type='invalid'>{formik.errors.dropOffLocation}</Form.Control.Feedback>
      </FloatingLabel>

      <InputGroup className='mb-3'>

        <FloatingLabel
            
            label="Pick-Up Date">
            <Form.Control type="date" min={getCurrentDate()}  placeholder="Pick-Up Date"
            {...formik.getFieldProps("pickUpDate")}
            isInvalid={formik.touched.pickUpDate && formik.errors.pickUpDate}
            isValid={formik.touched.pickUpDate && !formik.errors.pickUpDate} />
            <Form.Control.Feedback type='invalid'>{formik.errors.pickUpDate}</Form.Control.Feedback>
            </FloatingLabel>

            <FloatingLabel
            
            label="Time">
            <Form.Control type="time" placeholder="Time"
              {...formik.getFieldProps("pickupTime")}
              isInvalid={formik.touched.pickupTime && formik.errors.pickupTime}
              isValid={formik.touched.pickupTime && !formik.errors.pickupTime}/>
              <Form.Control.Feedback type='invalid'>{formik.errors.pickupTime}</Form.Control.Feedback>
            </FloatingLabel>

      </InputGroup>

      <InputGroup className='mb-3'>

        <FloatingLabel
            
            label="Drop-Off Date">
            <Form.Control type="date" min={getDate(formik.values.pickUpDate)} placeholder="Drop-Off Date"
            {...formik.getFieldProps("dropOffDate")}
            isInvalid={formik.touched.dropOffDate && formik.errors.dropOffDate}
            isValid={formik.touched.dropOffDate && !formik.errors.dropOffDate} />
            <Form.Control.Feedback type='invalid'>{formik.errors.dropOffDate}</Form.Control.Feedback>
            </FloatingLabel>

            <FloatingLabel
            
            label="Time">
            <Form.Control type="time" placeholder="Time" 
            {...formik.getFieldProps("dropOffTime")}
            isInvalid={formik.touched.dropOffTime && formik.errors.dropOffTime}
            isValid={formik.touched.dropOffTime && !formik.errors.dropOffTime}/>
            <Form.Control.Feedback type='invalid'>{formik.errors.dropOffTime}</Form.Control.Feedback>
            </FloatingLabel>

      </InputGroup>

      <Button 
      variant='secondary' 
      type='button' 
      className={`w-100 ${carAvailable ? "d-none": "d-block"}`} 
      onClick={chechVehicleAvailability}
      disabled={loading}>
       {loading && <Spinner animation='border' size='sm'/>}  Check Availability
      </Button>

      </fieldset>

        <fieldset className={`mt-5 ${carAvailable ? "d-block":"d-none"}`}>

            <Alert variant='info'><h2>Total Price: ${totalPrice}</h2></Alert>

        <FloatingLabel label="Card Number" className="mb-3">

        <Form.Control type="text" placeholder="Card Number" as={InputMask} mask="9999-9999-9999-9999"
        {...formik.getFieldProps("cardNo")}
        isInvalid={formik.touched.cardNo && formik.errors.cardNo}
        isValid={formik.touched.cardNo && !formik.errors.cardNo}/>
        <Form.Control.Feedback type='invalid'>{formik.errors.cardNo}</Form.Control.Feedback>
          </FloatingLabel>

          <FloatingLabel label="Name On Card" className="mb-3">

        <Form.Control type="text" placeholder="Name On Card" 
        {...formik.getFieldProps("nameOnCard")}
        isInvalid={formik.touched.nameOnCard && formik.errors.nameOnCard}
        isValid={formik.touched.nameOnCard && !formik.errors.nameOnCard}/>
        <Form.Control.Feedback type='invalid'>{formik.errors.nameOnCard}</Form.Control.Feedback>
         </FloatingLabel>

        <InputGroup>
        
        <FloatingLabel label="Expire Date" className="mb-3" >

            <Form.Control type="text" placeholder="Expire Date" as={InputMask} mask="99/99"
            {...formik.getFieldProps("expireDate")}
            isInvalid={formik.touched.expireDate && formik.errors.expireDate}
            isValid={formik.touched.expireDate && !formik.errors.expireDate}/>
            <Form.Control.Feedback type='invalid'>{formik.errors.expireDate}</Form.Control.Feedback>
            </FloatingLabel>

            <FloatingLabel label="CVC" className="mb-3" >

            <Form.Control type="text" placeholder="CVC" as={InputMask} mask="999"
            {...formik.getFieldProps("cvc")}
            isInvalid={formik.touched.cvc && formik.errors.cvc}
            isValid={formik.touched.cvc && !formik.errors.cvc}/>
            <Form.Control.Feedback type='invalid'>{formik.errors.cvc}</Form.Control.Feedback>
            </FloatingLabel>


        </InputGroup>

        <FormCheck type='checkbox' id="contract" label="I have read and aggree the contract" 
        {...formik.getFieldProps("contract")}
        isInvalid={formik.touched.contract && formik.errors.contract}
        isValid={formik.touched.contract && !formik.errors.contract} />

        
        <ButtonGroup className='mt-3 w-100'>

        <Button variant='secondary' type='button' disabled={loading} onClick={()=>setCarAvailable(false)} >
            Edit
            </Button>


        <Button variant='primary' type='submit'  disabled={loading}>
            {loading && <Spinner animation='border' size='sm'/>} Book Now
            </Button>
            </ButtonGroup>
        </fieldset>

    </Form>

    </>
    
  )
}

export default BookingForm