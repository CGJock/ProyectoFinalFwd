// import React from 'react'
// import Button from 'react-bootstrap/Button';
// import Modal from 'react-bootstrap/Modal';
// import {  useEffect } from 'react';
// import { useState } from 'react';

// export const UsersModal = () => {
   
    
    
    
      
//       const [NameEdit, setNameEdit] = useState('');
//       const [Description, setDescription] = useState('');
//       const [PrecioEdit, setPrecioEdit] = useState('');
//       const [imgEditada, setimgEditada] = useState('');
//       const [CategoryEdit,setCategoryEdit] = useState('');
//       const [locationEdit,setlocationEdit] = useState('');
     
    
//     useEffect(() => {
//       if (Producto) {
//         setNameEdit(Producto.Name);
//         setDescription(Producto.Description);
//         setPrecioEdit(Producto.Price);
//         setimgEditada(Producto.imgUrl);
//         setCategoryEdit(Producto.Category);
//         setlocationEdit(Producto.Location);
//       }
//     },[Producto])
    
    
//       return (
//         <>  
      
//           <Modal
//             show={Show}
//             onHide={handleClose}
//             backdrop="static"
//             keyboard={false}
//           >
//             <Modal.Header closeButton>
//               <Modal.Title>Edita Info Producto</Modal.Title>
//             </Modal.Header>
//             <Modal.Body>
//               <label htmlFor="Nombre" >Nombre </label>
//               <input value={NameEdit} onChange={(event) => setNameEdit(event.target.value)} type="text" />
    
//               <label htmlFor="Descripcion" >Descripcion: </label>
//               <input value={Description} onChange={(event) => setDescription(event.target.value)} type="text" />
              
//               <label htmlFor="Categoia">Categoria</label>
//               <SelectorCategoria categoriaobj={categoriaobj} category={Category} setCategory={setCategory}/>
              
//               <label htmlFor="Provincia">Provincia</label>
//               <SelectorProvincia provinciaobj={provinciaobj}  setLocation={setLocation} Location={Location} />
    
//               <label htmlFor="Price">Precio</label>
//               <input value={PrecioEdit} onChange={(event) => setPrecioEdit(event.target.value)} type="number" placeholder='Digite el precio' />
    
//               <label htmlFor="imgEdit">imgEdit</label>
//               <input value={imgEditada} onChange={(event) => setimgEditada(event.target.value)} type="text" />
//             </Modal.Body>
//             <Modal.Footer>
//               <Button variant="secondary" onClick={handleClose}>
//                 Close
//               </Button>
//               <Button variant="primary" onClick={() => editarItems(Producto.id,NameEdit,Description,
//                 CategoryEdit,locationEdit,PrecioEdit,imgEditada)} >Confirmar</Button>
//             </Modal.Footer>
//           </Modal>
//         </>
//       );
//     }
    
   