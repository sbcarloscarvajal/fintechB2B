# Prototipo Fintech B2B: despliegue, arquitectura Flux y guion de video

Este documento alinea el front con un **modelo Flux clásico** (Facebook): flujo unidireccional **Vista → Acciones → Dispatcher → Store → Vista**, más una capa **asíncrona con TanStack Query** tal como describe el diagrama de ciclo DIAN del documento *Actividad de entrega 1 – Diseño Arquitectónico Base del Front-End con Enfoque UX/UI* (PDF en la raíz del proyecto).

---

## 0. Trazabilidad con la Actividad Sumativa (UX/UI + arquitectura)

| Entrega del PDF | Implementación en el código |
|-----------------|----------------------------|
| SPA React, Mobile First | Vite + React Router; layout con navegación inferior en `md:hidden` (`AppLayout`). |
| Tres perfiles: Proveedor, Factor, Pagador | Rutas `/proveedor`, `/factor`, `/pagador` + `/wizard` como variante proveedor (Ley de Miller). |
| Sistema de estilos con tokens CSS | Variables en `src/index.css`; clases utilitarias Tailwind (`fintech-*`, estados DIAN). |
| Ley de Hick — CTA “OFERTAR FACTURA”, opciones secundarias progresivas | `ProviderView`: CTA principal + “Opciones adicionales” desplegable. |
| Ley de Fitts — ≥44px, CTA accesible al pulgar | Botones `min-h-[44px]` / `min-h-[48px]`; en móvil CTA principal **fijo en la parte inferior** (`ProviderView`). |
| Ley de Miller — wizard 3 pasos, barra % | `InvoiceWizard` + `WizardView`; progreso y pasos numerados. |
| Dashboard factor: resumen arriba, filtros, navegación inferior | Tarjetas de métricas, filtros de riesgo, búsqueda Flux, tabla; `AppLayout` bottom nav. |
| Errores funcionales arriba; loading en CTA; confirmaciones con color | `DianFeedback` + `role="status"` / `aria-live`; Sonner `top-center` y `richColors`; spinners en mutaciones. |
| TanStack Query para asíncrono DIAN | `useMutation` + `src/api/mockDianApi.ts`; `onMutate`/`onSuccess` disparan acciones Flux que actualizan `invoiceStore`. |

---

## 1. Responsabilidades por capas y componentes

| Capa | Ubicación | Responsabilidad |
|------|-----------|-----------------|
| **Vista (UI)** | `src/pages/*`, `src/components/*` | Renderizar con hooks Flux; en operaciones DIAN simuladas usar **`useMutation`** (TanStack Query). En `onMutate`/`onSuccess`/`onError` llamar a los *action creators* para actualizar el store. No mutar el store directamente. |
| **API simulada** | `src/api/mockDianApi.ts` | Promesas con latencia; sustituible por fetch real. |
| **Query client** | `App.tsx` (`QueryClientProvider`) | Configuración global de mutaciones/consultas. |
| **Acciones** | `src/flux/actions.ts` | Funciones que describen la intención del usuario: construyen objetos `{ type, payload }` y los envían al dispatcher. Punto único de “escritura” desde la UI. |
| **Dispatcher** | `src/flux/dispatcher.ts` | Recibe cada acción y la entrega a todos los callbacks registrados (aquí un único store). Garantiza orden y un solo camino de entrada. |
| **Store** | `src/flux/invoiceStore.ts` | Estado global y reglas de negocio del prototipo: reduce acciones a nuevo estado (inmutable por copia), recalcula derivados (lista filtrada, factura seleccionada) y notifica oyentes. |
| **Adaptación React** | `src/flux/useStore.ts` | Puente Flux–React: `useSyncExternalStore` se suscribe a `addListener`/`emitChange` del store para re-renderizar de forma compatible con React 18. |
| **Enrutado y layout** | `src/App.tsx`, `src/components/AppLayout.tsx` | Composición de rutas y navegación; no contienen lógica de dominio del factoring. |
| **Utilidades** | `src/lib/formatters.ts`, `src/lib/utils.ts` | Formato de moneda/fechas y `cn()` para clases; sin estado de negocio. |

**Barrel opcional:** `src/flux/index.ts` reexporta dispatcher, tipos, acciones, store y hooks para importaciones ordenadas.

---

## 2. Modelo de estado coherente con Flux

Un único **store** (`invoiceStore`) concentra varios **rebanadas (slices) lógicos**, todas actualizadas en el mismo `handleAction`:

