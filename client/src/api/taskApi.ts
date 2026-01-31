import axios from "axios";

const API_URL = `${import.meta.env.VITE_API_URL}` || "http://localhost:5000/api";

const api = axios.create({
    baseURL: API_URL,
    headers: {
        "Content-Type": "application/json",
    },
});

api.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export interface Task {
    id: string;
    title: string;
    description: string;
    status: "pending" | "in-progress" | "completed";
    createdAt: string;
    updatedAt: string;
}

export interface TasksResponse {
    success: boolean;
    data: Task[];
    pagination: {
        page: number;
        limit: number;
        total: number;
        pages: number;
    };
}

export interface TaskResponse {
    success: boolean;
    message?: string;
    data: Task;
}

export interface CreateTaskData {
    title: string;
    description?: string;
    status?: "pending" | "in-progress" | "completed";
}

export interface UpdateTaskData {
    title?: string;
    description?: string;
    status?: "pending" | "in-progress" | "completed";
}

export interface ApiError {
    success: false;
    message: string;
    errors?: Array<{ field: string; message: string }>;
}

// Get all tasks
export const getTasks = async (params?: {
    status?: string;
    page?: number;
    limit?: number;
}): Promise<TasksResponse> => {
    const response = await api.get<TasksResponse>("/tasks", { params });
    return response.data;
};

// Get single task
export const getTask = async (id: string): Promise<TaskResponse> => {
    const response = await api.get<TaskResponse>(`/tasks/${id}`);
    return response.data;
};

// Create task
export const createTask = async (
    data: CreateTaskData
): Promise<TaskResponse> => {
    const response = await api.post<TaskResponse>("/tasks", data);
    return response.data;
};

// Update task
export const updateTask = async (
    id: string,
    data: UpdateTaskData
): Promise<TaskResponse> => {
    const response = await api.put<TaskResponse>(`/tasks/${id}`, data);
    return response.data;
};

// Delete task
export const deleteTask = async (
    id: string
): Promise<{ success: boolean; message: string }> => {
    const response = await api.delete<{ success: boolean; message: string }>(
        `/tasks/${id}`
    );
    return response.data;
};

export default api;
