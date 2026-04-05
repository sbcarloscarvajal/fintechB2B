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
  searchQuery: string;
  filteredInvoices: Invoice[];
  selectedInvoice: Invoice | null;
}

export interface ProviderStoreState {
  isSubmitted: boolean;
  showError: boolean;
  isSigned: boolean;
  showAdditionalOptions: boolean;
  isLoading: boolean;
}

export interface WizardStoreState {
  currentStep: number;
  selectedInvoiceId: string | null;
  discountRate: string;
  acceptTerms: boolean;
  isComplete: boolean;
  isLoading: boolean;
}

export interface AssignmentStoreState {
  isAccepted: boolean;
  isLoading: boolean;
}

export interface PayerStoreState {
  notifications: PayerNotification[];
  selectedNotificationId: string | null;
  isConfirming: boolean;
  isLoading: boolean;
}

export interface PayerNotification {
  id: string;
  invoiceId: string;
  provider: string;
  factor: string;
  amount: number;
  dueDate: string;
  status: "pending_ack" | "acknowledged" | "paid";
  message: string;
}

type Listener = () => void;

class InvoiceStore {
  private _invoiceState: InvoiceStoreState;
  private _providerState: ProviderStoreState;
  private _wizardState: WizardStoreState;
  private _assignmentState: AssignmentStoreState;
  private _payerState: PayerStoreState;
  private listeners: Set<Listener> = new Set();

  constructor() {
    const filtered = mockInvoices;
    this._invoiceState = {
      invoices: mockInvoices,
      selectedInvoiceId: null,
      filter: "all",
      searchQuery: "",
      filteredInvoices: filtered,
      selectedInvoice: null,
    };

    this._providerState = {
      isSubmitted: false,
      showError: false,
      isSigned: false,
      showAdditionalOptions: false,
      isLoading: false,
    };

    this._wizardState = {
      currentStep: 1,
      selectedInvoiceId: null,
      discountRate: "2.5",
      acceptTerms: false,
      isComplete: false,
      isLoading: false,
    };

    this._assignmentState = {
      isAccepted: false,
      isLoading: false,
    };

    this._payerState = {
      notifications: [
        { id: "N-01", invoiceId: "FE-01", provider: "TechCorp S.A.S", factor: "Banco Factoring XYZ S.A.", amount: 10000000, dueDate: "2026-04-14", status: "pending_ack", message: "Se ha cedido la factura FE-01 al factor Banco Factoring XYZ S.A. Debe confirmar la recepción." },
        { id: "N-02", invoiceId: "FE-04", provider: "Comercial Sur", factor: "FinCapital S.A.", amount: 2000000, dueDate: "2026-04-09", status: "acknowledged", message: "Cesión confirmada. El pago debe realizarse al factor FinCapital S.A. antes del vencimiento." },
        { id: "N-03", invoiceId: "FE-05", provider: "Logística Express", factor: "Banco Factoring XYZ S.A.", amount: 8500000, dueDate: "2026-04-21", status: "paid", message: "Pago confirmado exitosamente al factor." },
      ],
      selectedNotificationId: null,
      isConfirming: false,
      isLoading: false,
    };

    AppDispatcher.register("invoiceStore", this.handleAction.bind(this));
  }

  private recomputeDerived() {
    const { invoices, filter, selectedInvoiceId, searchQuery } = this._invoiceState;
    let list = filter === "all" ? invoices : invoices.filter(inv => inv.risk === filter);
    const q = searchQuery.trim().toLowerCase();
    if (q) {
      list = list.filter(
        inv =>
          inv.id.toLowerCase().includes(q) ||
          inv.provider.toLowerCase().includes(q) ||
          inv.payer.toLowerCase().includes(q)
      );
    }
    const selectedInvoice = invoices.find(inv => inv.id === selectedInvoiceId) || null;
    this._invoiceState = { ...this._invoiceState, filteredInvoices: list, selectedInvoice };
  }

