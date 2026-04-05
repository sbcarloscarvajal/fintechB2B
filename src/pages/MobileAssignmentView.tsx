import { useNavigate } from "react-router-dom";
import { ArrowLeft, Building2, DollarSign, FileText, Calendar, CheckCircle } from "lucide-react";
import { FintechButton } from "@/components/FintechButton";
import { DianFeedback } from "@/components/DianFeedback";
import { AssignmentActions } from "@/flux/actions";
import { useAssignmentStore } from "@/flux/useStore";
import { formatCurrency } from "@/lib/formatters";

export function MobileAssignmentView() {
  const { isAccepted } = useAssignmentStore();
  const navigate = useNavigate();

  const details = [
    { icon: Building2, label: "Pagador Original", value: "Empresa Ejemplo S.A.", sub: "NIT: 900.123.456-7" },
    { icon: Building2, label: "Nuevo Factor", value: "Banco Factoring XYZ S.A.", sub: "NIT: 890.111.222-3" },
    { icon: DollarSign, label: "Monto a Pagar", value: formatCurrency(10000000), sub: "Pesos Colombianos (COP)", large: true },
    { icon: Calendar, label: "Fecha de Pago", value: "14 de Abril, 2026", sub: "30 días desde emisión" },
  ];

  return (
    <div className="min-h-screen bg-background flex flex-col max-w-md mx-auto">
      <header className="bg-card border-b border-border px-4 py-3 flex items-center gap-3">
        <button onClick={() => navigate(-1)} className="p-2 -ml-2 hover:bg-accent rounded-lg transition-colors">
          <ArrowLeft className="size-5" />
        </button>
        <h1 className="text-lg">Aceptar Cesión DIAN</h1>
      </header>

      {isAccepted && (
        <div className="p-4">
          <DianFeedback type="accepted" message="Cesión aceptada exitosamente ante la DIAN. El factor recibirá notificación inmediata." />
        </div>
      )}

      <div className="flex-1 overflow-y-auto p-4 pb-32">
        <div className="bg-card rounded-xl border border-border overflow-hidden">
          <div className="p-4 border-b border-border bg-accent">
            <div className="flex items-center gap-3">
              <div className="size-12 rounded-lg flex items-center justify-center flex-shrink-0 bg-fintech-institutional">
                <FileText className="size-6 text-primary-foreground" />
              </div>
              <div className="flex-1 min-w-0">
                <h2 className="text-lg truncate">Detalle de Cesión de Factura</h2>
                <p className="text-sm text-muted-foreground">Factura #FE-9901</p>
              </div>
            </div>
          </div>

          <div className="p-5 space-y-5">
            {details.map((d) => (
              <div key={d.label} className="flex items-start gap-3">
                <div className="size-10 rounded-lg flex items-center justify-center flex-shrink-0 bg-accent">
                  <d.icon className="size-5 text-fintech-institutional" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-muted-foreground mb-1">{d.label}</p>
                  <p className={d.large ? "text-2xl text-fintech-institutional" : "text-base truncate"}>{d.value}</p>
                  <p className="text-sm text-muted-foreground">{d.sub}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="p-4 mx-4 mb-4 rounded-lg bg-accent">
            <p className="text-sm text-muted-foreground">
              <strong>Importante:</strong> Al aceptar esta cesión, reconoces que el nuevo acreedor será Banco Factoring XYZ S.A., según lo registrado ante la DIAN.
            </p>
          </div>
        </div>
      </div>

      <div className="fixed bottom-0 left-0 right-0 bg-card border-t border-border p-4 max-w-md mx-auto shadow-lg">
        {!isAccepted ? (
          <FintechButton onClick={() => AssignmentActions.accept()} className="w-full" style={{ minHeight: "48px", fontSize: "16px" }}>
            <CheckCircle className="size-5" /> ACEPTAR CESIÓN DIAN
          </FintechButton>
        ) : (
          <div className="text-center py-3">
            <div className="inline-flex items-center gap-2 text-fintech-dian-accepted">
              <CheckCircle className="size-6" />
              <span className="text-lg">Cesión aceptada exitosamente</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
