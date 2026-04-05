import { AppDispatcher } from "./dispatcher";
import { ActionTypes } from "./actionTypes";

export const InvoiceActions = {
  selectInvoice: (invoiceId: string) => {
    AppDispatcher.dispatch({ type: ActionTypes.SELECT_INVOICE, payload: invoiceId });
  },
  clearSelectedInvoice: () => {
    AppDispatcher.dispatch({ type: ActionTypes.CLEAR_SELECTED_INVOICE });
  },
  setFilter: (filter: "all" | "low" | "medium" | "high") => {
    AppDispatcher.dispatch({ type: ActionTypes.SET_FILTER, payload: filter });
  },
  setSearch: (query: string) => {
    AppDispatcher.dispatch({ type: ActionTypes.SET_INVOICE_SEARCH, payload: query });
  },
};

export const ProviderActions = {
  validationFailed: () => {
    AppDispatcher.dispatch({ type: ActionTypes.PROVIDER_VALIDATION_FAILED });
  },
  submitPending: () => {
    AppDispatcher.dispatch({ type: ActionTypes.PROVIDER_SUBMIT_PENDING });
  },
  submitSuccess: () => {
    AppDispatcher.dispatch({ type: ActionTypes.PROVIDER_SUBMIT_SUCCESS });
  },
  submitFail: () => {
    AppDispatcher.dispatch({ type: ActionTypes.PROVIDER_SUBMIT_FAIL });
  },
  resetOffer: () => {
    AppDispatcher.dispatch({ type: ActionTypes.RESET_OFFER });
  },
  toggleSigned: (signed: boolean) => {
    AppDispatcher.dispatch({ type: ActionTypes.TOGGLE_SIGNED, payload: signed });
  },
  toggleAdditionalOptions: () => {
    AppDispatcher.dispatch({ type: ActionTypes.TOGGLE_ADDITIONAL_OPTIONS });
  },
};

export const WizardActions = {
  next: () => {
    AppDispatcher.dispatch({ type: ActionTypes.WIZARD_NEXT });
  },
  back: () => {
    AppDispatcher.dispatch({ type: ActionTypes.WIZARD_BACK });
  },
  selectInvoice: (invoiceId: string) => {
    AppDispatcher.dispatch({ type: ActionTypes.WIZARD_SELECT_INVOICE, payload: invoiceId });
  },
  setDiscount: (rate: string) => {
    AppDispatcher.dispatch({ type: ActionTypes.WIZARD_SET_DISCOUNT, payload: rate });
  },
  acceptTerms: (accepted: boolean) => {
    AppDispatcher.dispatch({ type: ActionTypes.WIZARD_ACCEPT_TERMS, payload: accepted });
  },
  submitPending: () => {
    AppDispatcher.dispatch({ type: ActionTypes.WIZARD_SUBMIT_PENDING });
  },
  submitSuccess: () => {
    AppDispatcher.dispatch({ type: ActionTypes.WIZARD_SUBMIT_SUCCESS });
  },
  submitFail: () => {
    AppDispatcher.dispatch({ type: ActionTypes.WIZARD_SUBMIT_FAIL });
  },
  reset: () => {
    AppDispatcher.dispatch({ type: ActionTypes.WIZARD_RESET });
  },
};

export const AssignmentActions = {
  submitPending: () => {
    AppDispatcher.dispatch({ type: ActionTypes.ASSIGNMENT_SUBMIT_PENDING });
  },
  submitSuccess: () => {
    AppDispatcher.dispatch({ type: ActionTypes.ASSIGNMENT_SUBMIT_SUCCESS });
  },
  submitFail: () => {
    AppDispatcher.dispatch({ type: ActionTypes.ASSIGNMENT_SUBMIT_FAIL });
  },
  reset: () => {
    AppDispatcher.dispatch({ type: ActionTypes.RESET_ASSIGNMENT });
  },
};

export const PayerActions = {
  selectNotification: (id: string) => {
    AppDispatcher.dispatch({ type: ActionTypes.SELECT_PAYER_NOTIFICATION, payload: id });
  },
  clearNotification: () => {
    AppDispatcher.dispatch({ type: ActionTypes.CLEAR_PAYER_NOTIFICATION });
  },
  opPending: () => {
    AppDispatcher.dispatch({ type: ActionTypes.PAYER_OP_PENDING });
  },
  opReset: () => {
    AppDispatcher.dispatch({ type: ActionTypes.PAYER_OP_RESET });
  },
  ackSuccess: (notificationId: string) => {
    AppDispatcher.dispatch({ type: ActionTypes.PAYER_ACK_SUCCESS, payload: notificationId });
  },
  paySuccess: (notificationId: string) => {
    AppDispatcher.dispatch({ type: ActionTypes.PAYER_PAY_SUCCESS, payload: notificationId });
  },
};
