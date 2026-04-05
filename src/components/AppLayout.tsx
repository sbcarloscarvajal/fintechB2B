import { Outlet, Link, useLocation } from "react-router-dom";
import { Building2, Users, Home, Brain, Maximize2 } from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  { path: "/", label: "Inicio", icon: Home, exact: true },
  { path: "/proveedor", label: "Proveedor", icon: Building2 },
  { path: "/factor", label: "Factor", icon: Users },
  { path: "/wizard", label: "Wizard", icon: Brain },
  { path: "/mobile-cesion", label: "Mobile", icon: Maximize2 },
];

export function AppLayout() {
  const location = useLocation();

  const isActive = (path: string, exact?: boolean) => {
    return exact ? location.pathname === path : location.pathname.startsWith(path);
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <header className="border-b border-border bg-card">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-2">
              <div className="size-10 rounded-lg flex items-center justify-center bg-fintech-institutional">
                <Building2 className="size-6 text-primary-foreground" />
              </div>
              <h1 className="text-lg text-fintech-institutional">Fintech B2B Platform</h1>
            </div>

            <nav className="flex gap-1 overflow-x-auto">
              {navItems.map(({ path, label, icon: Icon, exact }) => (
                <Link
                  key={path}
                  to={path}
                  className={cn(
                    "flex items-center gap-2 px-4 py-2 rounded-md transition-colors whitespace-nowrap",
                    isActive(path, exact)
                      ? "bg-fintech-institutional text-primary-foreground"
                      : "text-foreground hover:bg-accent"
                  )}
                >
                  <Icon className="size-4" />
                  <span>{label}</span>
                </Link>
              ))}
            </nav>
          </div>
        </div>
      </header>

      <main className="flex-1">
        <Outlet />
      </main>
    </div>
  );
}
