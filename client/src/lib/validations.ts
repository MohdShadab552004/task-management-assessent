import { z } from "zod";

export const taskSchema = z.object({
    title: z
        .string()
        .min(1, "Title is required")
        .max(100, "Title cannot exceed 100 characters"),
    description: z
        .string()
        .max(500, "Description cannot exceed 500 characters")
        .optional()
        .default(""),
    status: z.enum(["pending", "in-progress", "completed"]).default("pending"),
});

export type TaskFormData = z.infer<typeof taskSchema>;

export const STATUS_OPTIONS = [
    { value: "pending", label: "Pending" },
    { value: "in-progress", label: "In Progress" },
    { value: "completed", label: "Completed" },
] as const;
