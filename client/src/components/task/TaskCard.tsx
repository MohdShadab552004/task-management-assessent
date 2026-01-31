import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { StatusBadge } from "./StatusBadge";
import type { Task } from "../../api/taskApi";
import { Pencil, Trash2, Calendar } from "lucide-react";
import { formatDistanceToNow } from "../../lib/dateUtils";

interface TaskCardProps {
    task: Task;
    onEdit: (task: Task) => void;
    onDelete: (id: string) => void;
    isDeleting?: boolean;
}

export function TaskCard({ task, onEdit, onDelete, isDeleting }: TaskCardProps) {
    return (
        <Card className="group hover:shadow-md transition-shadow animate-fade-in">
            <CardHeader className="pb-3">
                <div className="flex items-start justify-between gap-4">
                    <CardTitle className="text-lg line-clamp-2">{task.title}</CardTitle>
                    <StatusBadge status={task.status} />
                </div>
            </CardHeader>
            <CardContent className="pb-3">
                {task.description ? (
                    <p className="text-sm text-muted-foreground line-clamp-3">
                        {task.description}
                    </p>
                ) : (
                    <p className="text-sm text-muted-foreground italic">No description</p>
                )}
                <div className="flex items-center gap-1 mt-3 text-xs text-muted-foreground">
                    <Calendar className="h-3 w-3" />
                    <span>{formatDistanceToNow(task.createdAt)}</span>
                </div>
            </CardContent>
            <CardFooter className="gap-2 pt-0">
                <Button
                    variant="outline"
                    size="sm"
                    onClick={() => onEdit(task)}
                    className="flex-1"
                >
                    <Pencil className="h-4 w-4 mr-1" />
                    Edit
                </Button>
                <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => onDelete(task.id)}
                    disabled={isDeleting}
                    className="flex-1"
                >
                    <Trash2 className="h-4 w-4 mr-1" />
                    {isDeleting ? "Deleting..." : "Delete"}
                </Button>
            </CardFooter>
        </Card>
    );
}
