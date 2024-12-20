// import React from "react";

// const Modal = ({ isOpen, onClose, children }) => {
//   if (!isOpen) return null; // Si isOpen es falso, no muestra nada

//   return (
//     <div style={styles.overlay}>
//       <div style={styles.modal}>
//         <button onClick={onClose} style={styles.closeButton}>X</button>
//         {children}
//       </div>
//     </div>
//   );
// };

// const styles = {
//   overlay: {
//     position: "fixed",
//     top: 0,
//     left: 0,
//     right: 0,
//     bottom: 0,
//     backgroundColor: "rgba(0, 0, 0, 0.5)",
//     display: "flex",
//     justifyContent: "center",
//     alignItems: "center",
//     zIndex: 1000
//   },
//   modal: {
//     backgroundColor: "#fff",
//     padding: "20px",
//     borderRadius: "8px",
//     position: "relative",
//     width: "300px",
//     maxWidth: "80%"
//   },
//   closeButton: {
//     position: "absolute",
//     top: "10px",
//     right: "10px",
//     background: "none",
//     border: "none",
//     fontSize: "16px",
//     cursor: "pointer"
//   }
// };

// export default Modal;