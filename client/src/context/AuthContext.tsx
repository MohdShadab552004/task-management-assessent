import { createContext, useContext, useState, useEffect, type ReactNode } from "react";
import { getCurrentUser, login, register, logout, type LoginData, type RegisterData } from "../api/authApi";

interface User {
    _id: string;
    name: string;
    email: string;
}

interface AuthContextType {
    user: User | null;
    loading: boolean;
    login: (data: LoginData) => Promise<void>;
    register: (data: RegisterData) => Promise<void>;
    logout: () => void;
    isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const initAuth = async () => {
            try {
                const currentUser = await getCurrentUser();
                console.log(currentUser);
                setUser(currentUser);
            } catch (error) {
                console.error("Auth initialization failed", error);
            } finally {
                setLoading(false);
            }
        };
        initAuth();
    }, []);

    const handleLogin = async (data: LoginData) => {
        await login(data);
        const currentUser = await getCurrentUser();
        setUser(currentUser);
    };

    const handleRegister = async (data: RegisterData) => {
        await register(data);
        const currentUser = await getCurrentUser();
        setUser(currentUser);
    };

    const handleLogout = async () => {
        await logout();
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{
            user,
            loading,
            login: handleLogin,
            register: handleRegister,
            logout: handleLogout,
            isAuthenticated: !!user
        }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
};
