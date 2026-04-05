import { useMutation } from "@tanstack/react-query";
import { Search, Download, TrendingUp, AlertTriangle, CheckCircle2, Eye, Landmark } from "lucide-react";
import { FintechButton } from "@/components/FintechButton";
import { StatusBadge } from "@/components/StatusBadge";
import { DianFeedback } from "@/components/DianFeedback";
import { LoadingSpinner } from "@/components/LoadingSpinner";
import { mockDianApi } from "@/api/mockDianApi";
import { AssignmentActions, InvoiceActions } from "@/flux/actions";
import { useAssignmentStore, useInvoiceStore } from "@/flux/useStore";
import { formatCurrency, formatDate, getRiskText, getStatusText } from "@/lib/formatters";
import { toast } from "sonner";
import { useEffect, useRef } from "react";

export function FactorView() {
  const acceptAssignment = useMutation({
    mutationFn: () => mockDianApi.acceptFactorAssignment(),
    onMutate: () => AssignmentActions.submitPending(),
    onSuccess: () => AssignmentActions.submitSuccess(),
    onError: () => {
      AssignmentActions.submitFail();
      toast.error("No se pudo completar la operación", { description: "Intenta nuevamente." });
    },
  });

  const { filter, searchQuery, invoices, filteredInvoices, selectedInvoice } = useInvoiceStore();
  const { isAccepted, isLoading: assignmentLoading } = useAssignmentStore();
  const prevAccepted = useRef(isAccepted);

  useEffect(() => {
    if (isAccepted && !prevAccepted.current) {
      toast.success("Operación registrada", {
        description: "Simulación de aceptación de cesión y desembolso completada (datos de prueba).",
      });
    }
    prevAccepted.current = isAccepted;
  }, [isAccepted]);

  const closeDetail = () => {
    AssignmentActions.reset();
    InvoiceActions.clearSelectedInvoice();
  };

  const stats = {
    total: invoices.length,
    totalAmount: invoices.reduce((sum, inv) => sum + inv.amount, 0),
    lowRisk: invoices.filter(inv => inv.risk === "low").length,
    accepted: invoices.filter(inv => inv.status === "accepted").length,
  };

  const getRiskIcon = (risk: string) => {
    if (risk === "low") return <CheckCircle2 className="size-4 text-fintech-dian-accepted" />;
    if (risk === "medium") return <AlertTriangle className="size-4 text-fintech-dian-pending" />;
    return <TrendingUp className="size-4 text-fintech-dian-rejected" />;
  };

  return (
    <div className="container mx-auto px-4 py-6 md:py-8">
      <div className="mb-6">
        <h1 className="text-2xl md:text-3xl mb-2 text-fintech-institutional">Dashboard Factor</h1>
        <p className="text-sm text-muted-foreground">
          Resumen superior, filtros y tabla (jerarquía visual); navegación inferior en móvil según actividad sumativa.
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 mb-6">
        {[
          { label: "Total Facturas", value: stats.total, color: "text-fintech-institutional" },
          { label: "Monto Total", value: formatCurrency(stats.totalAmount), color: "text-fintech-institutional" },
          { label: "Bajo Riesgo", value: stats.lowRisk, color: "text-fintech-dian-accepted" },
          { label: "Aceptadas", value: stats.accepted, color: "text-fintech-dian-accepted" },
        ].map((s) => (
          <div key={s.label} className="bg-card rounded-lg p-3 md:p-4 border border-border">
            <p className="text-xs md:text-sm text-muted-foreground mb-1">{s.label}</p>
            <p className={`text-lg md:text-2xl font-medium ${s.color}`}>{s.value}</p>
          </div>
        ))}
      </div>

      {/* Toolbar */}
      <div className="bg-card rounded-lg border border-border p-3 md:p-4 mb-4">
        <div className="flex flex-col md:flex-row gap-3 items-start md:items-center justify-between">
          <div className="relative w-full md:max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => InvoiceActions.setSearch(e.target.value)}
              placeholder="Buscar por ID, proveedor o pagador..."
              className="w-full pl-10 pr-4 py-2 rounded-lg border border-border bg-background text-sm"
            />
          </div>
          <div className="flex gap-2 flex-wrap">
            {([["all", "Todos"], ["low", "Bajo"], ["medium", "Medio"], ["high", "Alto"]] as const).map(([val, label]) => (
              <button
                key={val}
                onClick={() => InvoiceActions.setFilter(val)}
                className={`px-3 py-2 rounded-lg text-xs md:text-sm transition-colors min-h-[36px] ${
                  filter === val
                    ? val === "all" ? "bg-fintech-institutional text-primary-foreground"
                    : val === "low" ? "bg-fintech-dian-accepted text-primary-foreground"
                    : val === "medium" ? "bg-fintech-dian-pending text-primary-foreground"
                    : "bg-fintech-dian-rejected text-primary-foreground"
                    : "bg-accent text-foreground"
                }`}
              >
                {label}
              </button>
            ))}
            <FintechButton variant="outline" className="ml-1 text-xs md:text-sm">
              <Download className="size-4" /> Exportar
            </FintechButton>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="bg-card rounded-lg border border-border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-accent">
                {["ID", "Proveedor", "Pagador", "Monto", "Emisión", "Vence", "Riesgo", "Estado", "DIAN", ""].map((h) => (
                  <th key={h} className={`p-2 md:p-3 text-left text-xs md:text-sm ${h === "Monto" ? "text-right" : ""}`}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filteredInvoices.map((invoice) => (
                <tr key={invoice.id} className="border-b border-border hover:bg-accent transition-colors">
                  <td className="p-2 md:p-3 text-fintech-institutional font-medium">{invoice.id}</td>
                  <td className="p-2 md:p-3">{invoice.provider}</td>
                  <td className="p-2 md:p-3 text-muted-foreground">{invoice.payer}</td>
                  <td className="p-2 md:p-3 text-right">{formatCurrency(invoice.amount)}</td>
                  <td className="p-2 md:p-3 text-muted-foreground">{formatDate(invoice.issueDate)}</td>
                  <td className="p-2 md:p-3 text-muted-foreground">{formatDate(invoice.dueDate)}</td>
                  <td className="p-2 md:p-3"><div className="flex items-center gap-1">{getRiskIcon(invoice.risk)}<span className="hidden md:inline">{getRiskText(invoice.risk)}</span></div></td>
                  <td className="p-2 md:p-3"><StatusBadge status={invoice.status}>{getStatusText(invoice.status)}</StatusBadge></td>
                  <td className="p-2 md:p-3 text-muted-foreground text-xs">{invoice.dianStatus}</td>
                  <td className="p-2 md:p-3">
                    <button type="button" onClick={() => InvoiceActions.selectInvoice(invoice.id)} className="p-2 rounded text-fintech-institutional hover:bg-fintech-institutional hover:text-primary-foreground transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center" aria-label={`Ver detalle ${invoice.id}`}>
                      <Eye className="size-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Detail Modal */}
      {selectedInvoice && (
        <div className="fixed inset-0 bg-foreground/30 flex items-center justify-center p-4 z-50" onClick={closeDetail}>
          <div className="bg-card rounded-xl p-5 md:p-6 max-w-lg w-full max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <h3 className="text-xl mb-4 text-fintech-institutional">Detalle Factura {selectedInvoice.id}</h3>
            <DianFeedback type="accepted" message={`Validada ante la DIAN. Estado: ${selectedInvoice.dianStatus}`} className="mb-4" />
            <div className="space-y-3 mb-6">
              <div><p className="text-sm text-muted-foreground">Proveedor</p><p className="text-lg">{selectedInvoice.provider}</p></div>
              <div><p className="text-sm text-muted-foreground">Monto</p><p className="text-2xl text-fintech-institutional">{formatCurrency(selectedInvoice.amount)}</p></div>
              <div className="flex gap-4">
                <div className="flex-1"><p className="text-sm text-muted-foreground">Riesgo</p><div className="flex items-center gap-2 mt-1">{getRiskIcon(selectedInvoice.risk)}<span>{getRiskText(selectedInvoice.risk)}</span></div></div>
                <div className="flex-1"><p className="text-sm text-muted-foreground">Estado</p><div className="mt-1"><StatusBadge status={selectedInvoice.status}>{getStatusText(selectedInvoice.status)}</StatusBadge></div></div>
              </div>
            </div>

            <div className="border-t border-border pt-4 mb-4">
              <div className="flex items-center gap-2 mb-2 text-fintech-institutional">
                <Landmark className="size-5" />
                <span className="font-medium">Simulación factor (Flux)</span>
              </div>
              <p className="text-sm text-muted-foreground mb-3">
                <code className="text-xs bg-muted px-1 rounded">useMutation</code> (TanStack Query) ejecuta la llamada simulada a DIAN/backend; al resolver, las acciones Flux actualizan el store y <code className="text-xs bg-muted px-1 rounded">useAssignmentStore</code> re-renderiza la vista.
              </p>
              {isAccepted ? (
                <DianFeedback type="accepted" message="Cesión aceptada y desembolso simulado correctamente (prototipo)." />
              ) : (
                <FintechButton
                  type="button"
                  onClick={() => acceptAssignment.mutate()}
                  disabled={assignmentLoading || acceptAssignment.isPending}
                  className="w-full min-h-[44px]"
                >
                  {assignmentLoading || acceptAssignment.isPending ? (
                    <LoadingSpinner size="sm" label="Procesando desembolso..." />
                  ) : (
                    <>Aceptar operación y simular desembolso</>
                  )}
                </FintechButton>
              )}
            </div>

            <FintechButton onClick={closeDetail} variant="outline" className="w-full mt-2">Cerrar</FintechButton>
          </div>
        </div>
      )}
    </div>
  );
}
