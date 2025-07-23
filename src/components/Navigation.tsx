import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight, Home } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";

const navigationOrder = [
  { path: "/", label: "Início" },
  { path: "/arena", label: "Arena" },
  { path: "/marketplace", label: "Marketplace" },
  { path: "/achievements", label: "Conquistas" }
];

export function Navigation() {
  const navigate = useNavigate();
  const location = useLocation();
  
  const currentIndex = navigationOrder.findIndex(nav => nav.path === location.pathname);
  const previousPage = currentIndex > 0 ? navigationOrder[currentIndex - 1] : null;
  const nextPage = currentIndex < navigationOrder.length - 1 ? navigationOrder[currentIndex + 1] : null;

  return (
    <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 z-50">
      <div className="flex items-center gap-2 bg-card/90 backdrop-blur-xl rounded-full border border-primary/30 shadow-mystical p-2">
        {previousPage && (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate(previousPage.path)}
            className="rounded-full"
          >
            <ArrowLeft className="w-4 h-4 mr-1" />
            <span className="hidden sm:inline">{previousPage.label}</span>
          </Button>
        )}
        
        <Button
          variant="outline"
          size="sm"
          onClick={() => navigate("/")}
          className="rounded-full"
        >
          <Home className="w-4 h-4" />
        </Button>
        
        {nextPage && (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate(nextPage.path)}
            className="rounded-full"
          >
            <span className="hidden sm:inline">{nextPage.label}</span>
            <ArrowRight className="w-4 h-4 ml-1" />
          </Button>
        )}
      </div>
    </div>
  );
}