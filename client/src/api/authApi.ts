import axios, { AxiosError } from "axios";
import { z } from "zod";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api/auth";

const api = axios.create({
    baseURL: API_URL,
    withCredentials: true,
    headers: {
        "Content-Type": "application/json",
    },
});


export const loginSchema = z.object({
    email: z.string().email("Invalid email address"),
    password: z.string().min(6, "Password must be at least 6 characters"),
});

export const registerSchema = z.object({
    name: z.string().min(2, "Name must be at least 2 characters"),
    email: z.string().email("Invalid email address"),
    password: z.string().min(6, "Password must be at least 6 characters"),
});

export const forgotPasswordSchema = z.object({
    email: z.string().email("Invalid email address"),
});

export const resetPasswordSchema = z.object({
    password: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
});

export type LoginData = z.infer<typeof loginSchema>;
export type RegisterData = z.infer<typeof registerSchema>;
export type ForgotPasswordData = z.infer<typeof forgotPasswordSchema>;
export type ResetPasswordData = z.infer<typeof resetPasswordSchema>;

export interface AuthResponse {
    success: boolean;
    token?: string;
    message?: string;
    user?: any;
}

export const login = async (data: LoginData): Promise<AuthResponse> => {
    try {
        const response = await api.post<AuthResponse>("/login", data);
        if (response.data.token) {
            localStorage.setItem("token", response.data.token);
        }
        return response.data;
    } catch (error) {
        if (error instanceof AxiosError && error.response) {
            throw new Error(error.response.data.message || "Login failed");
        }
        throw new Error("Login failed");
    }
};

export const register = async (data: RegisterData): Promise<AuthResponse> => {
    try {
        const response = await api.post<AuthResponse>("/register", data);
        if (response.data.token) {
            localStorage.setItem("token", response.data.token);
        }
        return response.data;
    } catch (error) {
        if (error instanceof AxiosError && error.response) {
            throw new Error(error.response.data.message || "Registration failed");
        }
        throw new Error("Registration failed");
    }
};

export const logout = () => {

};

export const getCurrentUser = async () => {
    try {
        const response = await api.get<{ success: boolean; data: any }>("/me");
        console.log(response);
        return response.data.data;
    } catch (error) {
        console.error("GetCurrentUser Failed:", error);
        // Only remove token if 401
        if (error instanceof AxiosError && error.response?.status === 401) {
            logout();
        }
        return null;
    }
};

export const forgotPassword = async (data: ForgotPasswordData): Promise<AuthResponse> => {
    try {
        const response = await api.post<AuthResponse>("/forgotpassword", data);
        return response.data;
    } catch (error) {
        if (error instanceof AxiosError && error.response) {
            throw new Error(error.response.data.message || "Request failed");
        }
        throw new Error("Request failed");
    }
};

export const resetPassword = async (token: string, data: ResetPasswordData): Promise<AuthResponse> => {
    try {
        const response = await api.put<AuthResponse>(`/resetpassword/${token}`, {
            password: data.password
        });
        if (response.data.token) {
            localStorage.setItem("token", response.data.token);
        }
        return response.data;
    } catch (error) {
        if (error instanceof AxiosError && error.response) {
            throw new Error(error.response.data.message || "Reset failed");
        }
        throw new Error("Reset failed");
    }
};
