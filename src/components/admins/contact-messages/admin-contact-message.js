import React, { useEffect, useState } from 'react'
import DataTable from 'react-data-table-component'
import { getMessagesByPage } from '../../../api/contact-service'
import Loading from '../../common/loading.js/loading'
import { useNavigate } from 'react-router-dom'

const columns = [

    {

        name:"Subject",
        selector: (row)=> row.subject

    },
    {

        name:"Visitor",
        selector: (row)=> row.name

    },

]

const AdminContactMessages = () => {

    const [loading, setLoading] = useState(true)
    const [messages, setMessages] = useState([])
    const [totalRows, setTotalRows] = useState(0)
    const [perPage, setPerPage] = useState(10);
    const navigate = useNavigate();

    const loadData = async (page) => {

        try {

            const resp = await getMessagesByPage(page , perPage);
            setMessages(resp.data.content);
            setTotalRows(resp.data.totalElements);
            
        } catch (error) {
            console.log(error)
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
    
        loadData();
    }, [])

    const handleRowClick = (row) => { 
      
        navigate(`${row.id}`);
      
       }
    

  return (

    <div>

        <DataTable  
        columns={columns} 
        data={messages} 
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

export default AdminContactMessages