import { FileText, Building2, Calendar, DollarSign, FileCheck, ChevronDown, ChevronUp, Eye, History, Download, XCircle } from "lucide-react";
import { FintechButton } from "@/components/FintechButton";
import { DianFeedback } from "@/components/DianFeedback";
import { ProviderActions } from "@/flux/actions";
import { useProviderStore } from "@/flux/useStore";

export function ProviderView() {
  const { isSubmitted, showError, isSigned, showAdditionalOptions } = useProviderStore();

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl mb-2 text-fintech-institutional">Vista Proveedor</h1>
          <p className="text-muted-foreground">Flujo sencillo y lineal enfocado en la acción principal</p>
        </div>

        {isSubmitted && (
          <div className="mb-6">
            <DianFeedback type="accepted" message="Factura validada ante la DIAN exitosamente. Tu oferta ha sido registrada y está disponible para los factores." />
          </div>
        )}
        {showError && (
          <div className="mb-6">
            <DianFeedback type="rejected" message="Error: Falta acuse de recibo del pagador. Por favor, firma el documento antes de ofertar." />
          </div>
        )}

        <div className="bg-card rounded-2xl border-2 border-border overflow-hidden">
          <div className="p-6 border-b border-border bg-accent">
            <div className="flex items-center gap-3">
              <div className="size-12 rounded-lg flex items-center justify-center bg-fintech-institutional">
                <FileText className="size-6 text-primary-foreground" />
              </div>
              <div className="flex-1">
                <h2 className="text-xl">Factura #FE-9901</h2>
                <p className="text-sm text-muted-foreground">Factura Electrónica de Venta</p>
              </div>
            </div>
          </div>

          <div className="p-8 space-y-6">
            <div className="flex items-start gap-3">
              <Building2 className="size-5 mt-1 text-muted-foreground" />
              <div><p className="text-sm text-muted-foreground mb-1">Pagador</p><p className="text-lg">Empresa Ejemplo S.A.</p><p className="text-sm text-muted-foreground">NIT: 900.123.456-7</p></div>
            </div>
            <div className="flex items-start gap-3">
              <Calendar className="size-5 mt-1 text-muted-foreground" />
              <div><p className="text-sm text-muted-foreground mb-1">Fecha de Emisión</p><p className="text-lg">15 de Marzo, 2026</p><p className="text-sm text-muted-foreground">Vencimiento: 14 de Abril, 2026</p></div>
            </div>
            <div className="flex items-start gap-3">
              <DollarSign className="size-5 mt-1 text-muted-foreground" />
              <div><p className="text-sm text-muted-foreground mb-1">Monto Total</p><p className="text-3xl text-fintech-institutional">$10,000,000</p><p className="text-sm text-muted-foreground">COP (Pesos Colombianos)</p></div>
            </div>

            <div className="pt-4 border-t border-border">
              <label className="flex items-center gap-3 cursor-pointer">
                <input type="checkbox" checked={isSigned} onChange={(e) => ProviderActions.toggleSigned(e.target.checked)} className="size-5 rounded cursor-pointer accent-fintech-institutional" />
                <div className="flex items-center gap-2 flex-1">
                  <FileCheck className={`size-5 ${isSigned ? "text-fintech-dian-accepted" : "text-muted-foreground"}`} />
                  <span className="text-sm">He verificado los datos y confirmo que cuento con el acuse de recibo del pagador</span>
                </div>
              </label>
            </div>
          </div>

          <div className="p-8 pt-4">
            {!isSubmitted ? (
              <>
                <FintechButton size="lg" disabled={!isSigned} onClick={() => ProviderActions.submitOffer()} className="w-full text-xl py-4">
                  <FileText className="size-6" /> OFERTAR FACTURA
                </FintechButton>
                <div className="mt-4">
                  <button onClick={() => ProviderActions.toggleAdditionalOptions()} className="w-full flex items-center justify-center gap-2 py-3 text-sm text-muted-foreground hover:text-fintech-institutional transition-colors">
                    <span>Opciones adicionales</span>
                    {showAdditionalOptions ? <ChevronUp className="size-4" /> : <ChevronDown className="size-4" />}
                  </button>
                  {showAdditionalOptions && (
                    <div className="mt-3 pt-3 border-t border-border grid grid-cols-2 gap-3">
                      {[
                        { icon: Eye, label: "Ver Detalles" },
                        { icon: Download, label: "Descargar XML" },
                        { icon: History, label: "Ver Historial" },
                        { icon: XCircle, label: "Rechazar", danger: true },
                      ].map((opt) => (
                        <button key={opt.label} className={`flex items-center justify-center gap-2 px-4 py-3 rounded-lg border border-border transition-colors text-sm ${opt.danger ? "hover:border-destructive hover:bg-destructive/5" : "hover:border-fintech-institutional hover:bg-accent"}`}>
                          <opt.icon className="size-4" /><span>{opt.label}</span>
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </>
            ) : (
              <div className="space-y-4">
                <div className="text-center py-4">
                  <div className="size-16 rounded-full mx-auto mb-4 flex items-center justify-center bg-fintech-dian-accepted">
                    <FileCheck className="size-8 text-primary-foreground" />
                  </div>
                  <p className="text-lg text-fintech-dian-accepted">¡Factura ofertada exitosamente!</p>
                </div>
                <FintechButton variant="outline" onClick={() => ProviderActions.resetOffer()} className="w-full">
                  Ofertar otra factura
                </FintechButton>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
