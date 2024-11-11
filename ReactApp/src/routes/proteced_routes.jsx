import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useEffect, useState } from "react";
import { Spinner } from "../components/utilities/spinner";
import { NotFoundPage } from "../pages/not found/NotFoundPage";


const Protected_routes = ({ allowedRoles, children }) => {
    const {IdRol} = useAuth()
    const {PsychologistData} = useAuth()
    console.log(PsychologistData)
    const [loading, setLoading] = useState(true)

  // Simulación de una carga inicial para asegurar que IdRol esté listo
  useEffect(() => {
    if (IdRol || IdRol == null) {
        setLoading(false);
    }
}, [IdRol]);

// Mostrar un spinner mientras se carga el rol del usuario
if (loading) {
    return <div><Spinner /></div>;
}

// Si IdRol es null o no está en los roles permitidos, redirigir a /home
if (IdRol === null || !allowedRoles.includes(Number(IdRol))) {
    return <NotFoundPage />;
}

return children;
};
// Rutas protegidas según los roles
export const Protected_routes_admin = ({ children }) => (
    <Protected_routes allowedRoles={[1]}>{children}</Protected_routes>
);

export const Protected_routes_psychologyst = ({ children }) => (
    <Protected_routes allowedRoles={[3]}>{children}</Protected_routes>
);


export const Protected_routes_student = ({ children }) => (
    <Protected_routes allowedRoles={[2,3]}>{children}</Protected_routes>
)

