import { useState} from "react";
import {postRegister,  get_institutes_data} from "../../../services/fetch";
import Selector_grades from "./Selectors/selector-grades";
import Selector_rols from "./Selectors/selector-rol";
import Selector_institution from "./Selectors/selector-institution";
import { Checkboxgovernment_subsidy } from "./Selectors/checkbox-government_subsidy";
import { Selector_gender } from "./Selectors/checkbox-gender";
import { Checkscholarship } from "./Selectors/checkbox-scholarship";
import { Checkboxavailability } from "./Selectors/checkboxavailability";
import  '../../../styles/register_container.css'
import { AuthProvider, useAuth } from '../../../context/AuthContext';



const Register = () => {
    
    //variables de inputs usuarios generales
    const { setUserId } = useAuth()
    const [dni_number, Setdni_number] = useState('')
    const [sex, setsex] = useState(0)//para asignar el sexo masculino o femenino
    const [username, Setusername] = useState('')
    const [id_rol, setid_rol] = useState('')//setea el rol del usuario
    const [name, Setname] = useState('')
    const [first_name, setFirst_name] = useState('')
    const [birth_date, setbirth_date] = useState('')
    const [last_name, setlast_name] = useState('')
    const [email, setemail] = useState('')
    // const [password, setpassword] = useState('')//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!pendiente implementar secrets
    const [phone_number, setphone_number] = useState('')
    
    //variables para estudiantes
    const [id_grade, setid_grade] = useState('')
    const [id_institution, setid_institution] = useState('')
    const [government_subsidy, setgovernment_subsidy] = useState(0)//valor por default ,sera negativo
    const [scholarship, setscholarship] = useState(0) //valor para setear si un usuario esta con beca
    

    //variables Psicologos
    const [license_code, setlicense_code] = useState('')
    const [availability, setavailability] = useState(0)
    const [years_experience, setyears_experience] = useState('')
    
    
    
  
    async function handle_form(event) {
      event.preventDefault()

      const apiPost = 'http://localhost:8000/api/user/user-register/' //api para el registro de usuarios basicos
      const apiUrl = 'http://localhost:8000/api/user/users/'          //api para ver todos los usuarios
      
      let user_data = {}

        if(!user_data) {
        alert('Please fill all the fields')
        return
        } 
        
        if (id_rol == 2){
          user_data = {
            id_rol,dni_number,sex,username,birth_date,name,first_name,last_name,email,phone_number,id_institution,id_grade,government_subsidy,scholarship
          }
        }else if(id_rol == 3){
          user_data = {
            id_rol,dni_number,sex,username,birth_date,name,first_name,last_name,email,phone_number,license_code,availability,years_experience
          }
        }
        
          let data  = await get_institutes_data(apiUrl)

          const profileExists = data.some((e) => e.dni_number == dni_number || e.email == email)
         

            if(profileExists) {
              alert('User already exists')
            }else{
            try {
              const response = await postRegister(apiPost, user_data);
              console.log("Registration successful", response);
              setUserId(response.data.id_user); // Guardar el ID del usuario en el contexto de autenticación
          } catch (error) {
              console.error("Registration failed", error);
              alert('Registration failed, please try again.');
          }
      }
  }
          

          
    

  return (
    <div className="register_container" >
        <div className="header">
          <h3>Registre un usuario</h3>
          <h5>Por favor digite los datos acorde al tipo de usuario que desea registar</h5>
        </div>

        <div className="name_container">
          <div>
            <p className="label_input">Nombre</p>
            <input type="text" name="name" value={ name } onChange={(event) => Setname(event.target.value)}/>
        </div>
        <div>
          <p className="label_input">Apellido</p>
          <input type="text" name="first_name" value={ first_name } onChange={(event) => setFirst_name(event.target.value)}/>
        </div>
        <div>
          <p className="label_input">Segundo Apellido</p>
          <input type="text" name="last_name" value={ last_name } onChange={(event) => setlast_name(event.target.value)}/>
        </div>
        </div>

        <div className="dni_gender_container">
          <div>
            <p className="label_input">Numero de cedula</p>
            <input type="text" name="dni_number" value={ dni_number } onChange={(event) => Setdni_number(event.target.value)}/>
          </div>
          <div>
          <p className="label_input">Nombre de usuario</p>
          <input type="text" name="username" value={ username } onChange={(event) => Setusername(event.target.value)} />
            
          </div>
        </div>

        <div className="phonenumber_email_container">
          <div>
          <p className="label_input">Numero telefonico</p>
          <input type="number" name="phone_number" value={ phone_number } onChange={(event) => setphone_number(event.target.value)}/>
          </div>
          <div>
            <p className="label_input">Correo electronico</p>
            <input type="email" name="email" value={ email } onChange={(event) => setemail(event.target.value)}/>
          </div>
        </div>

        <div className="username_birthdate">
          <div>
            <p className="label_input">Gender</p>
            <Selector_gender setsex={setsex} sex={sex}  />
          </div>
        

          <div>
            <p className="label_input">Fecha de nacimiento</p>
            <input type="date"  value={birth_date} onChange={(event) => setbirth_date(event.target.value)}/>
          </div>

        </div>
        

        
        <div className="selector_rol_condicioinado">
        <p className="label_input">Rol</p>
        <Selector_rols name='id_rol' value={id_rol} id_rol={id_rol} setid_rol={setid_rol}/>
        </div>
       
        
       
        {id_rol == 2 && (
        <div className="student_inputs">
        
        <h2>Agregue los datos relacionados al estudiante</h2>
        
        <Selector_institution setid_institution={setid_institution} id_institution={id_institution}/>
        <Selector_grades setid_grade={setid_grade} grade={id_grade}/>
        <Checkboxgovernment_subsidy setgovernment_subsidy={setgovernment_subsidy} government_subsidy={government_subsidy} />
        <Checkscholarship setscholarship={setscholarship} scholarship={scholarship} />

        </div>
         )}

         {id_rol == 3 && (
       

            <div className="pychologist_inputs">

            <h2>Agregue los datos relacionados al psicologo</h2>
            

            <label>Codigo de licencia</label>
            <input type="number" name="license_code" value={ license_code } onChange={(event) => setlicense_code(event.target.value)}/>

            <label>Annos Experiencia</label>
            <input type="number" name="years_experience" value={ years_experience } onChange={(event) => setyears_experience(event.target.value)}/>
            <Checkboxavailability setavailability={setavailability} availability={availability} />

            </div>
             )}

             <div className="divButton">
                <button className='registerBtn' onClick={handle_form}> registro</button>
              </div>
            
        </div> 
      
      

  )
}


export default Register
