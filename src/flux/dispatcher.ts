type Callback = (payload: FluxAction) => void;

export interface FluxAction {
  type: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  payload?: any;
}

class Dispatcher {
  private callbacks: Map<string, Callback> = new Map();

  register(id: string, callback: Callback): void {
    this.callbacks.set(id, callback);
  }

  unregister(id: string): void {
    this.callbacks.delete(id);
  }

  dispatch(action: FluxAction): void {
    this.callbacks.forEach((callback) => {
      callback(action);
    });
  }
}

export const AppDispatcher = new Dispatcher();
