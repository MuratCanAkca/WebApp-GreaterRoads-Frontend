import React, { useEffect, useState } from 'react'
import { Button, Spinner } from 'react-bootstrap';
import DataTable from 'react-data-table-component';
import { downloadUsers, getUsersByPage } from '../../../api/user-service';
import fileDownload from 'js-file-download';
import Loading from '../../common/loading.js/loading';
import { useNavigate } from 'react-router-dom';

const columns = [
  {
      name: 'First Name',
      selector: row => row.firstName,
  },
  {
      name: 'Last Name',
      selector: row => row.lastName,
  },
  {
    name: 'Email',
    selector: row => row.email,
},
{
  name: 'Roles',
  selector: row => row.roles,
},
];





const AdminUsers = () => {

  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true)
  const [downloading, setDownLoading] = useState(false)
  const [totalRows, setTotalRows] = useState(0);
	const [perPage, setPerPage] = useState(10);
  const navigate = useNavigate();
  
  const loadData = async(page) => {
    setLoading(true);

    try {
      
      const resp = await getUsersByPage(page , perPage);
      setUsers(resp.data.content);
      setTotalRows(resp.data.totalElements);

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

      setDownLoading(true);

      try {

        const resp =await downloadUsers();
        //excel olarak gelenı ındırmek kolay degıl onun ıcn jsonda js-file-download paketını ındırdık
        fileDownload(resp.data , `users-${new Date()}.xlsx`)
        
      } catch (error) {
        console.log(error);
      }finally{
        setDownLoading(false);
      }

    }

    const handleRowClick = (row) => { 
      
      //navigate(`admin/users/${row.id}`);
      //hoca yukardakı gıbı yaptı ama hata verdı
      navigate(`${row.id}`);
      //boyle yaptım ben ve hocanınkı gıbı duzgun calıyor buraya dıkkat et


     }

  return (
    <div>
      
      <Button variant='secondary' onClick={handleDownload} disabled={downloading}>
       {downloading && <Spinner animation='border' size='sm' />} Download Users
        </Button>

      <DataTable  
      columns={columns} 
      data={users} 
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

export default AdminUsers