import { useState } from "react"
import { postRegister } from "../../services/fetch"
import {  useNavigate } from "react-router-dom";
import { useAuth } from '../../context/AuthContext';


 



export const LoginComponent = () => {
    const [username, setusername] = useState('')
    const [password, setpassword] = useState('')
    const [errorMessage, seterrorMessage] = useState('')
    const { Loggin } = useAuth();//llama a la funcion desde el contexto

    async function handleLogin(){
    
    const user_data = {
        username: username,
        password: password
    }

    console.log(user_data)
    
    const data =  await Loggin(user_data)
    

    try {
    if(data){
        console.log("se encontro su usuario")
        console.log(data,'esto es la data del user')
       
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
    <input type="text" placeholder='Ingrese correo electronico' value={username} onChange={(e => setusername(e.target.value))}/>

    <label>Contrasenna</label>
    <input type="text" placeholder='Ingrese correo contrasenna' value={password} onChange={(e => setpassword(e.target.value))}/>

    <button onClick={handleLogin}>Login</button>
    </div>
    </>
  )
}
