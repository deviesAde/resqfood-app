"use client";

import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

import { Button } from "@/components/ui/button";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <Button variant="ghost" size="sm" className="w-9 h-9 px-0">
        <Sun className="h-4 w-4" />
      </Button>
    );
  }

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={() => setTheme(theme === "light" ? "dark" : "light")}
      className="w-9 h-9 px-0 hover:bg-[#DE7C7D]/20 transition-all duration-300"
    >
      {theme === "light" ? (
        <Moon className="h-4 w-4 text-[#740938] hover:text-[#AF1740] transition-colors" />
      ) : (
        <Sun className="h-4 w-4 text-[#DE7C7D] hover:text-[#CC2B52] transition-colors" />
      )}
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}
