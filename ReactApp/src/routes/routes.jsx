
import Protected_routes from './proteced_routes';
import  {Routes, Route} from "react-router-dom";
import Home from '../pages/home/home'
import Administration from '../pages/admin/administration';
import Register from '../components/Admin-components/admin-ui/Register';

const Rutas = () => {
  return (
    <>
    <Routes>
        <Route path="/" element={<Home/>} />
    
    <Route path="/Administration" element={<Administration/>} />
        <Route
          path="/Register"
          element={
            <Protected_routes>
              <Register />
            </Protected_routes>
          }/>
    </Routes>

    </>
  )
}

export default Rutas

