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
import { useEffect } from "react";

const queryClient = new QueryClient();

// Hotjar tracking component
const HotjarTracking = () => {
  useEffect(() => {
    // Hotjar Tracking Code
    const hotjarScript = document.createElement('script');
    hotjarScript.innerHTML = `
      (function(h,o,t,j,a,r){
        h.hj=h.hj||function(){(h.hj.q=h.hj.q||[]).push(arguments)};
        h._hjSettings={hjid:6406153,hjsv:6};
        a=o.getElementsByTagName('head')[0];
        r=o.createElement('script');r.async=1;
        r.src=t+h._hjSettings.hjid+j+h._hjSettings.hjsv;
        a.appendChild(r);
      })(window,document,'https://static.hotjar.com/c/hotjar-','.js?sv=');
    `;
    document.head.appendChild(hotjarScript);

    return () => {
      try {
        if (hotjarScript.parentNode) {
          hotjarScript.parentNode.removeChild(hotjarScript);
        }
      } catch (e) {
        console.error('Error removing Hotjar script:', e);
      }
    };
  }, []);

  return null;
};

// Mouseflow tracking component
const MouseflowTracking = () => {
  useEffect(() => {
    // Mouseflow Tracking Code
    const mfScript = document.createElement('script');
    mfScript.type = "text/javascript";
    mfScript.defer = true;
    mfScript.innerHTML = `
      window._mfq = window._mfq || [];
      (function() {
        var mf = document.createElement("script");
        mf.type = "text/javascript"; mf.defer = true;
        mf.src = "//cdn.mouseflow.com/projects/093468ee-8454-4313-9398-5880a29cef27.js";
        document.getElementsByTagName("head")[0].appendChild(mf);
      })();
    `;
    document.head.appendChild(mfScript);

    return () => {
      try {
        if (mfScript.parentNode) {
          mfScript.parentNode.removeChild(mfScript);
        }
      } catch (e) {
        console.error('Error removing Mouseflow script:', e);
      }
    };
  }, []);

  return null;
};

// Google Analytics tracking component
const GoogleAnalyticsTracking = () => {
  useEffect(() => {
    // Load the external Google Analytics script
    const gaExternalScript = document.createElement('script');
    gaExternalScript.async = true;
    gaExternalScript.src = "https://www.googletagmanager.com/gtag/js?id=G-93XXNXW8B7";
    document.head.appendChild(gaExternalScript);
    
    // Add the GA initialization code
    const gaInitScript = document.createElement('script');
    gaInitScript.innerHTML = `
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', 'G-93XXNXW8B7');
    `;
    document.head.appendChild(gaInitScript);

    return () => {
      try {
        if (gaExternalScript.parentNode) {
          gaExternalScript.parentNode.removeChild(gaExternalScript);
        }
        if (gaInitScript.parentNode) {
          gaInitScript.parentNode.removeChild(gaInitScript);
        }
      } catch (e) {
        console.error('Error removing Google Analytics scripts:', e);
      }
    };
  }, []);

  return null;
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <HotjarTracking />
      <MouseflowTracking />
      <GoogleAnalyticsTracking />
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
