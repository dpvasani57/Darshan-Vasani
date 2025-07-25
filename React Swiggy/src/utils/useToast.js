import { useState, useCallback, useEffect } from 'react';

// This is a simple store for our toast state
const toastState = {
  listeners: [],
  show(message, type = 'success') {
    this.listeners.forEach(listener => listener({ message, type }));
  },
  subscribe(listener) {
    this.listeners.push(listener);
    return () => {
      this.listeners = this.listeners.filter(l => l !== listener);
    };
  },
};

export const showToast = toastState.show.bind(toastState);

export const useToast = () => {
  const [toast, setToast] = useState(null);

  const hide = useCallback(() => setToast(null), []);

  useEffect(() => {
    const unsubscribe = toastState.subscribe(setToast);
    return () => unsubscribe();
  }, []);

  return { toast, hide };
}; 