/**
 * Punto de entrada del patrón Flux: acciones → dispatcher → store → vistas (vía hooks).
 */
export { AppDispatcher } from "./dispatcher";
export type { FluxAction } from "./dispatcher";
export { ActionTypes } from "./actionTypes";
export {
  InvoiceActions,
  ProviderActions,
  WizardActions,
  AssignmentActions,
  PayerActions,
} from "./actions";
export {
  invoiceStore,
  mockInvoices,
  type Invoice,
  type InvoiceStoreState,
  type ProviderStoreState,
  type WizardStoreState,
  type AssignmentStoreState,
  type PayerStoreState,
  type PayerNotification,
} from "./invoiceStore";
export {
  useInvoiceStore,
  useProviderStore,
  useWizardStore,
  useAssignmentStore,
  usePayerStore,
} from "./useStore";
