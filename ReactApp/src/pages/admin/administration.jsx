
import Register from "../../components/Admin-components/admin-ui/Register"
import { AdminNav } from "../../components/Admin-components/admin-ui/AdminNav";

import UsersContainer from "../../components/Admin-components/admin-ui/UsersContainer"
import { Outlet } from 'react-router-dom';

const Administration = () => {
  return (
   <>
   
    <AdminNav/>
    <main>
    <Outlet />
    </main>
   
  
   </>
  )
}

export default Administration
