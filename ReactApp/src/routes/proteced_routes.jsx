import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { jwtDecode } from "jwt-decode";
import { useEffect, useState } from "react";
import { user_fetch } from "../services/user_fetch";
import Cookies from 'js-cookie';
import { Spinner } from "../components/utilities/spinner";


const Protected_routes = ({ allowedRoles, children }) => {
    const Token = Cookies.get('Token');
    const [decodedToken, setDecodedToken] = useState(null);
    const { id_user } = useAuth();
    const [User, setUser] = useState(null);
    const [id_rol, setIdRol] = useState(null);
    const [loading, setLoading] = useState(true);
    const apiPost = "http://localhost:8000/api/user/user";

    // Decodificar el token solo si existe y está disponible
    useEffect(() => {
        if (Token) {
            try {
                const decoded = jwtDecode(Token);
                setDecodedToken(decoded);
            } catch (error) {
                console.error("Error decoding token:", error);
                setLoading(false); // Detener la carga en caso de error
            }
        } else {
            setLoading(false); // Detener la carga si no hay token
        }
    }, [Token]);

    // Obtener datos de usuario si el id_user está disponible
    useEffect(() => {
        const fetchUserData = async () => {
            if (id_user && decodedToken) {
                try {
                    console.log('Fetching user ID:', id_user);
                    const userData = await user_fetch(apiPost, id_user);
                    console.log('User data fetched:', userData);

                    if (userData) {
                        setUser(userData);
                        setIdRol(userData.id_rol);
                    } else {
                        console.error('No se encontró la data de usuario');
                    }
                } catch (error) {
                    console.error("Error fetching user data:", error);
                } finally {
                    setLoading(false); // Finalizar la carga
                }
            } else {
                console.log('No user ID encontrado');
                setLoading(false); // Finalizar la carga si no hay id_user
            }
        };

        if (id_user && decodedToken) fetchUserData();
    }, [id_user, decodedToken, apiPost]);

    // Mostrar spinner de carga
    if (loading) {
        return <div><Spinner /></div>;
    }

    // Redireccionar si User o id_rol son null
    if (!User || !id_rol) {
        console.log('Redirecting to home, user not found or role not available');
        return <Navigate to='/home' />;
    }

    console.log('User:', User);
    console.log('Rol ID:', id_rol);
    console.log('Allowed Roles:', allowedRoles);

    // Verificar que id_rol sea un número antes de compararlo
    if (allowedRoles.includes(Number(id_rol))) {
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
