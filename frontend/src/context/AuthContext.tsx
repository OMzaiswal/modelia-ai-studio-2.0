import { createContext, useContext, useEffect, useState } from "react";

interface AuthContextType {
    isLoggedIn: boolean;
    setIsLoggedIn: (value: boolean) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const getInitialAuthStatus = (): boolean => {
    if (typeof window !== 'undefined') {
        return localStorage.getItem('isLoggedIn') === 'true';
    }
    return false
}

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(getInitialAuthStatus);

    useEffect(() => {
        if (typeof window !== undefined) {
            localStorage.setItem('isLoggedIn', String(isLoggedIn));
        }
    }, [isLoggedIn]);

    return (
        <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn}}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
}