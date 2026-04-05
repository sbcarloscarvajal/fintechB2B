import { useSyncExternalStore, useCallback } from "react";
import { invoiceStore } from "./invoiceStore";

export function useInvoiceStore() {
  const subscribe = useCallback((listener: () => void) => {
    invoiceStore.addListener(listener);
    return () => invoiceStore.removeListener(listener);
  }, []);

  const state = useSyncExternalStore(subscribe, () => invoiceStore.getState());
  const filteredInvoices = useSyncExternalStore(subscribe, () => invoiceStore.getFilteredInvoices());
  const selectedInvoice = useSyncExternalStore(subscribe, () => invoiceStore.getSelectedInvoice());

  return { state, filteredInvoices, selectedInvoice };
}

export function useProviderStore() {
  const subscribe = useCallback((listener: () => void) => {
    invoiceStore.addListener(listener);
    return () => invoiceStore.removeListener(listener);
  }, []);

  return useSyncExternalStore(subscribe, () => invoiceStore.getProviderState());
}

export function useWizardStore() {
  const subscribe = useCallback((listener: () => void) => {
    invoiceStore.addListener(listener);
    return () => invoiceStore.removeListener(listener);
  }, []);

  const state = useSyncExternalStore(subscribe, () => invoiceStore.getWizardState());
  const selectedInvoice = useSyncExternalStore(subscribe, () => invoiceStore.getWizardSelectedInvoice());

  return { state, selectedInvoice };
}

export function useAssignmentStore() {
  const subscribe = useCallback((listener: () => void) => {
    invoiceStore.addListener(listener);
    return () => invoiceStore.removeListener(listener);
  }, []);

  return useSyncExternalStore(subscribe, () => invoiceStore.getAssignmentState());
}
