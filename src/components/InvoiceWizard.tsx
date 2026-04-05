import { FintechButton } from "./FintechButton";
import { DianFeedback } from "./DianFeedback";
import { Check, FileText, Settings, FileCheck, ChevronRight, ChevronLeft } from "lucide-react";
import { WizardActions } from "@/flux/actions";
import { useWizardStore } from "@/flux/useStore";
import { mockInvoices } from "@/flux/invoiceStore";
import { formatCurrency } from "@/lib/formatters";

const wizardInvoices = mockInvoices.slice(0, 3);

const steps = [
  { number: 1, title: "Seleccionar Factura", icon: FileText },
  { number: 2, title: "Condiciones", icon: Settings },
  { number: 3, title: "Firma DIAN", icon: FileCheck },
];

interface InvoiceWizardProps {
  onComplete?: () => void;
}

export function InvoiceWizard({ onComplete }: InvoiceWizardProps) {
  const { state, selectedInvoice } = useWizardStore();
  const { currentStep, selectedInvoiceId, discountRate, acceptTerms } = state;

  const totalSteps = 3;
  const progress = (currentStep / totalSteps) * 100;

  const canContinue = () => {
    if (currentStep === 1) return selectedInvoiceId !== null;
    if (currentStep === 2) return discountRate !== "";
    if (currentStep === 3) return acceptTerms;
    return false;
  };

  const handleSubmit = () => {
    WizardActions.complete();
    onComplete?.();
  };

  return (
    <div className="bg-card rounded-xl border border-border overflow-hidden max-w-3xl mx-auto">
      {/* Progress Bar */}
      <div className="p-6 border-b border-border bg-accent">
        <div className="mb-4">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm text-fintech-institutional">Progreso</span>
            <span className="text-sm text-fintech-institutional">{Math.round(progress)}%</span>
          </div>
          <div className="h-2 bg-muted rounded-full overflow-hidden">
            <div className="h-full transition-all duration-300 bg-fintech-institutional" style={{ width: `${progress}%` }} />
          </div>
        </div>

        <div className="flex items-center justify-between">
          {steps.map((step, index) => (
            <div key={step.number} className="flex items-center flex-1">
              <div className="flex flex-col items-center flex-1">
                <div className={`size-10 rounded-full flex items-center justify-center mb-2 transition-all ${
                  currentStep > step.number
                    ? "bg-fintech-dian-accepted text-primary-foreground"
                    : currentStep === step.number
                    ? "bg-fintech-institutional text-primary-foreground"
                    : "bg-muted text-muted-foreground"
                }`}>
                  {currentStep > step.number ? <Check className="size-5" /> : <step.icon className="size-5" />}
                </div>
                <span className={`text-xs text-center ${currentStep >= step.number ? "text-foreground" : "text-muted-foreground"}`}>
                  {step.title}
                </span>
              </div>
              {index < steps.length - 1 && (
                <ChevronRight className={`size-5 mx-2 flex-shrink-0 ${currentStep > step.number ? "text-fintech-dian-accepted" : "text-muted-foreground"}`} />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Step Content */}
      <div className="p-8 min-h-[400px]">
        {currentStep === 1 && (
          <div>
            <h2 className="text-2xl mb-2">Paso 1: Selecciona la factura</h2>
            <p className="text-muted-foreground mb-6">Elige la factura que deseas ofertar a los factores</p>
            <div className="space-y-3">
              {wizardInvoices.map((invoice) => (
                <label
                  key={invoice.id}
                  className={`flex items-center gap-4 p-4 rounded-lg border-2 cursor-pointer transition-all ${
                    selectedInvoiceId === invoice.id
                      ? "border-fintech-institutional bg-accent"
                      : "border-border hover:border-fintech-institutional"
                  }`}
                >
                  <input
                    type="radio"
                    name="invoice"
                    value={invoice.id}
                    checked={selectedInvoiceId === invoice.id}
                    onChange={(e) => WizardActions.selectInvoice(e.target.value)}
                    className="size-5 accent-fintech-institutional"
                  />
                  <div className="flex-1">
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="font-medium text-fintech-institutional">Factura {invoice.id}</p>
                        <p className="text-sm text-muted-foreground">{invoice.payer}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-lg">{formatCurrency(invoice.amount)}</p>
                        <p className="text-xs text-muted-foreground">
                          Vence: {new Date(invoice.dueDate).toLocaleDateString("es-CO")}
                        </p>
                      </div>
                    </div>
                  </div>
                </label>
              ))}
            </div>
          </div>
        )}

        {currentStep === 2 && selectedInvoice && (
          <div>
            <h2 className="text-2xl mb-2">Paso 2: Define las condiciones</h2>
            <p className="text-muted-foreground mb-6">Configura los términos de tu oferta</p>
            <div className="bg-accent rounded-lg p-4 mb-6">
              <p className="text-sm text-muted-foreground mb-1">Factura seleccionada</p>
              <p className="text-lg text-fintech-institutional">{selectedInvoice.id} - {formatCurrency(selectedInvoice.amount)}</p>
            </div>
            <div className="space-y-6">
              <div>
                <label className="block mb-2">Tasa de descuento (%)</label>
                <input
                  type="number"
                  step="0.1"
                  min="0"
                  max="10"
                  value={discountRate}
                  onChange={(e) => WizardActions.setDiscount(e.target.value)}
                  className="w-full px-4 py-3 rounded-lg border-2 border-border focus:border-fintech-institutional outline-none bg-background"
                  placeholder="Ej: 2.5"
                />
              </div>
              <div className="bg-accent rounded-lg p-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm">Monto original:</span>
                  <span>{formatCurrency(selectedInvoice.amount)}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Descuento ({discountRate}%):</span>
                  <span className="text-fintech-dian-pending">-{formatCurrency((selectedInvoice.amount * parseFloat(discountRate || "0")) / 100)}</span>
                </div>
                <div className="border-t border-border mt-2 pt-2 flex justify-between items-center">
                  <span>Monto a recibir:</span>
                  <span className="text-lg text-fintech-dian-accepted">
                    {formatCurrency(selectedInvoice.amount - (selectedInvoice.amount * parseFloat(discountRate || "0")) / 100)}
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}

        {currentStep === 3 && selectedInvoice && (
          <div>
            <h2 className="text-2xl mb-2">Paso 3: Firma y confirmación DIAN</h2>
            <p className="text-muted-foreground mb-6">Revisa y confirma la información antes de ofertar</p>
            <DianFeedback type="processing" message="La factura está lista para ser validada ante la DIAN." className="mb-6" />
            <div className="bg-accent rounded-lg p-6 mb-6">
              <p className="text-sm text-muted-foreground mb-4">Resumen de la oferta</p>
              <div className="grid grid-cols-2 gap-4">
                <div><p className="text-sm text-muted-foreground">Factura</p><p className="text-fintech-institutional">{selectedInvoice.id}</p></div>
                <div><p className="text-sm text-muted-foreground">Pagador</p><p>{selectedInvoice.payer}</p></div>
                <div><p className="text-sm text-muted-foreground">Monto original</p><p>{formatCurrency(selectedInvoice.amount)}</p></div>
                <div><p className="text-sm text-muted-foreground">Tasa de descuento</p><p>{discountRate}%</p></div>
              </div>
            </div>
            <label className="flex items-start gap-3 p-4 border-2 border-border rounded-lg cursor-pointer hover:border-fintech-institutional transition-colors">
              <input
                type="checkbox"
                checked={acceptTerms}
                onChange={(e) => WizardActions.acceptTerms(e.target.checked)}
                className="size-5 mt-0.5 accent-fintech-institutional"
              />
              <div className="flex-1">
                <p className="mb-2">Acepto que la información es correcta y autorizo la firma electrónica ante la DIAN</p>
                <p className="text-sm text-muted-foreground">
                  Esta acción generará la oferta formal y será registrada ante la DIAN.
                </p>
              </div>
            </label>
          </div>
        )}
      </div>

      {/* Navigation */}
      <div className="p-6 border-t border-border flex justify-between gap-4">
        <FintechButton variant="outline" onClick={() => WizardActions.back()} disabled={currentStep === 1} className="min-w-32">
          <ChevronLeft className="size-4" /> Anterior
        </FintechButton>
        {currentStep < totalSteps ? (
          <FintechButton onClick={() => WizardActions.next()} disabled={!canContinue()} className="min-w-32">
            Continuar <ChevronRight className="size-4" />
          </FintechButton>
        ) : (
          <FintechButton onClick={handleSubmit} disabled={!canContinue()} className="min-w-32">
            <FileCheck className="size-4" /> Ofertar Factura
          </FintechButton>
        )}
      </div>
    </div>
  );
}
