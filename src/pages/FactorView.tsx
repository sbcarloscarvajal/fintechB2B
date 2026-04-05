import { Search, Download, TrendingUp, AlertTriangle, CheckCircle2, Eye } from "lucide-react";
import { FintechButton } from "@/components/FintechButton";
import { StatusBadge } from "@/components/StatusBadge";
import { DianFeedback } from "@/components/DianFeedback";
import { InvoiceActions } from "@/flux/actions";
import { useInvoiceStore } from "@/flux/useStore";
import { formatCurrency, formatDate, getRiskText, getStatusText } from "@/lib/formatters";

export function FactorView() {
  const { state, filteredInvoices, selectedInvoice } = useInvoiceStore();
  const { filter, invoices } = state;

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
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl mb-2 text-fintech-institutional">Vista Factor</h1>
        <p className="text-muted-foreground">Gestión eficiente de facturas con información densa y organizada</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        {[
          { label: "Total Facturas", value: stats.total, color: "text-fintech-institutional" },
          { label: "Monto Total", value: formatCurrency(stats.totalAmount), color: "text-fintech-institutional" },
          { label: "Bajo Riesgo", value: stats.lowRisk, color: "text-fintech-dian-accepted" },
          { label: "Aceptadas", value: stats.accepted, color: "text-fintech-dian-accepted" },
        ].map((s) => (
          <div key={s.label} className="bg-card rounded-lg p-4 border border-border">
            <p className="text-sm text-muted-foreground mb-1">{s.label}</p>
            <p className={`text-2xl ${s.color}`}>{s.value}</p>
          </div>
        ))}
      </div>

      {/* Toolbar */}
      <div className="bg-card rounded-lg border border-border p-4 mb-6">
        <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
            <input type="text" placeholder="Buscar por ID, proveedor o pagador..." className="w-full pl-10 pr-4 py-2 rounded-lg border border-border bg-background" />
          </div>
          <div className="flex gap-2 flex-wrap">
            {([["all", "Todos"], ["low", "Bajo Riesgo"], ["medium", "Medio"], ["high", "Alto Riesgo"]] as const).map(([val, label]) => (
              <button
                key={val}
                onClick={() => InvoiceActions.setFilter(val)}
                className={`px-3 py-2 rounded-lg text-sm transition-colors ${
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
            <FintechButton variant="outline" className="ml-2">
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
                {["ID", "Proveedor", "Pagador", "Monto", "Emisión", "Vencimiento", "Riesgo", "Estado", "DIAN", "Acciones"].map((h) => (
                  <th key={h} className={`p-3 text-left ${h === "Monto" ? "text-right" : ""} ${h === "Acciones" ? "text-center" : ""}`}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filteredInvoices.map((invoice) => (
                <tr key={invoice.id} className={`border-b border-border hover:bg-accent transition-colors ${state.selectedInvoiceId === invoice.id ? "bg-accent" : ""}`}>
                  <td className="p-3 text-fintech-institutional">{invoice.id}</td>
                  <td className="p-3">{invoice.provider}</td>
                  <td className="p-3 text-muted-foreground">{invoice.payer}</td>
                  <td className="p-3 text-right">{formatCurrency(invoice.amount)}</td>
                  <td className="p-3 text-muted-foreground">{formatDate(invoice.issueDate)}</td>
                  <td className="p-3 text-muted-foreground">{formatDate(invoice.dueDate)}</td>
                  <td className="p-3"><div className="flex items-center gap-2">{getRiskIcon(invoice.risk)}<span>{getRiskText(invoice.risk)}</span></div></td>
                  <td className="p-3"><StatusBadge status={invoice.status}>{getStatusText(invoice.status)}</StatusBadge></td>
                  <td className="p-3 text-muted-foreground">{invoice.dianStatus}</td>
                  <td className="p-3 text-center">
                    <button onClick={() => InvoiceActions.selectInvoice(invoice.id)} className="p-2 rounded text-fintech-institutional hover:bg-fintech-institutional hover:text-primary-foreground transition-colors">
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
        <div className="fixed inset-0 bg-foreground/30 flex items-center justify-center p-4 z-50" onClick={() => InvoiceActions.clearSelectedInvoice()}>
          <div className="bg-card rounded-xl p-6 max-w-lg w-full" onClick={(e) => e.stopPropagation()}>
            <h3 className="text-xl mb-4 text-fintech-institutional">Detalle de Factura {selectedInvoice.id}</h3>
            <DianFeedback type="accepted" message={`Factura validada ante la DIAN. Estado: ${selectedInvoice.dianStatus}`} className="mb-4" />
            <div className="space-y-3 mb-6">
              <div><p className="text-sm text-muted-foreground">Proveedor</p><p className="text-lg">{selectedInvoice.provider}</p></div>
              <div><p className="text-sm text-muted-foreground">Monto</p><p className="text-2xl text-fintech-institutional">{formatCurrency(selectedInvoice.amount)}</p></div>
              <div className="flex gap-4">
                <div className="flex-1"><p className="text-sm text-muted-foreground">Riesgo</p><div className="flex items-center gap-2 mt-1">{getRiskIcon(selectedInvoice.risk)}<span>{getRiskText(selectedInvoice.risk)}</span></div></div>
                <div className="flex-1"><p className="text-sm text-muted-foreground">Estado</p><div className="mt-1"><StatusBadge status={selectedInvoice.status}>{getStatusText(selectedInvoice.status)}</StatusBadge></div></div>
              </div>
            </div>
            <FintechButton onClick={() => InvoiceActions.clearSelectedInvoice()} className="w-full">Cerrar</FintechButton>
          </div>
        </div>
      )}
    </div>
  );
}
