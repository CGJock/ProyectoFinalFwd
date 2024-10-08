
//servicio con metodo post para registrar usuarios
export const postRegister = async (apiPost,user_data) => {
    try {
          const response = await fetch(apiPost, {
           method: 'POST',
           headers: {
             'Content-Type': 'application/json'
             },
             body: JSON.stringify(user_data)//los datos contiene el objeto con los input
              
           });

           if(!response.ok){
            const errorData = await response.json();
            throw new Error(errorData.detail || "error")
          }
           const data = await response.json()
            alert("se agrego con exito");
            return data
         } catch(error) {
            console.error("no se logro procesar lod datos",error);
            throw error;
           } 
           
      }

  export const postTypeuser = async (apiStu,extra_data,newid) => {
        try {
              const response = await fetch(apiStu, {
               method: 'POST',
               headers: {
                 'Content-Type': 'application/json'
                 },
                 body: JSON.stringify(extra_data)//los datos contiene el objeto con los input
                  
               });
               const data = await response.json()
                alert("se agrego con exito");
                return newid
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
    console.log("error en el servidor")
  }
  
}


