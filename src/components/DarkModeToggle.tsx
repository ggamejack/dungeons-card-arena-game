import React, { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";

export function DarkModeToggle() {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const root = window.document.documentElement;
    const isDarkMode = root.classList.contains("dark");
    setIsDark(isDarkMode);
  }, []);

  const toggleDarkMode = () => {
    const root = window.document.documentElement;
    const newDarkMode = !isDark;
    
    if (newDarkMode) {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
    
    setIsDark(newDarkMode);
  };

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={toggleDarkMode}
      className="fixed top-4 right-4 z-50 hover:animate-magical-float"
    >
      {isDark ? (
        <Sun className="h-5 w-5 text-holy animate-glow" />
      ) : (
        <Moon className="h-5 w-5 text-primary animate-glow" />
      )}
    </Button>
  );
}