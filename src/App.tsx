import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AppLayout } from "@/components/AppLayout";
import { HomePage } from "@/pages/HomePage";
import { ProviderView } from "@/pages/ProviderView";
import { FactorView } from "@/pages/FactorView";
import { WizardView } from "@/pages/WizardView";
import { PayerView } from "@/pages/PayerView";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Sonner position="top-center" />
      <BrowserRouter>
        <Routes>
          <Route element={<AppLayout />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/proveedor" element={<ProviderView />} />
            <Route path="/wizard" element={<WizardView />} />
            <Route path="/factor" element={<FactorView />} />
            <Route path="/pagador" element={<PayerView />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
