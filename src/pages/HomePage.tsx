import { Link } from "react-router-dom";
import { Building2, Users, Palette, Layout, CheckCircle2, Brain, Gauge, Maximize2 } from "lucide-react";

export function HomePage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        {/* Hero */}
        <div className="text-center mb-16">
          <div className="inline-flex size-20 rounded-2xl items-center justify-center mb-6 bg-fintech-institutional">
            <Palette className="size-10 text-primary-foreground" />
          </div>
          <h1 className="text-4xl mb-4 text-fintech-institutional">Sistema de Estilos Fintech B2B</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Plataforma de gestión de facturas con integración DIAN. Sistema de diseño basado en tokens,
            jerarquía visual adaptada y feedback claro.
          </p>
        </div>

        {/* Design Tokens */}
        <div className="mb-12 bg-card rounded-xl p-8 border border-border">
          <h2 className="text-2xl mb-6 flex items-center gap-2">
            <Palette className="size-6 text-fintech-institutional" />
            Tokens de Diseño
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg mb-4">Colores</h3>
              <div className="space-y-3">
                {[
                  { name: "Azul Institucional", code: "#0D47A1", cls: "bg-fintech-institutional" },
                  { name: "Aceptado DIAN", code: "#1B5E20", cls: "bg-fintech-dian-accepted" },
                  { name: "Pendiente", code: "#F57F17", cls: "bg-fintech-dian-pending" },
                  { name: "Rechazado", code: "#B71C1C", cls: "bg-fintech-dian-rejected" },
                ].map((c) => (
                  <div key={c.code} className="flex items-center gap-3">
                    <div className={`size-12 rounded-lg ${c.cls}`} />
                    <div>
                      <p className="text-sm">{c.name}</p>
                      <p className="text-xs text-muted-foreground">{c.code}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h3 className="text-lg mb-4">Espaciado (Módulo base: 8px)</h3>
              <div className="space-y-2">
                {["1x = 8px", "2x = 16px (Padding botón)", "3x = 24px (Título)", "4x = 32px"].map((label, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className="h-4 rounded bg-fintech-institutional" style={{ width: `${(i + 1) * 8}px` }} />
                    <span className="text-sm">{label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Features */}
        <div className="mb-12">
          <h2 className="text-2xl mb-6 flex items-center gap-2">
            <CheckCircle2 className="size-6 text-fintech-institutional" />
            Características del Sistema
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { icon: Palette, title: "Tokens Estandarizados", desc: "Variables CSS que garantizan coherencia visual en toda la plataforma" },
              { icon: Layout, title: "Jerarquía Visual", desc: "Interfaces adaptadas a las necesidades de cada perfil de usuario" },
              { icon: CheckCircle2, title: "Feedback Visual", desc: "Estados claros con color e iconografía para prevenir errores" },
            ].map((f) => (
              <div key={f.title} className="bg-card rounded-xl p-6 border border-border">
                <div className="size-12 rounded-lg bg-fintech-institutional flex items-center justify-center mb-4">
                  <f.icon className="size-6 text-primary-foreground" />
                </div>
                <h3 className="text-lg mb-2">{f.title}</h3>
                <p className="text-sm text-muted-foreground">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* UX Laws */}
        <div className="mb-12">
          <h2 className="text-2xl mb-6 flex items-center gap-2">
            <Brain className="size-6 text-fintech-institutional" />
            Leyes de UX Aplicadas
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { to: "/wizard", icon: Brain, bg: "bg-fintech-dian-pending", title: "Ley de Miller", desc: "Wizard multi-paso que divide formularios complejos en chunks manejables (7±2 items)" },
              { to: "/proveedor", icon: Gauge, bg: "bg-fintech-dian-accepted", title: "Ley de Hick", desc: "Reducción de opciones y diseño progresivo para disminuir tiempo de decisión" },
              { to: "/mobile-cesion", icon: Maximize2, bg: "bg-fintech-institutional", title: "Ley de Fitts", desc: "CTA de 44x44px mínimo en zona inferior para fácil acceso táctil móvil" },
            ].map((item) => (
              <Link
                key={item.to}
                to={item.to}
                className="bg-card rounded-xl p-6 border-2 border-border hover:border-fintech-institutional transition-all group"
              >
                <div className={`size-12 rounded-lg ${item.bg} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                  <item.icon className="size-6 text-primary-foreground" />
                </div>
                <h3 className="text-lg mb-2">{item.title}</h3>
                <p className="text-sm text-muted-foreground mb-3">{item.desc}</p>
                <span className="text-sm text-fintech-institutional">Ver demostración →</span>
              </Link>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="grid md:grid-cols-2 gap-6">
          {[
            { to: "/proveedor", icon: Building2, title: "Vista Proveedor", desc: "Flujo sencillo y lineal con fuerte protagonismo visual del CTA principal para facilitar la oferta de facturas." },
            { to: "/factor", icon: Users, title: "Vista Factor", desc: "Uso eficiente del espacio para mostrar tablas densas con montos, fechas y niveles de riesgo sin saturar la pantalla." },
          ].map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className="bg-card rounded-xl p-8 border-2 border-border hover:border-fintech-institutional transition-all group"
            >
              <div className="flex items-start gap-4">
                <div className="size-16 rounded-xl bg-fintech-institutional flex items-center justify-center group-hover:scale-110 transition-transform">
                  <item.icon className="size-8 text-primary-foreground" />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl mb-2">{item.title}</h3>
                  <p className="text-sm text-muted-foreground mb-4">{item.desc}</p>
                  <span className="text-sm text-fintech-institutional">Ver ejemplo →</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
