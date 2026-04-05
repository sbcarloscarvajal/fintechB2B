import { useSyncExternalStore, useCallback } from "react";
import { invoiceStore } from "./invoiceStore";
import type { InvoiceStoreState, ProviderStoreState, WizardStoreState, AssignmentStoreState, PayerStoreState, Invoice } from "./invoiceStore";

function useStoreSubscribe() {
  return useCallback((listener: () => void) => {
    invoiceStore.addListener(listener);
    return () => invoiceStore.removeListener(listener);
  }, []);
}

export function useInvoiceStore(): InvoiceStoreState {
  const subscribe = useStoreSubscribe();
  return useSyncExternalStore(subscribe, () => invoiceStore.getInvoiceState());
}

export function useProviderStore(): ProviderStoreState {
  const subscribe = useStoreSubscribe();
  return useSyncExternalStore(subscribe, () => invoiceStore.getProviderState());
}

export function useWizardStore(): { state: WizardStoreState; selectedInvoice: Invoice | null } {
  const subscribe = useStoreSubscribe();
  const state = useSyncExternalStore(subscribe, () => invoiceStore.getWizardState());
  const selectedInvoice = useSyncExternalStore(subscribe, () => invoiceStore.getWizardSelectedInvoice());
  return { state, selectedInvoice };
}

export function useAssignmentStore(): AssignmentStoreState {
  const subscribe = useStoreSubscribe();
  return useSyncExternalStore(subscribe, () => invoiceStore.getAssignmentState());
}

export function usePayerStore(): PayerStoreState {
  const subscribe = useStoreSubscribe();
  return useSyncExternalStore(subscribe, () => invoiceStore.getPayerState());
}
