import { useState} from "react";
import {postRegister,  get_institutes_data} from "../../../services/fetch";
import Selector_grades from "./Selectors/selector-grades";
import Selector_rols from "./Selectors/selector-rol";
import Selector_institution from "./Selectors/selector-institution";
import { Selector_Hotline } from "./Selectors/checkbox-hotline";
import { Checkboxgovernment_subsidy } from "./Selectors/checkbox-government_subsidy";
import { Selector_gender } from "./Selectors/checkbox-gender";
import { Checkscholarship } from "./Selectors/checkbox-scholarship";
import { Checkboxavailability } from "./Selectors/checkboxavailability";
import  '../../../styles/administrator-styles/register_container.css'




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
    const [phone_number, setphone_number] = useState('')
    let user_data = {}
    
    //variables para estudiantes
    const [id_grade, setid_grade] = useState('')
    const [id_institution, setid_institution] = useState('')
    const [government_subsidy, setgovernment_subsidy] = useState(0)//valor por default ,sera negativo
    const [scholarship, setscholarship] = useState(0) //valor para setear si un usuario esta con beca
    

    //variables Psicologos
    const [license_code, setlicense_code] = useState('')
    const [availability, setavailability] = useState(0)
    const [years_experience, setyears_experience] = useState('')
    const [assigned_to_hotline, setassigned_to_hotline] = useState(false)
    
    
    
  
    async function handle_form(event) {
      event.preventDefault();
    
      const apiPost = 'http://localhost:8000/api/user/user-register/';
      const apiUrl = 'http://localhost:8000/api/user/users/';
      
      let user_data = {};
    
      // Validación para estudiantes (id_rol == 2)
      if (id_rol == 2) {
        user_data = {
          id_rol, dni_number, sex, username, birth_date, name, first_name, last_name, email, phone_number, id_institution, id_grade, government_subsidy, scholarship
        };
        
        // Validar solo los campos necesarios para estudiantes
        if (!dni_number || sex == undefined|| !birth_date || !first_name || !username || !last_name || !email || !phone_number || !id_grade || government_subsidy === undefined || scholarship === undefined) {
          console.log(user_data)
          return alert("No se pueden dejar campos vacíos estudiante");
        }
      
      } 
      // Validación para psicólogos (id_rol == 3) 
      else if (id_rol == 3) {
        user_data = {
          id_rol, dni_number, sex, username, birth_date, name, first_name, last_name, email, phone_number, license_code, availability, years_experience, assigned_to_hotline
        };
    
        // Validar solo los campos necesarios para psicólogos
        if (!dni_number || !sex || !birth_date || !first_name || !username || !last_name || !email || !phone_number || !license_code || availability === undefined || !years_experience || assigned_to_hotline === undefined) {
          return alert("No se pueden dejar campos vacíos");
        }
      }
    
      // Verificar si el usuario ya existe
      let data = await get_institutes_data(apiUrl);
      const profileExists = data.some((e) => e.dni_number == dni_number || e.email == email);
    
      if (profileExists) {
        alert('User already exists');
      } else {
        try {
          const response = await postRegister(apiPost, user_data);
          console.log("Registration successful", response);
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
            <input className="input_register" type="text" name="name" value={ name } onChange={(event) => Setname(event.target.value)}/>
            <p className="label_input">Nombre</p>
        </div>
        <div>
          <input className="input_register" type="text" name="first_name" value={ first_name } onChange={(event) => setFirst_name(event.target.value)}/>
          <p className="label_input">Apellido</p>
        </div>
        <div>
          <input className="input_register" type="text" name="last_name" value={ last_name } onChange={(event) => setlast_name(event.target.value)}/>
          <p className="label_input">Segundo Apellido</p>
        </div>
        </div>

        <div className="inferior_container" >
          <div className="phonenumber_email_container">
            <div>
              <input className="input_register" type="number" name="phone_number" value={ phone_number } onChange={(event) => setphone_number(event.target.value)}/>
              <p className="label_input">Numero telefonico</p>
            </div>
          <div>
            <input className="input_register" type="email" name="email" value={ email } onChange={(event) => setemail(event.target.value)}/>
            <p className="label_input">Correo electronico</p>
          </div>

          <div>
            <input className="input_register" type="text" name="dni_number" value={ dni_number } onChange={(event) => Setdni_number(event.target.value)}/>
            <p className="label_input">Numero de cedula</p>
          </div>
          <div>
          <input className="input_register" type="text" name="username" value={ username } onChange={(event) => Setusername(event.target.value)} />
          <p className="label_input">Nombre de usuario</p>
          </div>
        </div>

        
      
        <div className="username_birthdate">


        <div>
            <input className="input_register" type="date"  value={birth_date} onChange={(event) => setbirth_date(event.target.value)}/>
            <p className="label_input">Fecha de nacimiento</p>
          </div>

          <div>
            <Selector_gender setsex={setsex} sex={sex}  />
            <p className="label_input">Gender</p>
          </div>
        </div>

        </div>
        

        
        <div className="selector_rol_condicioinado">
        <Selector_rols name='id_rol' value={id_rol} id_rol={id_rol} setid_rol={setid_rol}/>
        <p className="label_input">Rol</p>
        </div>
       
        
       
        {id_rol == 2 && (
        <div className="student_inputs">
        
          <div className="heder_student"><h4>Agregue los datos relacionados al estudiante</h4></div>
          <div className="institution_grade_container">
                <div>
                  <Selector_institution value={id_institution} setid_institution={setid_institution} id_institution={id_institution}/>
                  <p className="label_input">Institucion</p>
                </div>
                <div>
                  <Selector_grades value={id_grade} setid_grade={setid_grade} id_grade={id_grade}/>
                  <p className="label_input">Grado Academico</p>
                </div>
              

            
                <div  className="checkbox-container">
                  <Checkboxgovernment_subsidy value={government_subsidy} setgovernment_subsidy={setgovernment_subsidy} government_subsidy={government_subsidy} />
                  <p className="label_input">Subsidio Gobernamental</p>
                </div>
                <div className="checkbox-container">
                  <Checkscholarship value={scholarship} setscholarship={setscholarship} scholarship={scholarship} />
                  <p className="label_input">Beca</p>
                </div>
          </div>
        </div>
         )}

         {id_rol == 3 && (
       
          
            
            <div className="pychologist_inputs">
                <div>
                <div className="header_psy_inputs"><h4>Agregue los datos relacionados al psicologo</h4></div>
                </div>
                <div className="psy_body">
                  <div>
                      <input className="input_register" type="number" name="license_code" value={ license_code } onChange={(event) => setlicense_code(event.target.value)}/>
                      <p className="label_input">Codigo de licencia</p>
                    </div>
                  
                    <div>
                      <input className="input_register" type="number" name="years_experience" value={ years_experience } onChange={(event) => setyears_experience(event.target.value)}/>
                      <p className="label_input">Años Experiencia</p>
                    </div>

                    <div>
                      <Checkboxavailability setavailability={setavailability} availability={availability} />
                      <p className="label_input">Disponibilidad</p>
                    </div>

                    <div>
                      <Selector_Hotline  setassigned_to_hotline={setassigned_to_hotline}  assigned_to_hotline={assigned_to_hotline} />
                      <p className="label_input">Tipo de atencion</p>
                    </div>
              </div>
            
             </div>
             )}

             <div className="divButton">
                <button className='registerBtn' onClick={handle_form}> Registro</button>
              </div>
            
        </div> 
      
      

  )
}


export default Register
