import React, { useEffect, useState } from 'react'
import { Button, ButtonGroup, Spinner } from 'react-bootstrap'
import { useNavigate, useParams } from 'react-router-dom'
import { deleteMessage, getMessage } from '../../../api/contact-service';
import Loading from '../../common/loading.js/loading';
import { question, toast } from '../../../utils/functions/swal';

const AdminContactMessageEdit = () => {

    const navigate = useNavigate();
    const [deleting, setDeleting] = useState(false)
    const [message, setMessage] = useState({})
    const [loading, setLoading] = useState(true)
    const {messageId} = useParams();


    const loadData = async () => {

        setLoading(true);
        try {

            const resp = await getMessage(messageId);
            setMessage(resp.data);
            
        } catch (error) {
            console.log(error);
        }finally{
            setLoading(false);
        }


    }

    useEffect(() => {
        loadData();
     
    }, [])
    



    const removeMessage =async () => { 
        
        setDeleting(true);

        try {
            
            await deleteMessage(messageId);
            toast("Message was delete" , "success");
            navigate(-1)

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
            removeMessage();
        }
       })

      }

  return (

    loading ? <Loading/> : (
    <>
        <h2>{message.subject}</h2>
        <p>{message.body}</p>
        <hr />
        <p><em>{message.name}-{message.email}</em></p>
        <div className='text-end'>

                <ButtonGroup aria-label='Basic example'>

                <Button variant='secondary' type="button" onClick={()=>navigate(-1)} >Cancel</Button>

               

                       

                        <Button variant="danger" type="button" disabled={deleting} onClick={handleDelete} >
                            {deleting && <Spinner animation="border" size='sm' />}Delete
                        </Button>

                  



                </ButtonGroup>

                </div>
    </>
    )
  )
}

export default AdminContactMessageEdit