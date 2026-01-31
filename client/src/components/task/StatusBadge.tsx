import { cn } from "../../lib/utils";

interface StatusBadgeProps {
    status: "pending" | "in-progress" | "completed";
    className?: string;
}

const statusConfig = {
    pending: {
        label: "Pending",
        className: "bg-amber-100 text-amber-800 border-amber-200",
    },
    "in-progress": {
        label: "In Progress",
        className: "bg-blue-100 text-blue-800 border-blue-200",
    },
    completed: {
        label: "Completed",
        className: "bg-green-100 text-green-800 border-green-200",
    },
};

export function StatusBadge({ status, className }: StatusBadgeProps) {
    const config = statusConfig[status];

    return (
        <span
            className={cn(
                "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors",
                config.className,
                className
            )}
        >
            {config.label}
        </span>
    );
}
