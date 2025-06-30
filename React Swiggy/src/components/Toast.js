import React, { useEffect } from 'react';
import { useToast } from '../utils/useToast';

const Toast = () => {
  const { toast, hide } = useToast();

  useEffect(() => {
    if (toast) {
      const timer = setTimeout(() => {
        hide();
      }, 1000); // Auto-dismiss after 3 seconds
      return () => clearTimeout(timer);
    }
  }, [toast, hide]);

  if (!toast) return null;

  const { message, type } = toast;
  const bgColor = type === 'success' ? 'bg-green-500' : 'bg-red-500';

  return (
    <div
      className={`fixed top-6 left-1/2 -translate-x-1/2 z-50 px-6 py-3 rounded-lg shadow-lg text-white text-center transition-opacity duration-300 ${bgColor}`}
      role="alert"
    >
      {message}
    </div>
  );
};

export default Toast; 