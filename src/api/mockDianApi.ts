/**
 * Simulación de servicios web DIAN / backend (Actividad Sumativa).
 * La capa asíncrona la gestiona TanStack Query; aquí solo hay Promesas con latencia de red.
 */
const delay = (ms: number) => new Promise<void>(resolve => {
  setTimeout(resolve, ms);
});

export const mockDianApi = {
  submitProviderOffer: () => delay(1500),
  completeWizardOffer: () => delay(1500),
  acceptFactorAssignment: () => delay(1500),
  acknowledgePayerCession: (_notificationId: string) => delay(1500),
  confirmPayerPaymentToFactor: (_notificationId: string) => delay(1500),
};
