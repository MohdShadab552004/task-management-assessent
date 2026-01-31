import type { Task } from "../../api/taskApi";
import { TaskCard } from "./TaskCard";
import { ClipboardList } from "lucide-react";

interface TaskListProps {
    tasks: Task[];
    onEdit: (task: Task) => void;
    onDelete: (id: string) => void;
    deletingId?: string | null;
}

export function TaskList({ tasks, onEdit, onDelete, deletingId }: TaskListProps) {
    if (tasks.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center py-16 text-center">
                <ClipboardList className="h-16 w-16 text-muted-foreground/50 mb-4" />
                <h3 className="text-lg font-semibold text-muted-foreground">
                    No tasks yet
                </h3>
                <p className="text-sm text-muted-foreground mt-1">
                    Create your first task to get started!
                </p>
            </div>
        );
    }

    return (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {tasks.map((task) => (
                <TaskCard
                    key={task.id}
                    task={task}
                    onEdit={onEdit}
                    onDelete={onDelete}
                    isDeleting={deletingId === task.id}
                />
            ))}
        </div>
    );
}
