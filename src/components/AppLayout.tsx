import { Outlet, Link, useLocation } from "react-router-dom";
import { Building2, Users, Briefcase, Home, FileText, Brain } from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  { path: "/", label: "Inicio", icon: Home, exact: true },
  { path: "/proveedor", label: "Proveedor", icon: Building2 },
  { path: "/wizard", label: "Wizard", icon: Brain },
  { path: "/factor", label: "Factor", icon: Users },
  { path: "/pagador", label: "Pagador", icon: Briefcase },
];

export function AppLayout() {
  const location = useLocation();

  const isActive = (path: string, exact?: boolean) => {
    return exact ? location.pathname === path : location.pathname.startsWith(path);
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      {/* Top header */}
      <header className="border-b border-border bg-card">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-14 md:h-16">
            <Link to="/" className="flex items-center gap-2">
              <div className="size-8 md:size-10 rounded-lg flex items-center justify-center bg-fintech-institutional">
                <FileText className="size-4 md:size-6 text-primary-foreground" />
              </div>
              <span className="text-sm md:text-lg font-medium text-fintech-institutional hidden sm:block">Fintech B2B</span>
            </Link>

            {/* Desktop nav */}
            <nav className="hidden md:flex gap-1">
              {navItems.map(({ path, label, icon: Icon, exact }) => (
                <Link
                  key={path}
                  to={path}
                  className={cn(
                    "flex items-center gap-2 px-4 py-2 rounded-md transition-colors text-sm",
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

      {/* Main content */}
      <main className="flex-1 pb-20 md:pb-0">
        <Outlet />
      </main>

      {/* Mobile bottom nav */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-card border-t border-border z-40">
        <div className="flex justify-around items-center h-16">
          {navItems.map(({ path, label, icon: Icon, exact }) => (
            <Link
              key={path}
              to={path}
              className={cn(
                "flex flex-col items-center gap-1 px-3 py-2 rounded-md transition-colors min-w-[56px]",
                isActive(path, exact)
                  ? "text-fintech-institutional"
                  : "text-muted-foreground"
              )}
            >
              <Icon className="size-5" />
              <span className="text-[10px]">{label}</span>
            </Link>
          ))}
        </div>
      </nav>
    </div>
  );
}
