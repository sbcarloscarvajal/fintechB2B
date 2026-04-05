import { cn } from "@/lib/utils";

interface StatusBadgeProps {
  status: "accepted" | "pending" | "rejected" | "endorsed";
  children: React.ReactNode;
}

export function StatusBadge({ status, children }: StatusBadgeProps) {
  return (
    <span
      className={cn(
        "px-2 py-1 rounded text-xs inline-block text-primary-foreground",
        status === "accepted" && "bg-fintech-dian-accepted",
        status === "pending" && "bg-fintech-dian-pending",
        status === "rejected" && "bg-fintech-dian-rejected",
        status === "endorsed" && "bg-fintech-institutional"
      )}
    >
      {children}
    </span>
  );
}
