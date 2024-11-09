import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import QueryProvider from "./providers/QueryProvider.tsx";
import { ToastProvider } from "./providers/toast.context.tsx";
import { ModalProvider } from "./providers/modal.context.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryProvider>
      <ToastProvider>
        <ModalProvider>
          <App />
        </ModalProvider>
      </ToastProvider>
    </QueryProvider>
  </StrictMode>
);
