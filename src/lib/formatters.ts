export function formatCurrency(amount: number) {
  return new Intl.NumberFormat("es-CO", {
    style: "currency",
    currency: "COP",
    minimumFractionDigits: 0,
  }).format(amount);
}

export function formatDate(dateString: string) {
  return new Date(dateString).toLocaleDateString("es-CO", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export function getRiskText(risk: string) {
  const map: Record<string, string> = { low: "Bajo", medium: "Medio", high: "Alto" };
  return map[risk] || risk;
}

export function getStatusText(status: string) {
  const map: Record<string, string> = { accepted: "Aceptado", pending: "Pendiente", rejected: "Rechazado", endorsed: "Endosado" };
  return map[status] || status;
}
