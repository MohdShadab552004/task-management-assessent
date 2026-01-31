import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { taskSchema, STATUS_OPTIONS } from "../../lib/validations";
import type { TaskFormData } from "../../lib/validations";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "../ui/select";
import type { Task } from "../../api/taskApi";
import { Loader2 } from "lucide-react";

interface TaskFormProps {
    initialData?: Task;
    onSubmit: (data: TaskFormData) => Promise<void>;
    onCancel: () => void;
    isSubmitting?: boolean;
}

export function TaskForm({
    initialData,
    onSubmit,
    onCancel,
    isSubmitting,
}: TaskFormProps) {
    const {
        register,
        handleSubmit,
        setValue,
        watch,
        formState: { errors },
    } = useForm<TaskFormData>({
        resolver: zodResolver(taskSchema) as any,
        defaultValues: {
            title: initialData?.title || "",
            description: initialData?.description || "",
            status: initialData?.status || "pending",
        },
    });

    const status = watch("status");

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="space-y-2">
                <Label htmlFor="title">
                    Title <span className="text-destructive">*</span>
                </Label>
                <Input
                    id="title"
                    placeholder="Enter task title..."
                    {...register("title")}
                    className={errors.title ? "border-destructive" : ""}
                />
                {errors.title && (
                    <p className="text-sm text-destructive">{errors.title.message}</p>
                )}
            </div>

            <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                    id="description"
                    placeholder="Enter task description (optional)..."
                    rows={4}
                    {...register("description")}
                    className={errors.description ? "border-destructive" : ""}
                />
                {errors.description && (
                    <p className="text-sm text-destructive">{errors.description.message}</p>
                )}
            </div>

            <div className="space-y-2">
                <Label htmlFor="status">Status</Label>
                <Select
                    value={status}
                    onValueChange={(value) =>
                        setValue("status", value as TaskFormData["status"])
                    }
                >
                    <SelectTrigger id="status">
                        <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                        {STATUS_OPTIONS.map((option) => (
                            <SelectItem key={option.value} value={option.value}>
                                {option.label}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
                {errors.status && (
                    <p className="text-sm text-destructive">{errors.status.message}</p>
                )}
            </div>

            <div className="flex gap-3 pt-4">
                <Button
                    type="button"
                    variant="outline"
                    onClick={onCancel}
                    className="flex-1"
                    disabled={isSubmitting}
                >
                    Cancel
                </Button>
                <Button type="submit" className="flex-1" disabled={isSubmitting}>
                    {isSubmitting ? (
                        <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            {initialData ? "Updating..." : "Creating..."}
                        </>
                    ) : initialData ? (
                        "Update Task"
                    ) : (
                        "Create Task"
                    )}
                </Button>
            </div>
        </form>
    );
}
