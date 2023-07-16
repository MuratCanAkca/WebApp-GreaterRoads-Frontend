import React, { useEffect, useState } from 'react'
import CustomRoutes from './router/custom-routes';
import secureLocalStorage from 'react-secure-storage';
import { getUser } from './api/user-service';
import { useDispatch } from 'react-redux';
import { loginFailed, loginSuccess } from './store/slices/auth-slice';
import LoadingPage from './pages/common/loading-page';
import { settings } from './utils/settings';

const App = () => {

  const [loading, setLoading] = useState(true)

  const dispatch = useDispatch();

  const loadData = async() => { 
    
   try {
      
      let token = secureLocalStorage.getItem("token");
      console.log(token);
      if(token){
        const resp = await getUser();
        dispatch(loginSuccess(resp.data));
      }

    } catch (error) {
      
      console.log(error);
      dispatch(loginFailed());

    }finally{

      setLoading(false);

    }
  }
    useEffect(() => {
    
      loadData();
      document.title = `${settings.siteName} | Premium Car Rental`
    
    }, [])
    

   

  return(
   <>
    {loading ? <LoadingPage/> : <CustomRoutes/>} 
   </>
  )

}

export default App;
