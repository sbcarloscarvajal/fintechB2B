# 🎬 Guion Video Explicativo (5 minutos)
### Prototipo Fintech B2B — Patrón Flux

> **Audiencia:** perfil técnico (devs / estudiantes de informática). Lenguaje técnico básico, directo, sin metáforas innecesarias.
> **Cómo usarlo:** lee los bloques en gris como apoyo, no literal. Los **[ACCIÓN]** indican qué mostrar en pantalla.

---

## ⏱️ Antes de grabar (1 minuto)

- [ ] `npm run dev` y abrir `http://localhost:8080`.
- [ ] VS Code abierto con `src/flux/` visible.
- [ ] Silenciar notificaciones.
- [ ] Probar micrófono.

---

## 🎬 BLOQUE 1 — Presentación (0:00 – 0:30)

**[PANTALLA]** Navegador en `http://localhost:8080/`.
**[ACCIÓN]** Pasar el cursor por las tarjetas de perfiles.

> "Este es un prototipo de **plataforma fintech B2B** para facturación electrónica con integración DIAN. Tiene tres perfiles: **Proveedor**, **Factor** y **Pagador**.
>
> El foco del video no es la UI, sino la **arquitectura de estado**: el proyecto implementa el **patrón Flux** de Facebook, con flujo unidireccional."

---

## 🎬 BLOQUE 2 — Patrón Flux (0:30 – 1:30)

**[PANTALLA]** Sigue en el navegador, página de inicio.
**[ACCIÓN]** Mientras hablas, señala las tarjetas al mencionar "vista".

> "Flux propone **flujo unidireccional de datos**: la vista dispara una **acción**, el **dispatcher** la entrega al **store**, el store actualiza su estado y la vista se re-renderiza.
>
> La diferencia frente al two-way binding o a mutar estado desde cualquier componente es que **el store es la única fuente de verdad** y los cambios pasan siempre por el mismo punto. Esto hace el flujo **predecible y trazable**, algo crítico cuando la app crece."

---

## 🎬 BLOQUE 3 — Estructura del código (1:30 – 2:45)

**[ACCIÓN]** Cambiar a VS Code, abrir `src/flux/`.

> "Toda la capa Flux vive en `src/flux/`, separada por responsabilidad."

**[ACCIÓN]** Abrir `actionTypes.ts` y `actions.ts`.

> "`actionTypes.ts` define las constantes de tipo. `actions.ts` expone los **action creators**: funciones que construyen el objeto `{ type, payload }` y lo envían al dispatcher. La vista solo invoca estos creators, nunca toca el estado directamente."

**[ACCIÓN]** Abrir `dispatcher.ts`.

> "El **dispatcher** es un singleton minimalista: registra callbacks y reenvía cada acción a todos los suscriptores. Garantiza un único punto de entrada."

**[ACCIÓN]** Abrir `invoiceStore.ts`, scroll por `handleAction`.

> "El **store** mantiene el estado y reduce las acciones a un nuevo estado de forma inmutable. Aquí viven las reglas de negocio: filtrado de facturas, transiciones del wizard, ciclo de la cesión, etc."

**[ACCIÓN]** Abrir `useStore.ts`.

> "`useStore.ts` conecta el store con React vía `useSyncExternalStore`, compatible con React 18 y concurrent rendering."

---

## 🎬 BLOQUE 4 — Demo (2:45 – 4:15)

**[ACCIÓN]** Navegador → `/factor`.

> "Esta es la vista del Factor. Al escribir en el buscador se dispara la acción `SET_INVOICE_SEARCH`; el store recalcula `filteredInvoices` y la lista se re-renderiza. La vista no filtra: solo consume estado derivado."

**[ACCIÓN]** Escribir en el buscador, abrir una factura, "Aceptar operación".

> "Aceptar la operación dispara `ASSIGNMENT_SUBMIT_PENDING`. Las llamadas asíncronas se gestionan con **TanStack Query** (`useMutation`); en `onMutate` y `onSuccess` se despachan acciones Flux que actualizan el store. Así combinamos cache de servidor con estado de UI."

**[ACCIÓN]** Ir a `/proveedor`, marcar firma, ofertar.

> "Mismo patrón en Proveedor: cada interacción es una acción tipada. Si tuviéramos que añadir una nueva funcionalidad, el flujo es siempre: nueva constante en `actionTypes`, manejarla en `handleAction`, exponer creator en `actions.ts`, consumir en la vista."

---

## 🎬 BLOQUE 5 — Cierre (4:15 – 5:00)

**[ACCIÓN]** Volver a la home o a VS Code.

> "Resumen de por qué Flux en este proyecto:
>
> **Predecibilidad**: un solo camino de mutación, fácil de depurar.
>
> **Separación de responsabilidades**: vista renderiza, acciones describen intención, store concentra lógica.
>
> **Escalabilidad**: agregar features se reduce a añadir acciones y casos en el reducer, sin tocar lo existente.
>
> Gracias."

**[ACCIÓN]** Detener grabación.

---

## 📐 Resumen de tiempos

| Tiempo | Bloque | Pantalla |
|--------|--------|----------|
| 0:00 – 0:30 | Presentación | Navegador `/` |
| 0:30 – 1:30 | Patrón Flux | Navegador `/` |
| 1:30 – 2:45 | Código | VS Code: `src/flux/` |
| 2:45 – 4:15 | Demo | Navegador `/factor` y `/proveedor` |
| 4:15 – 5:00 | Cierre | Navegador o VS Code |

---

## 🎙️ Tips de grabación

- Habla a ritmo natural, sin acelerar.
- Pausa medio segundo entre bloques (facilita edición).
- No leas literal — usa el guion como apoyo.
- Resolución: **1280×720** o **1920×1080** a 30 fps.

---

## 🛠️ Atajos útiles

```bash
npm run dev
```

> Grabación: **OBS Studio**, **Win + G** (Game Bar) o **QuickTime** (macOS).
