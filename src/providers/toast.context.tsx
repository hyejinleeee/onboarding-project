import { createContext, PropsWithChildren, useContext, useState } from "react";
import Toast from "../components/common/Toast";
import { ToastContextType, ToastType } from "../types/toast.type";

const initialValue: ToastContextType = {
  on: () => {},
};

const ToastContext = createContext(initialValue);

export const useToast = (): ToastContextType => useContext(ToastContext);

export function ToastProvider({ children }: PropsWithChildren) {
  const [toast, setToast] = useState<ToastType | null>(null);

  const value: ToastContextType = {
    on: (message: ToastType) => {
      setToast(message);

      setTimeout(() => setToast(null), 1300);
    },
  };

  return (
    <ToastContext.Provider value={value}>
      {toast && <Toast toast={toast} />}
      {children}
    </ToastContext.Provider>
  );
}
