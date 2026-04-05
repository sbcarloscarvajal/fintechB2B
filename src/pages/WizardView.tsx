import { InvoiceWizard } from "@/components/InvoiceWizard";
import { DianFeedback } from "@/components/DianFeedback";
import { FintechButton } from "@/components/FintechButton";
import { CheckCircle2, RotateCcw } from "lucide-react";
import { WizardActions } from "@/flux/actions";
import { useWizardStore } from "@/flux/useStore";

export function WizardView() {
  const { state } = useWizardStore();

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8 text-center">
          <h1 className="text-3xl mb-2 text-fintech-institutional">Ofertar Factura - Wizard Multi-paso</h1>
          <p className="text-muted-foreground">Aplicación de la Ley de Miller: Formulario dividido en pasos secuenciales</p>
        </div>

        {state.isComplete ? (
          <div className="space-y-6">
            <DianFeedback type="accepted" message="¡Factura ofertada exitosamente! Tu oferta ha sido validada ante la DIAN." />
            <div className="bg-card rounded-xl border border-border p-12 text-center">
              <div className="size-20 rounded-full mx-auto mb-6 flex items-center justify-center bg-fintech-dian-accepted">
                <CheckCircle2 className="size-10 text-primary-foreground" />
              </div>
              <h2 className="text-2xl mb-3 text-fintech-dian-accepted">¡Proceso Completado!</h2>
              <p className="text-muted-foreground mb-6 max-w-md mx-auto">
                Tu factura ha sido procesada correctamente. Recibirás notificaciones cuando los factores presenten ofertas.
              </p>
              <FintechButton onClick={() => WizardActions.reset()} variant="outline">
                <RotateCcw className="size-4" /> Ofertar otra factura
              </FintechButton>
            </div>
          </div>
        ) : (
          <InvoiceWizard onComplete={() => WizardActions.complete()} />
        )}
      </div>
    </div>
  );
}
