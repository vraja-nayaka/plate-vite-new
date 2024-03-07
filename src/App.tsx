import "./App.css";
import IndexPage from "./pages/page";
import { cn } from '@udecode/cn';

// import { fontSans } from '@/lib/fonts';
import { TooltipProvider } from '@/components/plate-ui/tooltip';
// import { SiteHeader } from '@/components/site/site-header';
import { TailwindIndicator } from '@/components/site/tailwind-indicator';
// import { ThemeProvider } from '@/components/site/theme-provider';

import '@/styles/globals.css';


function App() {
  return (
    <div className={cn(
      'min-h-screen bg-background font-sans antialiased',
      '[&_.slate-selected]:!bg-primary/20 [&_.slate-selection-area]:border [&_.slate-selection-area]:border-primary [&_.slate-selection-area]:bg-primary/10',
    )}>
      {/* <SimplePage /> */}
      {/* <ThemeProvider attribute="class" defaultTheme="light"> */}
            <TooltipProvider
              disableHoverableContent
              delayDuration={500}
              skipDelayDuration={0}
            >
              <div className="relative flex min-h-screen flex-col">
                {/* <SiteHeader /> */}
                <div className="flex-1"><IndexPage /></div>
              </div>
              <TailwindIndicator />
            </TooltipProvider>
          {/* </ThemeProvider> */}
   
    </div>
  );
}

export default App;
