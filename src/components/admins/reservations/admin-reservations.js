import React, { useEffect, useState } from 'react'
import { Button, Spinner } from 'react-bootstrap'
import DataTable from 'react-data-table-component'
import Loading from '../../common/loading.js/loading'
import { downloadReservations, getReservationsAdmin } from '../../../api/reservation-service'
import fileDownload from 'js-file-download'
import { useNavigate } from 'react-router-dom'

const columns = [
  {

  name: "Vehicle", 
  selector : (row) => row.carId.model
  
  },
  {

  name: "Pick Up", 
  selector : (row) => row.pickUpLocation
    
  },
  {

  name: "Drop Off", 
  selector : (row) => row.dropOffLocation
      
  },
  {

    name: "Price", 
    selector : (row) =>` $${row.totalPrice}`
    
    },
  
];

const AdminReservations = () => {

  const [loading, setLoading] = useState( true);
  const [reservations, setReservations] = useState([]);
  const [downloading, setDownloading] = useState(false);
  const navigate = useNavigate();


  const loadData =async ( ) => { 
    
    setLoading(true);

    try {

      const resp = await getReservationsAdmin();
      setReservations(resp.data);
      
    } catch (error) {
      console.log(error);
    }finally{
      setLoading(false);
    }

   }

   const handleDownload =async () => {

    setDownloading(true);

    try {

      const resp =await downloadReservations();
      //excel olarak gelenı ındırmek kolay degıl onun ıcn jsonda js-file-download paketını ındırdık
      fileDownload(resp.data , `reservations-${new Date()}.xlsx`)
      
    } catch (error) {
      console.log(error);
    }finally{
      setDownloading(false);
    }

  }

  const handleRowClick = (row) => { 
    
    //navigate(`admin/users/${row.id}`);
    //hoca yukardakı gıbı yaptı ama hata verdı
    navigate(`${row.id}`);
    //boyle yaptım ben ve hocanınkı gıbı duzgun calıyor buraya dıkkat et


   }

   useEffect(() => {
    loadData();
   }, [])
   

  return (
    <div>
      
    <Button variant='secondary' onClick={handleDownload} disabled={downloading}>
     {downloading && <Spinner animation='border' size='sm' />} Download Reservations
      </Button>

    <DataTable  
    columns={columns} 
    data={reservations} 
    progressPending={loading}
    progressComponent={<Loading/>}
    pagination
    onRowClicked={handleRowClick}
    />

  </div>
  )
}

export default AdminReservations