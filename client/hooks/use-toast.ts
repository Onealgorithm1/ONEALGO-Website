// Simplified toast hook - removing complex state management that was causing crashes

export function useToast() {
  return {
    toasts: [],
    toast: () => {}, // No-op function
    dismiss: () => {}, // No-op function
  };
}

export function toast() {
  // No-op function for compatibility
  return {
    id: "noop",
    dismiss: () => {},
    update: () => {},
  };
}
