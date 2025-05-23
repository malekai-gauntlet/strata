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
import TexasSportsAcademy from "./pages/TexasSportsAcademy";
import Program from "./pages/Program";
import Training from "./pages/Training";
import SB2 from "./pages/SB2";
import { useEffect } from "react";

const queryClient = new QueryClient();

// Hotjar tracking component
const HotjarTracking = () => {
  useEffect(() => {
    // Load analytics during idle time or with a small delay to prioritize content rendering
    const loadHotjar = () => {
      // Hotjar Tracking Code
      const hotjarScript = document.createElement('script');
      hotjarScript.async = true; // Add async attribute
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
      
      return hotjarScript;
    };

    // Use requestIdleCallback if available, or setTimeout as fallback
    let hotjarScript;
    if (typeof window !== 'undefined') {
      if ('requestIdleCallback' in window) {
        const idleCallback = window.requestIdleCallback(() => {
          hotjarScript = loadHotjar();
        });
        
        return () => {
          window.cancelIdleCallback(idleCallback);
          try {
            if (hotjarScript && hotjarScript.parentNode) {
              hotjarScript.parentNode.removeChild(hotjarScript);
            }
          } catch (e) {
            console.error('Error removing script:', e);
          }
        };
      } else {
        // Fallback to setTimeout with a small delay
        const timeoutId = setTimeout(() => {
          hotjarScript = loadHotjar();
        }, 1000); // 1 second delay

        return () => {
          clearTimeout(timeoutId);
          try {
            if (hotjarScript && hotjarScript.parentNode) {
              hotjarScript.parentNode.removeChild(hotjarScript);
            }
          } catch (e) {
            console.error('Error removing script:', e);
          }
        };
      }
    }
  }, []);

  return null;
};

// Mouseflow tracking component
const MouseflowTracking = () => {
  useEffect(() => {
    // Load analytics during idle time or with a small delay to prioritize content rendering
    const loadMouseflow = () => {
      // Mouseflow Tracking Code
      const mfScript = document.createElement('script');
      mfScript.type = "text/javascript";
      mfScript.defer = true;
      mfScript.async = true; // Add async attribute
      mfScript.innerHTML = `
        window._mfq = window._mfq || [];
        (function() {
          var mf = document.createElement("script");
          mf.type = "text/javascript"; mf.defer = true; mf.async = true;
          mf.src = "//cdn.mouseflow.com/projects/093468ee-8454-4313-9398-5880a29cef27.js";
          document.getElementsByTagName("head")[0].appendChild(mf);
        })();
      `;
      document.getElementsByTagName("head")[0].appendChild(mfScript);
      
      return mfScript;
    };

    // Use requestIdleCallback if available, or setTimeout as fallback
    let mfScript;
    if (typeof window !== 'undefined') {
      if ('requestIdleCallback' in window) {
        const idleCallback = window.requestIdleCallback(() => {
          mfScript = loadMouseflow();
        });
        
        return () => {
          window.cancelIdleCallback(idleCallback);
          try {
            if (mfScript && mfScript.parentNode) {
              mfScript.parentNode.removeChild(mfScript);
            }
          } catch (e) {
            console.error('Error removing script:', e);
          }
        };
      } else {
        // Fallback to setTimeout with a small delay
        const timeoutId = setTimeout(() => {
          mfScript = loadMouseflow();
        }, 1500); // 1.5 second delay (slightly after Hotjar)

        return () => {
          clearTimeout(timeoutId);
          try {
            if (mfScript && mfScript.parentNode) {
              mfScript.parentNode.removeChild(mfScript);
            }
          } catch (e) {
            console.error('Error removing script:', e);
          }
        };
      }
    }
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
        console.error('Error removing Analytics scripts:', e);
      }
    };
  }, []);

  return null;
};

// Microsoft Clarity tracking component
const MicrosoftClarityTracking = () => {
  useEffect(() => {
    // Load analytics during idle time or with a small delay to prioritize content rendering
    const loadClarity = () => {
      const clarityScript = document.createElement('script');
      clarityScript.type = "text/javascript";
      clarityScript.async = true;
      clarityScript.innerHTML = `
        (function(c,l,a,r,i,t,y){
          c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
          t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
          y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
        })(window, document, "clarity", "script", "rkpg9p86ec");
      `;
      document.head.appendChild(clarityScript);
      
      return clarityScript;
    };

    // Use requestIdleCallback if available, or setTimeout as fallback
    let clarityScript;
    if (typeof window !== 'undefined') {
      if ('requestIdleCallback' in window) {
        const idleCallback = window.requestIdleCallback(() => {
          clarityScript = loadClarity();
        });
        
        return () => {
          window.cancelIdleCallback(idleCallback);
          try {
            if (clarityScript && clarityScript.parentNode) {
              clarityScript.parentNode.removeChild(clarityScript);
            }
          } catch (e) {
            console.error('Error removing Microsoft Clarity script:', e);
          }
        };
      } else {
        // Fallback to setTimeout with a small delay
        const timeoutId = setTimeout(() => {
          clarityScript = loadClarity();
        }, 2000); // 2 second delay (after Hotjar and Mouseflow)

        return () => {
          clearTimeout(timeoutId);
          try {
            if (clarityScript && clarityScript.parentNode) {
              clarityScript.parentNode.removeChild(clarityScript);
            }
          } catch (e) {
            console.error('Error removing Microsoft Clarity script:', e);
          }
        };
      }
    }
  }, []);

  return null;
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <HotjarTracking />
      <MouseflowTracking />
      <GoogleAnalyticsTracking />
      <MicrosoftClarityTracking />
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
          <Route path="/texassportsacademy" element={<TexasSportsAcademy />} />
          <Route path="/program" element={<Program />} />
          <Route path="/training" element={<Training />} />
          <Route path="/sb2" element={<SB2 />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
