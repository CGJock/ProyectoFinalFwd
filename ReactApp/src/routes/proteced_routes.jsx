import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useEffect, useState } from "react";
import { Spinner } from "../components/utilities/spinner";


const Protected_routes = ({ allowedRoles, children }) => {
    const {IdRol} = useAuth()
    const {PsychologistData} = useAuth()
    console.log(PsychologistData)
    const [loading, setLoading] = useState(true)

  // Simulación de una carga inicial para asegurar que IdRol esté listo
  useEffect(() => {
    if (IdRol !== null) {
        setLoading(false);
    }
}, [IdRol]);

// Mostrar un spinner mientras se carga el rol del usuario
if (loading) {
    return <div><Spinner /></div>;
}

// Redireccionar si IdRol no está en los roles permitidos
if (!allowedRoles.includes(IdRol)) {
    return <Navigate to="/home" />;
}

    // Verificar que id_rol sea un número antes de compararlo
    if (allowedRoles.includes(Number(IdRol))) {
        return children;
    } else {
        console.log('Role not allowed, redirecting to home');
        return <Navigate to='/home' />;
    }
};

// Rutas protegidas según los roles
export const Protected_routes_admin = ({ children }) => (
    <Protected_routes allowedRoles={[1]}>{children}</Protected_routes>
);

export const Protected_routes_psychologyst = ({ children }) => (
    <Protected_routes allowedRoles={[1, 3]}>{children}</Protected_routes>
);


export const Protected_routes_student = ({ children }) => {
  const [Token, setToken] = useState(sessionStorage.getItem('token_raw') || null);
  const [id_user, setid_user] = useState(null);
//se crea un useeffect para controlar las veces que está funciono se va a hacer al mismo 
//tiempo que se busca capturar los errores del token si este es nulo o indefinido
  useEffect(() => {
      if (Token) {
          try {
              const decodedToken = jwtDecode(Token);
              setid_user(decodedToken.id_rol); // Actualiza id_user solo si el token es válido
          } catch (error) {
              console.error("Error decodificando el token:", error);
              setid_user(null); // O manejar de otra forma, como redirigir
          }
      }
  }, [Token]);

  if (!Token) {
      return <Navigate to='/home' />;
  }

  // Comprobación de id_user
  if (id_user === 2 || id_user === 1) {
      return children;
  } else {
      return <Navigate to="/home" />;
  }
};

