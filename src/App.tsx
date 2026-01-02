import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import FormWpp from "./pages/FormWpp";
import EnergiaBlindada from "./pages/EnergiaBlindada";
import EnergiaBlindadaObrigado from "./pages/EnergiaBlindadaObrigado";
import { DashLayout } from "./components/dashboard/DashLayout";
import { Visao } from "./pages/dashboard/Visao";
import { Live } from "./pages/dashboard/Live";
import { OraculoCRM } from "./pages/dashboard/OraculoCRM";
import { Colheita } from "./pages/dashboard/Colheita";
import { Templo } from "./pages/dashboard/Templo";
import { Guardiao } from "./pages/dashboard/Guardiao";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/form-wpp" element={<FormWpp />} />
          <Route path="/wp-energiablindada" element={<EnergiaBlindada />} />
          <Route path="/wp-energiablindada/obrigado" element={<EnergiaBlindadaObrigado />} />
          
          {/* Dashboard Routes */}
          <Route path="/dash" element={<DashLayout />}>
            <Route index element={<Navigate to="/dash/live" replace />} />
            <Route path="live" element={<Live />} />
            <Route path="crm" element={<OraculoCRM />} />
            <Route path="colheita" element={<Colheita />} />
            <Route path="guardiao" element={<Guardiao />} />
            <Route path="visao" element={<Visao />} />
            <Route path="templo" element={<Templo />} />
          </Route>
          
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
