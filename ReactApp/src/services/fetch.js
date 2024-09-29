
//servicio con metodo post para registrar usuarios
export const postRegister = async (apiUrl,datos) => {
    try {
          const response = await fetch(apiUrl, {
           method: 'POST',
           headers: {
             'Content-Type': 'application/json'
             },
             body: JSON.stringify((datos)//los datos contiene el objeto con los input
              )
           });
           const data = await response.json()
          
           alert("se agrego con exito");
         } catch(error) {
            alert("error");
           } 
           
      }
    
//###################################################################################################################################

export const get_institutes_data = async(apiUrl) => {
  try{
      const response = await fetch(apiUrl);
      const data = await response.json()
      console.log(data)
      return data
    
  } catch(error){
    alert("error en el servidor")
  }
  
}


