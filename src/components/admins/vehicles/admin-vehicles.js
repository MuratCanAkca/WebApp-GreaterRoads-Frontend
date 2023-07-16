import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { downloadVehicles, getVehicleByPage } from '../../../api/vehicle-service'
import fileDownload from 'js-file-download'
import { Button, Spinner } from 'react-bootstrap'
import DataTable from 'react-data-table-component'
import Loading from '../../common/loading.js/loading'

const columns = [
    {
        name: 'Car Name',
        selector: row => row.model,
    },
    {
        name: 'Doors',
        selector: row => row.doors,
    },
    {
        name: 'Seats',
        selector: row => row.seats,
    },
    {
        name: 'Luggage',
        selector: row => row.luggage,
    },
    {
        name: 'Transmission',
        selector: row => row.transmission,
    },
    {
        name: 'Fuel Type',
        selector: row => row.fuelType,
    },
    {
        name: 'Age',
        selector: row => row.age,
    },
    {
        name: 'Price Per Hour',
        selector: row =>` $${row.pricePerHour}`,
    },
  
  ];



const AdminVehicles = () => {

    const [vehicles, setVehicles] = useState([])
    const [loading, setLoading] = useState(true)
    const [downloading, setDownloading] = useState(false)
    const [totalRows, setTotalRows] = useState(0)
    const [perPage, setPerPage] = useState(10)
    const navigate=useNavigate();

    const loadData = async(page) => {
        setLoading(true);
    
        try {
          
          const resp = await getVehicleByPage(page , perPage);
          setVehicles(resp.data.content);
          setTotalRows(resp.data.totalElements);
          console.log(resp.data);
    
        } catch (error) {
          
          console.log(error);
    
        }finally{
          setLoading(false);
        }
    
      }

      const handlePageChange = page => {
        //data table componnentı 1 tabanlı bız 0 tabanlı calıstıgımız ııcn yaptık
            loadData(page-1);
        };
    
        const handlePerRowsChange = async (newPerPage, page) => {
    
    
        loadData(page-1);
        setPerPage(newPerPage);
        
        };

        useEffect(() => {
    
            loadData(0);
            
          }, [ ])


          const handleDownload =async () => {

            setDownloading(true);
      
            try {
      
              const resp =await downloadVehicles();
              //excel olarak gelenı ındırmek kolay degıl onun ıcn jsonda js-file-download paketını ındırdık
              fileDownload(resp.data , `vehicles-${new Date()}.xlsx`)
              
            } catch (error) {
              console.log(error);
            }finally{
              setDownloading(false);
            }
      
          }

          const handleRowClick = (row) => { 
      
            navigate(`${row.id}`);
     
           }
      
           const handleNavigate = () => {
            navigate("new");
           }

  return (
    <div>


     <Button variant='primary' type='button' onClick={handleNavigate} >
      {downloading && <Spinner animation='border' size='sm' />}  New Car
      </Button>
      
    <Button variant='secondary' onClick={handleDownload} disabled={downloading}>
     {downloading && <Spinner animation='border' size='sm' />} Download Vehicles
      </Button>

    <DataTable  
    columns={columns} 
    data={vehicles} 
    progressPending={loading}
    progressComponent={<Loading/>}
          pagination
          paginationServer
          paginationTotalRows={totalRows}
          onChangeRowsPerPage={handlePerRowsChange}
          onChangePage={handlePageChange} 
    onRowClicked={handleRowClick}
    />

  </div>
  )
}

export default AdminVehicles