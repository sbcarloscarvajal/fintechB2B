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
};

export const ProviderActions = {
  submitOffer: () => {
    AppDispatcher.dispatch({ type: ActionTypes.SUBMIT_OFFER });
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
  complete: () => {
    AppDispatcher.dispatch({ type: ActionTypes.WIZARD_COMPLETE });
  },
  reset: () => {
    AppDispatcher.dispatch({ type: ActionTypes.WIZARD_RESET });
  },
};

export const AssignmentActions = {
  accept: () => {
    AppDispatcher.dispatch({ type: ActionTypes.ACCEPT_ASSIGNMENT });
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
  acknowledgeAssignment: (notificationId: string) => {
    AppDispatcher.dispatch({ type: ActionTypes.ACKNOWLEDGE_ASSIGNMENT, payload: notificationId });
  },
  confirmPayment: (notificationId: string) => {
    AppDispatcher.dispatch({ type: ActionTypes.CONFIRM_PAYMENT, payload: notificationId });
  },
};
