import { BrowserRouter } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { VaultProvider } from "./providers/VaultProvider.jsx";
import { TutorProvider } from "./providers/TutorProvider.jsx";
import AppRouter from "./router.jsx";

export default function App() {
  return (
    <VaultProvider>
      <TutorProvider>
        <BrowserRouter>
          <AppRouter />
        </BrowserRouter>
        <Toaster
          position="bottom-right"
          toastOptions={{ style: { borderRadius: 8, fontSize: 14 } }}
        />
      </TutorProvider>
    </VaultProvider>
  );
}
