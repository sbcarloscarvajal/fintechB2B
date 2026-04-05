import { useMutation } from "@tanstack/react-query";
import { InvoiceWizard } from "@/components/InvoiceWizard";
import { DianFeedback } from "@/components/DianFeedback";
import { FintechButton } from "@/components/FintechButton";
import { LoadingSpinner } from "@/components/LoadingSpinner";
import { mockDianApi } from "@/api/mockDianApi";
import { CheckCircle2, RotateCcw } from "lucide-react";
import { WizardActions } from "@/flux/actions";
import { useWizardStore } from "@/flux/useStore";
import { toast } from "sonner";
import { useEffect, useRef } from "react";

export function WizardView() {
  const finalizeOffer = useMutation({
    mutationFn: () => mockDianApi.completeWizardOffer(),
    onMutate: () => WizardActions.submitPending(),
    onSuccess: () => WizardActions.submitSuccess(),
    onError: () => {
      WizardActions.submitFail();
      toast.error("No pudimos completar la oferta", {
        description: "Revisa tu conexión e inténtalo de nuevo.",
      });
    },
  });

  const { state } = useWizardStore();
  const prevComplete = useRef(state.isComplete);

  useEffect(() => {
    if (state.isComplete && !prevComplete.current) {
      toast.success("¡Factura ofertada!", { description: "Tu oferta ha sido validada ante la DIAN." });
    }
    prevComplete.current = state.isComplete;
  }, [state.isComplete]);

  if (state.isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto flex flex-col items-center justify-center min-h-[400px]">
          <LoadingSpinner size="lg" label="Validando ante la DIAN..." />
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-6 md:py-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-6 text-center">
          <h1 className="text-2xl md:text-3xl mb-2 text-fintech-institutional">Ofertar Factura</h1>
          <p className="text-sm text-muted-foreground">Completa los pasos para ofertar tu factura</p>
        </div>

        {state.isComplete ? (
          <div className="space-y-6">
            <DianFeedback type="accepted" message="¡Factura ofertada exitosamente! Tu oferta ha sido validada ante la DIAN." />
            <div className="bg-card rounded-xl border border-border p-8 md:p-12 text-center">
              <div className="size-20 rounded-full mx-auto mb-6 flex items-center justify-center bg-fintech-dian-accepted">
                <CheckCircle2 className="size-10 text-primary-foreground" />
              </div>
              <h2 className="text-2xl mb-3 text-fintech-dian-accepted">¡Proceso Completado!</h2>
              <p className="text-muted-foreground mb-6 max-w-md mx-auto">
                Recibirás notificaciones cuando los factores presenten ofertas.
              </p>
              <FintechButton onClick={() => WizardActions.reset()} variant="outline">
                <RotateCcw className="size-4" /> Ofertar otra factura
              </FintechButton>
            </div>
          </div>
        ) : (
          <InvoiceWizard onFinalizeOffer={() => finalizeOffer.mutate()} />
        )}
      </div>
    </div>
  );
}