  private handleAction(action: FluxAction) {
    switch (action.type) {
      case ActionTypes.SELECT_INVOICE:
        this._invoiceState = { ...this._invoiceState, selectedInvoiceId: action.payload };
        this.recomputeDerived();
        break;
      case ActionTypes.CLEAR_SELECTED_INVOICE:
        this._invoiceState = { ...this._invoiceState, selectedInvoiceId: null };
        this.recomputeDerived();
        break;
      case ActionTypes.SET_FILTER:
        this._invoiceState = { ...this._invoiceState, filter: action.payload };
        this.recomputeDerived();
        break;
      case ActionTypes.SET_INVOICE_SEARCH:
        this._invoiceState = { ...this._invoiceState, searchQuery: action.payload ?? "" };
        this.recomputeDerived();
        break;

      case ActionTypes.PROVIDER_VALIDATION_FAILED:
        this._providerState = { ...this._providerState, showError: true };
        setTimeout(() => {
          this._providerState = { ...this._providerState, showError: false };
          this.emitChange();
        }, 5000);
        break;
      case ActionTypes.PROVIDER_CLEAR_VALIDATION_ERROR:
        this._providerState = { ...this._providerState, showError: false };
        break;
      case ActionTypes.PROVIDER_SUBMIT_PENDING:
        this._providerState = { ...this._providerState, isLoading: true, showError: false };
        break;
      case ActionTypes.PROVIDER_SUBMIT_SUCCESS:
        this._providerState = { ...this._providerState, isLoading: false, isSubmitted: true };
        break;
      case ActionTypes.PROVIDER_SUBMIT_FAIL:
        this._providerState = { ...this._providerState, isLoading: false };
        break;
      case ActionTypes.RESET_OFFER:
        this._providerState = { isSubmitted: false, showError: false, isSigned: false, showAdditionalOptions: false, isLoading: false };
        break;
      case ActionTypes.TOGGLE_SIGNED:
        this._providerState = { ...this._providerState, isSigned: action.payload };
        break;
      case ActionTypes.TOGGLE_ADDITIONAL_OPTIONS:
        this._providerState = { ...this._providerState, showAdditionalOptions: !this._providerState.showAdditionalOptions };
        break;

      case ActionTypes.WIZARD_NEXT:
        if (this._wizardState.currentStep < 3)
          this._wizardState = { ...this._wizardState, currentStep: this._wizardState.currentStep + 1 };
        break;
      case ActionTypes.WIZARD_BACK:
        if (this._wizardState.currentStep > 1)
          this._wizardState = { ...this._wizardState, currentStep: this._wizardState.currentStep - 1 };
        break;
      case ActionTypes.WIZARD_SELECT_INVOICE:
        this._wizardState = { ...this._wizardState, selectedInvoiceId: action.payload };
        break;
      case ActionTypes.WIZARD_SET_DISCOUNT:
        this._wizardState = { ...this._wizardState, discountRate: action.payload };
        break;
      case ActionTypes.WIZARD_ACCEPT_TERMS:
        this._wizardState = { ...this._wizardState, acceptTerms: action.payload };
        break;
      case ActionTypes.WIZARD_SUBMIT_PENDING:
        this._wizardState = { ...this._wizardState, isLoading: true };
        break;
      case ActionTypes.WIZARD_SUBMIT_SUCCESS:
        this._wizardState = { ...this._wizardState, isLoading: false, isComplete: true };
        break;
      case ActionTypes.WIZARD_SUBMIT_FAIL:
        this._wizardState = { ...this._wizardState, isLoading: false };
        break;
      case ActionTypes.WIZARD_RESET:
        this._wizardState = { currentStep: 1, selectedInvoiceId: null, discountRate: "2.5", acceptTerms: false, isComplete: false, isLoading: false };
        break;

      case ActionTypes.ASSIGNMENT_SUBMIT_PENDING:
        this._assignmentState = { ...this._assignmentState, isLoading: true };
        break;
      case ActionTypes.ASSIGNMENT_SUBMIT_SUCCESS:
        this._assignmentState = { isAccepted: true, isLoading: false };
        break;
      case ActionTypes.ASSIGNMENT_SUBMIT_FAIL:
        this._assignmentState = { ...this._assignmentState, isLoading: false };
        break;
      case ActionTypes.RESET_ASSIGNMENT:
        this._assignmentState = { isAccepted: false, isLoading: false };
        break;

      case ActionTypes.SELECT_PAYER_NOTIFICATION:
        this._payerState = { ...this._payerState, selectedNotificationId: action.payload };
        break;
      case ActionTypes.CLEAR_PAYER_NOTIFICATION:
        this._payerState = { ...this._payerState, selectedNotificationId: null };
        break;
      case ActionTypes.PAYER_OP_PENDING:
        this._payerState = { ...this._payerState, isLoading: true };
        break;
      case ActionTypes.PAYER_OP_RESET:
        this._payerState = { ...this._payerState, isLoading: false };
        break;
      case ActionTypes.PAYER_ACK_SUCCESS: {
        const id = action.payload as string;
        const notifications = this._payerState.notifications.map(n =>
          n.id === id ? { ...n, status: "acknowledged" as const, message: "Cesión confirmada. El pago debe realizarse al factor antes del vencimiento." } : n
        );
        this._payerState = { ...this._payerState, notifications, isLoading: false };
        break;
      }
      case ActionTypes.PAYER_PAY_SUCCESS: {
        const id = action.payload as string;
        const notifications = this._payerState.notifications.map(n =>
          n.id === id ? { ...n, status: "paid" as const, message: "Pago confirmado exitosamente al factor." } : n
        );
        this._payerState = { ...this._payerState, notifications, isLoading: false };
        break;
      }
      default:
        return;
    }
    this.emitChange();
  }

  getInvoiceState(): InvoiceStoreState { return this._invoiceState; }
  getProviderState(): ProviderStoreState { return this._providerState; }
  getWizardState(): WizardStoreState { return this._wizardState; }
  getAssignmentState(): AssignmentStoreState { return this._assignmentState; }
  getPayerState(): PayerStoreState { return this._payerState; }

  getWizardSelectedInvoice(): Invoice | null {
    const wizardInvoices = mockInvoices.slice(0, 3);
    return wizardInvoices.find(inv => inv.id === this._wizardState.selectedInvoiceId) || null;
  }

  addListener(listener: Listener) { this.listeners.add(listener); }
  removeListener(listener: Listener) { this.listeners.delete(listener); }
  private emitChange() { this.listeners.forEach(l => l()); }
}

export const invoiceStore = new InvoiceStore();
