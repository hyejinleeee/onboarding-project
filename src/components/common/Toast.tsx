import { useEffect, useState } from "react";
import { ToastType } from "../../types/toast.type";

type ToastProps = {
  toast: ToastType;
};

const Toast = ({ toast }: ToastProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  useEffect(() => {
    setIsOpen(true);
    setTimeout(() => setIsOpen(false), 1300 - 500);
  }, []);

  return (
    <div className="fixed top-0 bottom-0 left-0 right-0 z-30 flex justify-center items-center">
      <div
        className={`inline-flex justify-center items-center bg-lime-600 text-white rounded-lg font-normal transition-opacity duration-500 px-4 py-3 text-sm ${
          isOpen ? "opacity-100" : "opacity-0"
        }`}
      >
        {toast.label}
      </div>
    </div>
  );
};

export default Toast;
