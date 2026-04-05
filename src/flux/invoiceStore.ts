import { AppDispatcher, FluxAction } from "./dispatcher";
import { ActionTypes } from "./actionTypes";

export interface Invoice {
  id: string;
  provider: string;
  payer: string;
  amount: number;
  issueDate: string;
  dueDate: string;
  risk: "low" | "medium" | "high";
  status: "accepted" | "pending" | "rejected" | "endorsed";
  dianStatus: string;
}

export const mockInvoices: Invoice[] = [
  { id: "FE-01", provider: "TechCorp S.A.S", payer: "Empresa Ejemplo S.A.", amount: 10000000, issueDate: "2026-03-15", dueDate: "2026-04-14", risk: "low", status: "accepted", dianStatus: "Validada" },
  { id: "FE-02", provider: "Servicios Pro Ltda", payer: "Compañía ABC S.A.", amount: 5000000, issueDate: "2026-03-18", dueDate: "2026-04-17", risk: "medium", status: "accepted", dianStatus: "Validada" },
  { id: "FE-03", provider: "Industrias XYZ", payer: "Corporación Delta", amount: 20000000, issueDate: "2026-03-20", dueDate: "2026-05-19", risk: "high", status: "pending", dianStatus: "En revisión" },
  { id: "FE-04", provider: "Comercial Sur", payer: "Distribuidora Norte", amount: 2000000, issueDate: "2026-03-10", dueDate: "2026-04-09", risk: "low", status: "endorsed", dianStatus: "Validada" },
  { id: "FE-05", provider: "Logística Express", payer: "Transportes Rápidos", amount: 8500000, issueDate: "2026-03-22", dueDate: "2026-04-21", risk: "low", status: "accepted", dianStatus: "Validada" },
  { id: "FE-06", provider: "Construcciones Beta", payer: "Inversiones Gamma", amount: 35000000, issueDate: "2026-03-19", dueDate: "2026-06-17", risk: "high", status: "pending", dianStatus: "Pendiente validación" },
];

export interface InvoiceStoreState {
  invoices: Invoice[];
  selectedInvoiceId: string | null;
  filter: "all" | "low" | "medium" | "high";
}

export interface ProviderStoreState {
  isSubmitted: boolean;
  showError: boolean;
  isSigned: boolean;
  showAdditionalOptions: boolean;
}

export interface WizardStoreState {
  currentStep: number;
  selectedInvoiceId: string | null;
  discountRate: string;
  acceptTerms: boolean;
  isComplete: boolean;
}

export interface AssignmentStoreState {
  isAccepted: boolean;
}

type Listener = () => void;

class InvoiceStore {
  private state: InvoiceStoreState = {
    invoices: mockInvoices,
    selectedInvoiceId: null,
    filter: "all",
  };

  private providerState: ProviderStoreState = {
    isSubmitted: false,
    showError: false,
    isSigned: false,
    showAdditionalOptions: false,
  };

  private wizardState: WizardStoreState = {
    currentStep: 1,
    selectedInvoiceId: null,
    discountRate: "2.5",
    acceptTerms: false,
    isComplete: false,
  };

  private assignmentState: AssignmentStoreState = {
    isAccepted: false,
  };

  private listeners: Set<Listener> = new Set();

  constructor() {
    AppDispatcher.register("invoiceStore", this.handleAction.bind(this));
  }

  private handleAction(action: FluxAction) {
    switch (action.type) {
      case ActionTypes.SELECT_INVOICE:
        this.state = { ...this.state, selectedInvoiceId: action.payload };
        break;
      case ActionTypes.CLEAR_SELECTED_INVOICE:
        this.state = { ...this.state, selectedInvoiceId: null };
        break;
      case ActionTypes.SET_FILTER:
        this.state = { ...this.state, filter: action.payload };
        break;
      case ActionTypes.SUBMIT_OFFER:
        if (!this.providerState.isSigned) {
          this.providerState = { ...this.providerState, showError: true };
          setTimeout(() => {
            this.providerState = { ...this.providerState, showError: false };
            this.emitChange();
          }, 5000);
        } else {
          this.providerState = { ...this.providerState, isSubmitted: true };
        }
        break;
      case ActionTypes.RESET_OFFER:
        this.providerState = { isSubmitted: false, showError: false, isSigned: false, showAdditionalOptions: false };
        break;
      case ActionTypes.TOGGLE_SIGNED:
        this.providerState = { ...this.providerState, isSigned: action.payload };
        break;
      case ActionTypes.TOGGLE_ADDITIONAL_OPTIONS:
        this.providerState = { ...this.providerState, showAdditionalOptions: !this.providerState.showAdditionalOptions };
        break;
      case ActionTypes.WIZARD_NEXT:
        if (this.wizardState.currentStep < 3)
          this.wizardState = { ...this.wizardState, currentStep: this.wizardState.currentStep + 1 };
        break;
      case ActionTypes.WIZARD_BACK:
        if (this.wizardState.currentStep > 1)
          this.wizardState = { ...this.wizardState, currentStep: this.wizardState.currentStep - 1 };
        break;
      case ActionTypes.WIZARD_SELECT_INVOICE:
        this.wizardState = { ...this.wizardState, selectedInvoiceId: action.payload };
        break;
      case ActionTypes.WIZARD_SET_DISCOUNT:
        this.wizardState = { ...this.wizardState, discountRate: action.payload };
        break;
      case ActionTypes.WIZARD_ACCEPT_TERMS:
        this.wizardState = { ...this.wizardState, acceptTerms: action.payload };
        break;
      case ActionTypes.WIZARD_COMPLETE:
        this.wizardState = { ...this.wizardState, isComplete: true };
        break;
      case ActionTypes.WIZARD_RESET:
        this.wizardState = { currentStep: 1, selectedInvoiceId: null, discountRate: "2.5", acceptTerms: false, isComplete: false };
        break;
      case ActionTypes.ACCEPT_ASSIGNMENT:
        this.assignmentState = { isAccepted: true };
        break;
      case ActionTypes.RESET_ASSIGNMENT:
        this.assignmentState = { isAccepted: false };
        break;
      default:
        return;
    }
    this.emitChange();
  }

  getState(): InvoiceStoreState { return this.state; }
  getProviderState(): ProviderStoreState { return this.providerState; }
  getWizardState(): WizardStoreState { return this.wizardState; }
  getAssignmentState(): AssignmentStoreState { return this.assignmentState; }

  getFilteredInvoices(): Invoice[] {
    return this.state.filter === "all"
      ? this.state.invoices
      : this.state.invoices.filter(inv => inv.risk === this.state.filter);
  }

  getSelectedInvoice(): Invoice | null {
    return this.state.invoices.find(inv => inv.id === this.state.selectedInvoiceId) || null;
  }

  getWizardSelectedInvoice(): Invoice | null {
    const wizardInvoices = mockInvoices.slice(0, 3);
    return wizardInvoices.find(inv => inv.id === this.wizardState.selectedInvoiceId) || null;
  }

  addListener(listener: Listener) { this.listeners.add(listener); }
  removeListener(listener: Listener) { this.listeners.delete(listener); }
  private emitChange() { this.listeners.forEach(l => l()); }
}

export const invoiceStore = new InvoiceStore();
