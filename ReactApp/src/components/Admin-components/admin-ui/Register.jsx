import { useState, useContext} from "react";
import {postRegister,  get_institutes_data} from "../../../services/fetch";
import Selector_grades from "./selector-grades";
import Selector_rols from "./selector-rol";
import Selector_institution from "./selector-institution";
import { Checkbox } from "./checkbox";






const Register = () => {
    //variables de inputs usuarios generales
    const [user_type, Setuser_type] = useState('')
    const [dni_number, Setdni_number] = useState('')
    const [username, Setusername] = useState('')
    const [name, Setname] = useState('')
    const [first_name, setFirst_name] = useState('')
    const [birth_date, setbirth_date] = useState('')
    const [last_name, setlast_name] = useState('')
    const [email, setemail] = useState('')
    const [password, setpassword] = useState('')
    const [phone_number, setphone_number] = useState('')
    
    
    //variables para estudiantes
    
    
    //variables de inputs para funcionalidad
    const [profileExists, setprofileExists] = useState('')
   
    

  
      
    
    
    
    
    async function handle_form(event) {
      
      event.preventDefault()
      if(!dni_number || !username || !name || !first_name || !birth_date ||  !last_name || !email || !password || !phone_number) {
        alert('Please fill all the fields')
        } 
          let data = await getRegister()
          for (const e in data)
            if (e.dni_number ==  dni_number || e.email ==  email) {
            setprofileExists(true);
            }
            else{
            setprofileExists(false);
            }

            if  (profileExists == false) {
              let data = await postRegister(user_type, dni_number, username, name, first_name,)
            }else{
              alert('User already exists')
            }
              
          }

          
    

  return (
    <div className="register_form" >

    <form style={{display: "flex",flexDirection: 'column'}}  method='POST' className="RegisterForm">
        <label>Cedula</label>
        <input type="text" name="dni_number" value={ dni_number } onChange={(event) => Setdni_number(event.target.value)}/>

        <label>Username</label>
        <input type="text" name="username" value={ username } onChange={(event) => Setusername(event.target.value)} />

        <label>Nombre</label>
        <input type="text" name="name" value={ name } onChange={(event) => Setname(event.target.value)}/>

        <label>Primer Apellido</label>
        <input type="text" name="first_name" value={ first_name } onChange={(event) => setFirst_name(event.target.value)}/>

        <label>Segundo Apellido</label>
        <input type="text" name="last_name" value={ last_name } onChange={(event) => setlast_name(event.target.value)}/>

        <label>Fecha de nacimiento</label>
        <input type="date" value={birth_date} onChange={(event) => setbirth_date(event.target.value)}/>

        <label>Correo Electronico</label>
        <input type="email" name="email" value={ email } onChange={(event) => setemail(event.target.value)}/>

        <label>Contrasenna</label>
        <input type="text" name="password" value={ password } onChange={(event) => setpassword(event.target.value)}/>

        <label>Numero Telefonico</label>
        <input type="number" name="phone_number" value={ phone_number } onChange={(event) => setphone_number(event.target.value)}/>

        <label>Tipo de usuario</label>
        
        <Selector_rols />

       
        <input className='registerBtn' type="submit" />
    </form>

      <div className="student_inputs">
        
        <h2>Agregue los datos realcionados al estudiante</h2>
        
        <form style={{display: 'flex', flexDirection: 'column'}} method="put" className="student_form">
        
        <Selector_institution />
        <Selector_grades />
        

        <Checkbox />
        
       
        
         </form>
        </div>
      
      </div>

  )
}


export default Register
