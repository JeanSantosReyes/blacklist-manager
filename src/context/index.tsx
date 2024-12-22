import { createContext, useContext, useState, ReactNode, useEffect } from 'react';

interface AuthContextProps {
    auth: boolean;
    setAuth: (value: boolean) => void;
}

const AUTH_EXPIRATION_TIME = 2 * 60 * 60 * 1000; // 2 horas en milisegundos

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [auth, setAuthState] = useState<boolean>(() => {
        // Recuperar el estado desde localStorage
        const storedAuth = localStorage.getItem('auth');
        const storedTimestamp = localStorage.getItem('authTimestamp');

        if (storedAuth === 'true' && storedTimestamp) {
            const timestamp = parseInt(storedTimestamp, 10);
            const currentTime = Date.now();

            // Verificar si han pasado más de 3 horas
            if (currentTime - timestamp < AUTH_EXPIRATION_TIME) {
                return true;
            }
        }

        // Si ha expirado o no existe, limpiar el localStorage
        localStorage.removeItem('auth');
        localStorage.removeItem('authTimestamp');
        return false;
    });

    const setAuth = (value: boolean) => {
        if (value) {
            // Guardar el estado de autenticación y el timestamp en localStorage
            localStorage.setItem('auth', String(value));
            localStorage.setItem('authTimestamp', Date.now().toString());
        } else {
            // Limpiar el estado en localStorage
            localStorage.removeItem('auth');
            localStorage.removeItem('authTimestamp');
        }
        setAuthState(value);
    };

    useEffect(() => {
        // Opción: Limpiar el estado automáticamente si detectas una expiración mientras la app está abierta
        const interval = setInterval(() => {
            const storedTimestamp = localStorage.getItem('authTimestamp');
            if (storedTimestamp) {
                const timestamp = parseInt(storedTimestamp, 10);
                const currentTime = Date.now();

                if (currentTime - timestamp >= AUTH_EXPIRATION_TIME) {
                    setAuth(false);
                }
            }
        }, 60 * 1000); // Verificar cada minuto

        return () => clearInterval(interval);
    }, []);

    return (
        <AuthContext.Provider value={{ auth, setAuth }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth debe usarse dentro de un AuthProvider');
    }
    return context;
};