- **`InvoiceStoreState`**: catálogo `invoices` (mock), `selectedInvoiceId`, `filter` por riesgo, `searchQuery`, `filteredInvoices` y `selectedInvoice` (derivado).
- **`ProviderStoreState`**: oferta simple en `/proveedor` (firma, envío simulado, errores).
- **`WizardStoreState`**: pasos del wizard, factura elegida, descuento, términos, completado.
- **`AssignmentStoreState`**: simulación de aceptación de operación por el factor en el detalle de factura.
- **`PayerStoreState`**: notificaciones de cesión y transiciones `pending_ack` → `acknowledged` → `paid`.

Las **acciones** están tipadas por constantes en `actionTypes.ts`. Cualquier nueva funcionalidad debe: añadir constante → manejar en `handleAction` → exponer creator en `actions.ts` → usar hook en la vista.

---

## 3. Cómo hacer deploy

### Requisitos

- Node.js 18+ (recomendado LTS).
- `npm install` en la raíz del proyecto.

### Build de producción

```bash
npm run build
```

Salida en `dist/`: HTML, JS y CSS estáticos. Sirva esa carpeta con cualquier hosting estático.

### Previsualización local del build

```bash
npm run preview
```

### Opciones de hosting

1. **Vercel / Netlify**  
   - Framework preset: Vite.  
   - Comando build: `npm run build`.  
   - Directorio de publicación: `dist`.  
   - SPA: redirigir todas las rutas a `index.html` (en Netlify: archivo `_redirects` con `/* /index.html 200`; en Vercel suele configurarse automáticamente para Vite).

2. **GitHub Pages** (subcarpeta o dominio de proyecto)  
   - En `vite.config.ts`, establecer `base: '/nombre-del-repo/'` si la app no está en la raíz del dominio.  
   - Build y subir contenido de `dist` a la rama `gh-pages` o usar una acción de GitHub Actions.

3. **Servidor propio (nginx)**  
   - `root` apuntando a `dist`.  
   - Regla `try_files $uri $uri/ /index.html;` para que React Router resuelva rutas del cliente.

### Variables de entorno

Este prototipo no usa API real; no se requieren `.env` para funcionar.

---

## 4. Video de 5 minutos (guion y script)

- **Guion detallado y tiempos**: ejecute en la raíz del proyecto:

  ```bash
  npm run video:guion
  ```

  Equivale a `powershell -ExecutionPolicy Bypass -File scripts/grabar-video-prototipo.ps1`.

- **Opciones del script PowerShell** (desde `scripts/` o indicando ruta completa):
  - `.\grabar-video-prototipo.ps1 -StartDevServer` — abre `npm run dev` minimizado.
  - `.\grabar-video-prototipo.ps1 -StartDevServer -RecordWithFfmpeg` — además intenta grabar 300 s con **ffmpeg** (pantalla completa en Windows). Requiere `ffmpeg` en PATH; para mayor control use **OBS Studio** o **Win+G** y siga el guion impreso.

En el video conviene mostrar el código: `actions.ts` → `dispatcher.ts` → `invoiceStore.ts` → `useStore.ts` y una pantalla (por ejemplo Factor) donde se vea la acción y el cambio de UI.

---

## 5. Comandos útiles

| Comando | Descripción |
|---------|-------------|
| `npm run dev` | Servidor de desarrollo (puerto 8080 por configuración de Vite). |
| `npm run build` | Compilación producción. |
| `npm run preview` | Servir `dist` localmente. |
| `npm run lint` | ESLint. |
| `npm test` | Vitest. |

---

## 6. Depuración y dependencias

- Componentes UI de shadcn no usados eliminados (se mantienen `tooltip` y `sonner`).
- **`@tanstack/react-query`** incluido de nuevo para cumplir el diagrama de gestión asíncrona de la actividad sumativa; las mutaciones se combinan con Flux.
- Eliminación de Playwright y `lovable-tagger` del flujo de build.
- Dependencias npm reducidas a las necesarias para el código actual.
- Búsqueda de facturas en Factor conectada a Flux (`SET_INVOICE_SEARCH`).
- Flujo de factor: `useMutation` + `AssignmentActions.submitPending` / `submitSuccess` en el modal de detalle.
- Wizard: oferta final vía `useMutation` y `onFinalizeOffer`; sin doble disparo de acciones.

Si incorpora nuevos PDFs o lineamientos de la asignatura, puede anexar aquí una tabla de trazabilidad requisito → ruta → acción Flux asociada.
