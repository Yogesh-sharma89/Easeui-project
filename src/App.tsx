
import { TooltipProvider } from "./components/Tooltip/Tooltip";
import AppRouter from "./router/AppRouter";

function App() {
  return (
    <div className="min-h-screen w-full">
      <TooltipProvider>
           <AppRouter />
      </TooltipProvider>
    
    </div>
  );
}

export default App;
