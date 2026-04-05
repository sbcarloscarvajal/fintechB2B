# Fintech B2B — Prototipo front-end (React)

SPA de demostración para **factoring B2B** con perfiles **Proveedor**, **Factor** y **Pagador**, integración **DIAN simulada**, enfoque **mobile-first** y arquitectura alineada a la actividad *Diseño arquitectónico base del front-end con enfoque UX/UI*.

## Stack

- **React 18** + **TypeScript**
- **Vite 5** (build y dev server)
- **React Router** (rutas por rol)
- **Tailwind CSS** (tokens y layout)
- **Patrón Flux** (`dispatcher` → `invoiceStore` → hooks `useSyncExternalStore`)
- **TanStack Query** (`useMutation` para operaciones asíncronas simuladas)
- **Sonner** (toasts), **Radix Tooltip**

## Requisitos

- **Node.js 18+** (recomendado LTS)
- **npm** (incluido con Node)

## Inicio rápido

```bash
npm install
npm run dev
```

La app suele abrirse en **http://localhost:8080** (puerto definido en `vite.config.ts`).

### Windows y PowerShell

Si aparece un error de **ejecución de scripts** al usar `npm`, ejecuta los comandos con **`npm.cmd`** o usa **Símbolo del sistema (cmd)**:

```bat
npm.cmd install
npm.cmd run dev
```

Opcional: `Set-ExecutionPolicy -Scope CurrentUser -ExecutionPolicy RemoteSigned` en PowerShell para permitir `npm.ps1`.

## Scripts

| Comando | Descripción |
|---------|-------------|
| `npm run dev` | Servidor de desarrollo con HMR |
| `npm run build` | Genera la carpeta `dist/` para producción |
| `npm run preview` | Sirve `dist/` en local (por defecto **http://localhost:4173**) |
| `npm run lint` | ESLint |
| `npm test` | Vitest |
| `npm run video:guion` | Muestra guion sugerido para video del prototipo (PowerShell) |

## Deploy

1. `npm run build`
2. Publicar el contenido de **`dist/`** en un hosting estático (Netlify, Vercel, GitHub Pages, nginx, etc.).
3. Configurar **fallback a `index.html`** para que todas las rutas de la SPA resuelvan bien.

La guía detallada, trazabilidad con la actividad sumativa y el modelo Flux + Query está en **[DEPLOY_Y_PROTO_FLUX.md](./DEPLOY_Y_PROTO_FLUX.md)**.

## Rutas principales

| Ruta | Perfil / función |
|------|------------------|
| `/` | Inicio y acceso por rol |
| `/proveedor` | Oferta rápida (Ley de Hick / Fitts) |
| `/wizard` | Asistente por pasos (Ley de Miller) |
| `/factor` | Dashboard, filtros y detalle |
| `/pagador` | Notificaciones de cesión y pago |

## Estructura relevante

```
src/
  api/mockDianApi.ts    # Simulación de latencia DIAN/backend
  flux/                 # Dispatcher, acciones, store, hooks
  pages/                # Vistas por ruta
  components/           # UI compartida (layout, wizard, feedback)
```

## Documentos de curso

En la raíz del repositorio pueden convivir los PDF de la asignatura (por ejemplo la actividad sumativa y la lectura U3); el código y **DEPLOY_Y_PROTO_FLUX.md** describen cómo se reflejan en la implementación.

## Licencia

Proyecto privado / académico — ajustar según corresponda.
