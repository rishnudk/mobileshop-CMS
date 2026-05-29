export function formatCurrency(amount: number) {
  return `Rs. ${amount.toLocaleString("en-IN")}`;
}

export function formatDateTime(value: string) {
  return new Intl.DateTimeFormat("en-IN", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(value));
}

export function formatDate(value: string) {
  return new Intl.DateTimeFormat("en-IN", {
    dateStyle: "medium",
  }).format(new Date(value));
}

export function formatComplaintStatus(status: string) {
  const labels: Record<string, string> = {
    PENDING: "Pending",
    DIAGNOSING: "Diagnosing",
    REPAIRING: "Repairing",
    READY: "Ready",
    DELIVERED: "Delivered",
    CANCELLED: "Cancelled",
  };

  return labels[status] ?? status;
}
