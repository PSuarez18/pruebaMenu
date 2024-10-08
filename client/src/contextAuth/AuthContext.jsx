import { createContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { logout as logoutFunction } from './logout';


export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('authToken');
        const expirationDate = localStorage.getItem('tokenExpiration');

        if (token && new Date() < new Date(expirationDate)) {
            setIsAuthenticated(true);
        } else {
            navigate('/');
        }
    }, [navigate]);

    const login = () => {
        setIsAuthenticated(true);
    };

    const handleLogout = async () => {
        await logoutFunction(setIsAuthenticated, navigate);
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, login, logout: handleLogout }}>
            {children}
        </AuthContext.Provider>
    );
};
