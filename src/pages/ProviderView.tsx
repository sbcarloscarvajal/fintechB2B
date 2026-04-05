import { useMutation } from "@tanstack/react-query";
import { FileText, Building2, Calendar, DollarSign, FileCheck, ChevronDown, ChevronUp, Eye, History, Download, XCircle } from "lucide-react";
import { FintechButton } from "@/components/FintechButton";
import { DianFeedback } from "@/components/DianFeedback";
import { LoadingSpinner } from "@/components/LoadingSpinner";
import { mockDianApi } from "@/api/mockDianApi";
import { ProviderActions } from "@/flux/actions";
import { useProviderStore } from "@/flux/useStore";
import { toast } from "sonner";
import { useEffect, useRef } from "react";

export function ProviderView() {
  const { isSubmitted, showError, isSigned, showAdditionalOptions, isLoading } = useProviderStore();
  const prevSubmitted = useRef(isSubmitted);

  const submitOffer = useMutation({
    mutationFn: () => mockDianApi.submitProviderOffer(),
    onMutate: () => ProviderActions.submitPending(),
    onSuccess: () => ProviderActions.submitSuccess(),
    onError: () => {
      ProviderActions.submitFail();
      toast.error("No pudimos registrar la oferta", {
        description: "El servicio no respondió. Inténtalo de nuevo.",
      });
    },
  });

  const busy = isLoading || submitOffer.isPending;

  const handlePrimaryAction = () => {
    if (!isSigned) {
      ProviderActions.validationFailed();
      return;
    }
    submitOffer.mutate();
  };

  useEffect(() => {
    if (isSubmitted && !prevSubmitted.current) {
      toast.success("Factura ofertada exitosamente", {
        description: "Tu oferta ha sido registrada y validada ante la DIAN.",
      });
    }
    prevSubmitted.current = isSubmitted;
  }, [isSubmitted]);

  useEffect(() => {
    if (showError) {
      toast.error("No se pudo ofertar la factura", {
        description: "Falta acuse de recibo del pagador. Firma el documento antes de ofertar.",
      });
    }
  }, [showError]);

  const pendingActionBlock = (
    <>
      <FintechButton
        size="lg"
        disabled={!isSigned || busy}
        onClick={handlePrimaryAction}
        className="w-full text-lg md:text-xl py-4 min-h-[48px]"
      >
        {busy ? (
          <LoadingSpinner size="sm" label="Procesando..." />
        ) : (
          <><FileText className="size-6" /> OFERTAR FACTURA</>
        )}
      </FintechButton>
      <div className="mt-4">
        <button
          type="button"
          onClick={() => ProviderActions.toggleAdditionalOptions()}
          className="w-full flex items-center justify-center gap-2 py-3 min-h-[44px] text-sm text-muted-foreground hover:text-fintech-institutional transition-colors"
        >
          <span>Opciones adicionales</span>
          {showAdditionalOptions ? <ChevronUp className="size-4" /> : <ChevronDown className="size-4" />}
        </button>
        {showAdditionalOptions && (
          <div className="mt-3 pt-3 border-t border-border grid grid-cols-2 gap-2">
            {[
              { icon: Eye, label: "Ver Detalles" },
              { icon: Download, label: "Descargar XML" },
              { icon: History, label: "Ver Historial" },
              { icon: XCircle, label: "Rechazar", danger: true },
            ].map((opt) => (
              <button
                key={opt.label}
                type="button"
                className={`flex items-center justify-center gap-2 px-4 py-3 rounded-lg border border-border transition-colors text-sm min-h-[44px] ${opt.danger ? "hover:border-destructive hover:bg-destructive/5" : "hover:border-fintech-institutional hover:bg-accent"}`}
              >
                <opt.icon className="size-4" /><span>{opt.label}</span>
              </button>
            ))}
          </div>
        )}
      </div>
    </>
  );

  const successActionBlock = (
    <div className="space-y-4">
      <div className="text-center py-4">
        <div className="size-16 rounded-full mx-auto mb-4 flex items-center justify-center bg-fintech-dian-accepted">
          <FileCheck className="size-8 text-primary-foreground" />
        </div>
        <p className="text-lg text-fintech-dian-accepted">¡Factura ofertada exitosamente!</p>
      </div>
      <FintechButton variant="outline" onClick={() => ProviderActions.resetOffer()} className="w-full min-h-[44px]">
        Ofertar otra factura
      </FintechButton>
    </div>
  );

  return (
    <div className={`container mx-auto px-4 py-6 md:py-8 ${isSubmitted ? "pb-8" : "pb-32 md:pb-8"}`}>
      <div className="max-w-2xl mx-auto">
        <div className="mb-6">
          <h1 className="text-2xl md:text-3xl mb-2 text-fintech-institutional">Ofertar Factura</h1>
          <p className="text-sm text-muted-foreground">
            Vista proveedor: Ley de Hick (CTA principal) y Ley de Fitts (área táctil ≥44px, CTA fijo en móvil).
          </p>
        </div>

        <div className="space-y-4 mb-4" role="status" aria-live="polite" aria-atomic="true">
          {isSubmitted && (
            <DianFeedback type="accepted" message="Factura validada ante la DIAN exitosamente. Tu oferta ha sido registrada y está disponible para los factores." />
          )}
          {showError && (
            <DianFeedback type="rejected" message="Falta acuse de recibo del pagador. Firma el documento antes de ofertar." />
          )}
        </div>

        <div className="bg-card rounded-2xl border-2 border-border overflow-hidden">
          <div className="p-4 md:p-6 border-b border-border bg-accent">
            <div className="flex items-center gap-3">
              <div className="size-12 rounded-lg flex items-center justify-center bg-fintech-institutional">
                <FileText className="size-6 text-primary-foreground" />
              </div>
              <div className="flex-1">
                <h2 className="text-lg md:text-xl font-semibold">Factura #FE-9901</h2>
                <p className="text-sm text-muted-foreground">Factura Electrónica de Venta</p>
              </div>
            </div>
          </div>

          <div className="p-5 md:p-8 space-y-5">
            <div className="flex items-start gap-3">
              <Building2 className="size-5 mt-1 text-muted-foreground flex-shrink-0" />
              <div><p className="text-sm text-muted-foreground mb-1">Pagador</p><p className="text-base md:text-lg font-medium">Empresa Ejemplo S.A.</p><p className="text-sm text-muted-foreground">NIT: 900.123.456-7</p></div>
            </div>
            <div className="flex items-start gap-3">
              <Calendar className="size-5 mt-1 text-muted-foreground flex-shrink-0" />
              <div><p className="text-sm text-muted-foreground mb-1">Fecha de Emisión</p><p className="text-base md:text-lg">15 de Marzo, 2026</p><p className="text-sm text-muted-foreground">Vencimiento: 14 de Abril, 2026</p></div>
            </div>
            <div className="flex items-start gap-3">
              <DollarSign className="size-5 mt-1 text-muted-foreground flex-shrink-0" />
              <div>
                <p className="text-sm text-muted-foreground mb-1">Monto Total</p>
                <p className="text-2xl md:text-3xl text-fintech-institutional font-semibold">$10,000,000</p>
                <p className="text-sm text-muted-foreground">COP (Pesos Colombianos)</p>
              </div>
            </div>

            <div className="pt-4 border-t border-border">
              <label className="flex items-center gap-3 cursor-pointer min-h-[44px]">
                <input type="checkbox" checked={isSigned} onChange={(e) => ProviderActions.toggleSigned(e.target.checked)} className="size-5 rounded cursor-pointer accent-fintech-institutional" />
                <div className="flex items-center gap-2 flex-1">
                  <FileCheck className={`size-5 flex-shrink-0 ${isSigned ? "text-fintech-dian-accepted" : "text-muted-foreground"}`} />
                  <span className="text-sm">He verificado los datos y confirmo el acuse de recibo del pagador</span>
                </div>
              </label>
            </div>
          </div>

          <div className="p-5 md:p-8 pt-2 md:pt-4 border-t border-border">
            {isSubmitted ? successActionBlock : (
              <div className="hidden md:block">{pendingActionBlock}</div>
            )}
          </div>
        </div>
      </div>

      {!isSubmitted && (
        <div
          className="md:hidden fixed bottom-0 left-0 right-0 z-30 border-t border-border bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/85 px-4 pt-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] shadow-[0_-4px_24px_rgba(0,0,0,0.08)]"
        >
          <div className="max-w-2xl mx-auto space-y-2">
            {pendingActionBlock}
          </div>
        </div>
      )}
    </div>
  );
}
