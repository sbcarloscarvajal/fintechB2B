import { Bell, CheckCircle, DollarSign, Building2, Calendar, FileText, AlertTriangle } from "lucide-react";
import { FintechButton } from "@/components/FintechButton";
import { DianFeedback } from "@/components/DianFeedback";
import { LoadingSpinner } from "@/components/LoadingSpinner";
import { StatusBadge } from "@/components/StatusBadge";
import { PayerActions } from "@/flux/actions";
import { usePayerStore } from "@/flux/useStore";
import { formatCurrency } from "@/lib/formatters";
import { toast } from "sonner";
import { useEffect, useRef } from "react";

export function PayerView() {
  const { notifications, selectedNotificationId, isLoading } = usePayerStore();
  const selected = notifications.find(n => n.id === selectedNotificationId);
  const prevNotifications = useRef(notifications);

  useEffect(() => {
    for (const n of notifications) {
      const prev = prevNotifications.current.find(p => p.id === n.id);
      if (prev && prev.status !== n.status) {
        if (n.status === "acknowledged") {
          toast.success("Cesión confirmada exitosamente", { description: `Factura ${n.invoiceId} - Acuse de recibo registrado ante la DIAN.` });
        } else if (n.status === "paid") {
          toast.success("Pago confirmado", { description: `Factura ${n.invoiceId} - Pago registrado al factor ${n.factor}.` });
        }
      }
    }
    prevNotifications.current = notifications;
  }, [notifications]);

  const getStatusConfig = (status: string) => {
    switch (status) {
      case "pending_ack": return { label: "Pendiente", badge: "pending" as const };
      case "acknowledged": return { label: "Confirmada", badge: "accepted" as const };
      case "paid": return { label: "Pagada", badge: "endorsed" as const };
      default: return { label: status, badge: "pending" as const };
    }
  };

  const pendingCount = notifications.filter(n => n.status === "pending_ack").length;

  return (
    <div className="container mx-auto px-4 py-6 md:py-8">
      <div className="max-w-3xl mx-auto">
        <div className="mb-6">
          <h1 className="text-2xl md:text-3xl mb-2 text-fintech-institutional">Panel del Pagador</h1>
          <p className="text-sm text-muted-foreground">Gestiona notificaciones de cesión y pagos a factores</p>
        </div>

        {pendingCount > 0 && (
          <div className="mb-4">
            <DianFeedback
              type="pending"
              message={`Tienes ${pendingCount} cesión(es) pendiente(s) de confirmación.`}
            />
          </div>
        )}

        {/* Notifications list */}
        <div className="space-y-3">
          {notifications.map((n) => {
            const { label, badge } = getStatusConfig(n.status);
            return (
              <div
                key={n.id}
                className={`bg-card rounded-xl border-2 overflow-hidden transition-all cursor-pointer ${
                  selectedNotificationId === n.id ? "border-fintech-institutional" : "border-border hover:border-fintech-institutional/50"
                }`}
                onClick={() => PayerActions.selectNotification(n.id)}
              >
                <div className="p-4 md:p-5">
                  <div className="flex items-start gap-3">
                    <div className={`size-10 rounded-lg flex items-center justify-center flex-shrink-0 ${
                      n.status === "pending_ack" ? "bg-fintech-dian-pending" : n.status === "acknowledged" ? "bg-fintech-institutional" : "bg-fintech-dian-accepted"
                    }`}>
                      {n.status === "pending_ack" ? <AlertTriangle className="size-5 text-primary-foreground" /> :
                       n.status === "acknowledged" ? <Bell className="size-5 text-primary-foreground" /> :
                       <CheckCircle className="size-5 text-primary-foreground" />}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-2 mb-1">
                        <h3 className="font-medium truncate">Factura {n.invoiceId}</h3>
                        <StatusBadge status={badge}>{label}</StatusBadge>
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">{n.message}</p>
                      <div className="flex flex-wrap gap-4 text-xs text-muted-foreground">
                        <span className="flex items-center gap-1"><Building2 className="size-3" />{n.factor}</span>
                        <span className="flex items-center gap-1"><DollarSign className="size-3" />{formatCurrency(n.amount)}</span>
                        <span className="flex items-center gap-1"><Calendar className="size-3" />Vence: {n.dueDate}</span>
                      </div>
                    </div>
                  </div>

                  {/* Expanded actions */}
                  {selectedNotificationId === n.id && (
                    <div className="mt-4 pt-4 border-t border-border">
                      <div className="space-y-3">
                        <div className="grid grid-cols-2 gap-3 text-sm">
                          <div><p className="text-muted-foreground">Proveedor</p><p className="font-medium">{n.provider}</p></div>
                          <div><p className="text-muted-foreground">Factor cesionario</p><p className="font-medium">{n.factor}</p></div>
                          <div><p className="text-muted-foreground">Monto</p><p className="font-medium text-fintech-institutional">{formatCurrency(n.amount)}</p></div>
                          <div><p className="text-muted-foreground">Vencimiento</p><p className="font-medium">{n.dueDate}</p></div>
                        </div>

                        {n.status === "pending_ack" && (
                          <FintechButton
                            onClick={(e) => { e.stopPropagation(); PayerActions.acknowledgeAssignment(n.id); }}
                            disabled={isLoading}
                            className="w-full"
                          >
                            {isLoading ? <LoadingSpinner size="sm" label="Procesando..." /> : <><FileText className="size-4" /> Confirmar Recepción de Cesión</>}
                          </FintechButton>
                        )}
                        {n.status === "acknowledged" && (
                          <FintechButton
                            onClick={(e) => { e.stopPropagation(); PayerActions.confirmPayment(n.id); }}
                            disabled={isLoading}
                            className="w-full"
                          >
                            {isLoading ? <LoadingSpinner size="sm" label="Procesando pago..." /> : <><DollarSign className="size-4" /> Confirmar Pago al Factor</>}
                          </FintechButton>
                        )}
                        {n.status === "paid" && (
                          <div className="flex items-center justify-center gap-2 py-2 text-fintech-dian-accepted">
                            <CheckCircle className="size-5" />
                            <span className="font-medium">Pago completado</span>
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
