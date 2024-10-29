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

export const Protected_routes_student = ({ children }) => (
    <Protected_routes allowedRoles={[1, 2]}>{children}</Protected_routes>
);
