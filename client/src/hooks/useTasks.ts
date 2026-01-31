import { useState, useEffect, useCallback } from "react";
import {
    getTasks,
    createTask,
    updateTask,
    deleteTask,
} from "../api/taskApi";
import type {
    Task,
    CreateTaskData,
    UpdateTaskData,
} from "../api/taskApi";
import { toast } from "sonner";
import { AxiosError } from "axios";

interface UseTasks {
    tasks: Task[];
    isLoading: boolean;
    error: string | null;
    pagination: {
        page: number;
        limit: number;
        total: number;
        pages: number;
    } | null;
    refetch: () => Promise<void>;
    addTask: (data: CreateTaskData) => Promise<boolean>;
    editTask: (id: string, data: UpdateTaskData) => Promise<boolean>;
    removeTask: (id: string) => Promise<boolean>;
    setFilter: (status: string | null) => void;
    filter: string | null;
}

export const useTasks = (): UseTasks & {
    page: number;
    setPage: (page: number) => void;
    nextPage: () => void;
    prevPage: () => void;
} => {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [filter, setFilter] = useState<string | null>(null);
    const [pagination, setPagination] = useState<UseTasks["pagination"]>(null);
    const [page, setPage] = useState(1);
    const limit = 10;

    const fetchTasks = useCallback(async () => {
        setIsLoading(true);
        setError(null);
        try {
            const params: { status?: string; page?: number; limit?: number } = {
                page,
                limit
            };
            if (filter) params.status = filter;

            const response = await getTasks(params);
            if (response.success) {
                setTasks(response.data);
                setPagination(response.pagination);
            }
        } catch (err) {
            const axiosError = err as AxiosError<{ message: string }>;
            const message = axiosError.response?.data?.message || "Failed to fetch tasks";
            setError(message);
            toast.error(message);
        } finally {
            setIsLoading(false);
        }
    }, [filter, page]);

    useEffect(() => {
        fetchTasks();
    }, [fetchTasks]);

    const nextPage = () => {
        if (pagination && page < pagination.pages) {
            setPage((p) => p + 1);
        }
    };

    const prevPage = () => {
        if (page > 1) {
            setPage((p) => p - 1);
        }
    };

    const addTask = async (data: CreateTaskData): Promise<boolean> => {
        try {
            const response = await createTask(data);
            if (response.success) {
                toast.success("Task created successfully!");
                await fetchTasks();
                return true;
            }
            return false;
        } catch (err) {
            const axiosError = err as AxiosError<{ message: string; errors?: Array<{ field: string; message: string }> }>;
            const message = axiosError.response?.data?.message || "Failed to create task";
            toast.error(message);
            return false;
        }
    };

    const editTask = async (id: string, data: UpdateTaskData): Promise<boolean> => {
        try {
            const response = await updateTask(id, data);
            if (response.success) {
                toast.success("Task updated successfully!");
                await fetchTasks();
                return true;
            }
            return false;
        } catch (err) {
            const axiosError = err as AxiosError<{ message: string }>;
            const message = axiosError.response?.data?.message || "Failed to update task";
            toast.error(message);
            return false;
        }
    };

    const removeTask = async (id: string): Promise<boolean> => {
        try {
            const response = await deleteTask(id);
            if (response.success) {
                toast.success("Task deleted successfully!");
                await fetchTasks();
                return true;
            }
            return false;
        } catch (err) {
            const axiosError = err as AxiosError<{ message: string }>;
            const message = axiosError.response?.data?.message || "Failed to delete task";
            toast.error(message);
            return false;
        }
    };

    return {
        tasks,
        isLoading,
        error,
        pagination,
        refetch: fetchTasks,
        addTask,
        editTask,
        removeTask,
        setFilter,
        filter,
        page,
        setPage,
        nextPage,
        prevPage
    };
};
