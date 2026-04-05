import { CheckCircle2, AlertTriangle, XCircle, Clock } from "lucide-react";
import { cn } from "@/lib/utils";

interface DianFeedbackProps {
  type: "accepted" | "pending" | "rejected" | "processing";
  message: string;
  className?: string;
}

const config = {
  accepted: { icon: CheckCircle2, label: "Éxito", bg: "bg-fintech-dian-accepted" },
  pending: { icon: AlertTriangle, label: "Pendiente", bg: "bg-fintech-dian-pending" },
  rejected: { icon: XCircle, label: "Error", bg: "bg-fintech-dian-rejected" },
  processing: { icon: Clock, label: "Procesando", bg: "bg-fintech-institutional" },
};

export function DianFeedback({ type, message, className }: DianFeedbackProps) {
  const { icon: Icon, label, bg } = config[type];

  return (
    <div className={cn("rounded-lg p-4 flex items-start gap-3 text-primary-foreground", bg, className)}>
      <Icon className="size-5 mt-0.5 flex-shrink-0" />
      <div className="flex-1">
        <p className="font-medium mb-1">{label}</p>
        <p className="text-sm opacity-95">{message}</p>
      </div>
    </div>
  );
}
