import { useState } from "react"
import { postRegister } from "../../services/fetch"
import {  useNavigate } from "react-router-dom";
import { useAuth } from '../../context/AuthContext';


 



export const LoginComponent = () => {
    const [email, setemail] = useState('')
    const [password, setpassword] = useState('')
    const navigate = useNavigate()
    const [errorMessage, seterrorMessage] = useState('')
    const { setUserId } = useAuth();

    async function handleLogin(){
    const apiPost = "http://localhost:8000/api/user/user-login/"
    const user_data = {
        email: email,
        password: password
    }
    console.log("Datos de usuario:", user_data)
    const data =  await postRegister(apiPost,user_data)
    

    try {
    if(data && data.jwt){
        console.log("se encontro su usuario")
        seterrorMessage("")
        navigate('/home')
    }
    }catch (error){
        console.log("error logn",error.message);
        seterrorMessage(error.message)
    }}


  return (
    <>
    <div className="contenedor_login">
    <h1>Login</h1>
    
    
    <label>Correo Electronico</label>
    <input type="text" placeholder='Ingrese correo electronico' value={email} onChange={(e => setemail(e.target.value))}/>

    <label>Contrasenna</label>
    <input type="text" placeholder='Ingrese correo contrasenna' value={password} onChange={(e => setpassword(e.target.value))}/>

    <button onClick={handleLogin}>Login</button>
    </div>
    </>
  )
}
