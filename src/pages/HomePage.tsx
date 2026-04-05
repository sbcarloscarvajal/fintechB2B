import { Link } from "react-router-dom";
import { Building2, Users, Briefcase, Sparkles } from "lucide-react";

export function HomePage() {
  const roles = [
    {
      to: "/proveedor",
      icon: Building2,
      title: "Proveedor",
      subtitle: "Pymes y Emprendedores",
      desc: "Oferta tus facturas de manera sencilla y obtén liquidez inmediata.",
    },
    {
      to: "/wizard",
      icon: Sparkles,
      title: "Wizard (Ley de Miller)",
      subtitle: "Proveedor — pasos guiados",
      desc: "Oferta segmentada en 3 pasos con barra de progreso, como define la actividad sumativa.",
    },
    {
      to: "/factor",
      icon: Users,
      title: "Factor",
      subtitle: "Entidades Financieras",
      desc: "Gestiona facturas, evalúa riesgos y ejecuta desembolsos con precisión.",
    },
    {
      to: "/pagador",
      icon: Briefcase,
      title: "Pagador",
      subtitle: "Empresas receptoras",
      desc: "Confirma cesiones y gestiona tus pagos al factor de forma directa.",
    },
  ];

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="max-w-5xl w-full">
        <div className="text-center mb-12">
          <div className="inline-flex size-16 rounded-2xl items-center justify-center mb-4 bg-fintech-institutional">
            <Building2 className="size-8 text-primary-foreground" />
          </div>
          <h1 className="text-3xl md:text-4xl mb-3 text-fintech-institutional font-medium">
            Fintech B2B Platform
          </h1>
          <p className="text-muted-foreground max-w-lg mx-auto">
            Plataforma de gestión de facturas electrónicas con integración DIAN.
            Selecciona tu perfil para continuar.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {roles.map((role) => (
            <Link
              key={role.to}
              to={role.to}
              className="bg-card rounded-xl p-6 border-2 border-border hover:border-fintech-institutional transition-all group hover:shadow-lg"
            >
              <div className="size-14 rounded-xl bg-fintech-institutional flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <role.icon className="size-7 text-primary-foreground" />
              </div>
              <h2 className="text-xl mb-1">{role.title}</h2>
              <p className="text-sm text-fintech-institutional mb-2">{role.subtitle}</p>
              <p className="text-sm text-muted-foreground">{role.desc}</p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
