import { useState} from "react";
import {postRegister,  get_institutes_data, postTypeuser} from "../../../services/fetch";
import Selector_grades from "./selector-grades";
import Selector_rols from "./selector-rol";
import Selector_institution from "./selector-institution";
import { Checkboxgovernment_subsidy } from "./checkbox-government_subsidy";
import { CheckboxSex } from "./checkbox-sex";
import { Checkscholarship } from "./checkbox-scholarship";
import { Checkboxavailability } from "./checkboxavailability";







const Register = () => {
    
    //variables de inputs usuarios generales
    const [dni_number, Setdni_number] = useState('')
    const [sex, setsex] = useState(0)//para asignar el sexo masculino o femenino
    const [username, Setusername] = useState('')
    const [id_rol, setid_rol] = useState('')//setea el rol del usuario
    const [name, Setname] = useState('')
    const [first_name, setFirst_name] = useState('')
    const [birth_date, setbirth_date] = useState('')
    const [last_name, setlast_name] = useState('')
    const [email, setemail] = useState('')
    const [password, setpassword] = useState('')//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!pendiente implementar secrets
    const [phone_number, setphone_number] = useState('')
    
    console.log("que rayos",{id_rol})
    //variables para estudiantes
    const [id_grade, setid_grade] = useState('')
    const [id_institution, setid_institution] = useState('')
    const [government_subsidy, setgovernment_subsidy] = useState(0)//valor por default ,sera negativo
    const [scholarship, setscholarship] = useState(0) //valor para setear si un usuario esta con beca
    

    //variables Psicologos
    const [license_code, setlicense_code] = useState('')
    const [availability, setavailability] = useState(1)
    const [years_experience, setyears_experience] = useState('')
    const [Checkboxavailability,setCheckboxavailability] = useState('')
    
    
  
    

  
   async function handle_form(event) {
      event.preventDefault()

      const apiPost = 'http://localhost:8000/api/user/register-user/' //api para el registro de usuarios basicos
      const apiUrl = 'http://localhost:8000/api/user/users/'          //api para ver todos los usuarios
      
      const user_data = {
        id_rol,dni_number,sex,username,birth_date,name,first_name,last_name,email,phone_number,password
      }

     

      if(!user_data) {
        alert('Please fill all the fields')
        return
        } 
          let data = await get_institutes_data(apiUrl)

          const profileExists = data.some((e) => e.dni_number == dni_number || e.email == email)
         

            if(profileExists) {
              alert('User already exists')
            }else{
              await postRegister(apiPost, user_data);
             console.log("log exitoso")
               
          }
        }
          

          
    

  return (
    <div className="register_form" >

    <form style={{display: "flex",flexDirection: 'column'}}  method='POST' className="RegisterForm">
        <label>Cedula</label>
        <input type="text" name="dni_number" value={ dni_number } onChange={(event) => Setdni_number(event.target.value)}/>

        <CheckboxSex setsex={setsex} sex={sex}  />

        <label>Username</label>
        <input type="text" name="username" value={ username } onChange={(event) => Setusername(event.target.value)} />

        <label>Nombre</label>
        <input type="text" name="name" value={ name } onChange={(event) => Setname(event.target.value)}/>

        <label>Primer Apellido</label>
        <input type="text" name="first_name" value={ first_name } onChange={(event) => setFirst_name(event.target.value)}/>

        <label>Segundo Apellido</label>
        <input type="text" name="last_name" value={ last_name } onChange={(event) => setlast_name(event.target.value)}/>

        <label>Fecha de nacimiento</label>
        <input type="date"  value={birth_date} onChange={(event) => setbirth_date(event.target.value)}/>

        <label>Correo Electronico</label>
        <input type="email" name="email" value={ email } onChange={(event) => setemail(event.target.value)}/>

        <label>Contrasenna</label>
        <input type="text" name="password" value={ password } onChange={(event) => setpassword(event.target.value)}/>

        <label>Numero Telefonico</label>
        <input type="number" name="phone_number" value={ phone_number } onChange={(event) => setphone_number(event.target.value)}/>

        <label>Tipo de usuario</label>
        
        <Selector_rols name='id_rol' value={id_rol} id_rol={id_rol} setid_rol={setid_rol}/>

       
        <button className='registerBtn' onClick={handle_form}> registro</button>
       </form>

         <div className="student_inputs">
        
        <h2>Agregue los datos relacionados al estudiante</h2>
        
        
        
        <Selector_institution setid_institution={setid_institution} id_institution={id_institution}/>
        <Selector_grades setid_grade={setid_grade} grade={id_grade}/>
        <Checkboxgovernment_subsidy setgovernment_subsidy={setgovernment_subsidy} government_subsidy={government_subsidy} />
        <Checkscholarship setscholarship={setscholarship} scholarship={scholarship} />

       

            {/* <div className="pychologist_inputs">

            <h2>Agregue los datos relacionados al psicologo</h2>
            

            <label>Codigo de licencia</label>
            <input type="number" name="license_code" value={ license_code } onChange={(event) => setlicense_code(event.target.value)}/>

            <label>Annos Experiencia</label>
            <input type="number" name="years_experience" value={ years_experience } onChange={(event) => setyears_experience(event.target.value)}/>
            <Checkboxavailability setavailability={setavailability} availability={availability} />

       
            </div> */}


        </div> */
      
      </div>

  )
}


export default Register
