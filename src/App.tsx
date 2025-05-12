import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ScrollToTop from "./components/ScrollToTop";
import Index from "./pages/Index";
import About from "./pages/About";
import NotFound from "./pages/NotFound";
import Flyer from "./pages/Flyer";
import Coaches from "./pages/Coaches";
import Parents from "./pages/Parents";
import Academics from "./pages/Academics";
import ESAs from "./pages/ESAs";
import IMGPage from "./pages/IMGPage";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/about" element={<About />} />
          <Route path="/flyer" element={<Flyer />} />
          <Route path="/coaches" element={<Coaches />} />
          <Route path="/parents" element={<Parents />} />
          <Route path="/academics" element={<Academics />} />
          <Route path="/esas" element={<ESAs />} />
          <Route path="/img" element={<IMGPage />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
