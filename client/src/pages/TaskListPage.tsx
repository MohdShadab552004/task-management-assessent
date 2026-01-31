import { useState } from "react";
import { useTasks } from "../hooks/useTasks";

import { TaskList } from "../components/task/TaskList";
import { TaskForm } from "../components/task/TaskForm";
import { Button } from "../components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogFooter,
} from "../components/ui/dialog";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "../components/ui/select";
import type { Task } from "../api/taskApi";
import { STATUS_OPTIONS } from "../lib/validations";
import type { TaskFormData } from "../lib/validations";
import { Plus, RefreshCw, ListFilter, Loader2 } from "lucide-react";

export function TaskListPage() {
    const {
        tasks,
        isLoading,
        error,
        refetch,
        addTask,
        editTask,
        removeTask,
        setFilter,
        filter,
        pagination,
        nextPage,
        prevPage,
    } = useTasks();

    const [isFormOpen, setIsFormOpen] = useState(false);
    const [editingTask, setEditingTask] = useState<Task | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [deletingId, setDeletingId] = useState<string | null>(null);
    const [taskToDelete, setTaskToDelete] = useState<string | null>(null);

    const handleOpenCreate = () => {
        setEditingTask(null);
        setIsFormOpen(true);
    };

    const handleEdit = (task: Task) => {
        setEditingTask(task);
        setIsFormOpen(true);
    };

    const handleDeleteClick = (id: string) => {
        setTaskToDelete(id);
    };

    const confirmDelete = async () => {
        if (taskToDelete) {
            setDeletingId(taskToDelete);
            await removeTask(taskToDelete);
            setDeletingId(null);
            setTaskToDelete(null);
        }
    };



    const handleSubmit = async (data: TaskFormData) => {
        setIsSubmitting(true);
        let success = false;

        if (editingTask) {
            success = await editTask(editingTask.id, data);
        } else {
            success = await addTask(data);
        }

        setIsSubmitting(false);
        if (success) {
            setIsFormOpen(false);
            setEditingTask(null);
        }
    };

    const handleCloseForm = () => {
        setIsFormOpen(false);
        setEditingTask(null);
    };

    return (
        <div className="min-h-screen bg-background">
            {/* Main Content */}
            <main className="container py-8">
                {/* Mobile Create Button */}
                <div className="sm:hidden mb-6">
                    <Button onClick={handleOpenCreate} className="w-full">
                        <Plus className="h-4 w-4 mr-2" />
                        Add New Task
                    </Button>
                </div>

                {/* Toolbar */}
                <div className="flex flex-col sm:flex-row gap-4 my-3 justify-between items-start sm:items-center">
                    <div className="flex items-center gap-2 w-full sm:w-auto">
                        <ListFilter className="h-4 w-4 text-muted-foreground" />
                        <Select
                            value={filter || "all"}
                            onValueChange={(value) => setFilter(value === "all" ? null : value)}
                        >
                            <SelectTrigger className="w-full sm:w-[180px]">
                                <SelectValue placeholder="Filter by status" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">All Tasks</SelectItem>
                                {STATUS_OPTIONS.map((option) => (
                                    <SelectItem key={option.value} value={option.value}>
                                        {option.label}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="flex items-center gap-2">
                        <Button onClick={handleOpenCreate} size="sm" className="hidden sm:flex">
                            <Plus className="h-4 w-4 mr-2" />
                            Add Task
                        </Button>
                        <Button
                            variant="outline"
                            size="icon"
                            onClick={refetch}
                            disabled={isLoading}
                            className="shrink-0"
                        >
                            <RefreshCw className={`h-4 w-4 ${isLoading ? "animate-spin" : ""}`} />
                        </Button>
                    </div>
                </div>

                {/* Error State */}
                {error && (
                    <div className="mb-8 p-4 border border-destructive/50 bg-destructive/10 rounded-lg text-destructive">
                        <p>{error}</p>
                        <Button variant="link" onClick={refetch} className="p-0 h-auto text-destructive">
                            Try again
                        </Button>
                    </div>
                )}

                {/* Loading State */}
                {isLoading ? (
                    <div className="flex items-center justify-center py-16">
                        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
                    </div>
                ) : (
                    <>
                        <TaskList
                            tasks={tasks}
                            onEdit={handleEdit}
                            onDelete={handleDeleteClick}
                            deletingId={deletingId}
                        />

                        {/* Pagination */}
                        {pagination && pagination.pages > 1 && (
                            <div className="mt-8 flex justify-center gap-2">
                                <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={prevPage}
                                    disabled={pagination.page <= 1}
                                >
                                    Previous
                                </Button>
                                <span className="flex items-center px-4 text-sm font-medium">
                                    Page {pagination.page} of {pagination.pages}
                                </span>
                                <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={nextPage}
                                    disabled={pagination.page >= pagination.pages}
                                >
                                    Next
                                </Button>
                            </div>
                        )}
                    </>
                )}
            </main>

            {/* Task Form Dialog */}
            <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>
                            {editingTask ? "Edit Task" : "Create New Task"}
                        </DialogTitle>
                        <DialogDescription>
                            {editingTask
                                ? "Update the task details below."
                                : "Fill in the details to create a new task."}
                        </DialogDescription>
                    </DialogHeader>
                    <TaskForm
                        initialData={editingTask || undefined}
                        onSubmit={handleSubmit}
                        onCancel={handleCloseForm}
                        isSubmitting={isSubmitting}
                    />
                </DialogContent>
            </Dialog>

            {/* Delete Confirmation Dialog */}
            <Dialog open={!!taskToDelete} onOpenChange={(open) => !open && setTaskToDelete(null)}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Delete Task</DialogTitle>
                        <DialogDescription>
                            Are you sure you want to delete this task? This action cannot be undone.
                        </DialogDescription>
                    </DialogHeader>
                    <DialogFooter>
                        <Button
                            variant="outline"
                            onClick={() => setTaskToDelete(null)}
                            disabled={!!deletingId}
                        >
                            Cancel
                        </Button>
                        <Button
                            variant="destructive"
                            onClick={confirmDelete}
                            disabled={!!deletingId}
                        >
                            {deletingId ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                            Delete
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

        </div>
    );
}
