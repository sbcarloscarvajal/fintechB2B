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
**[ACCIÓN]** Pasar el cursor por las tarjetas de perfiles, una por una.

> "Hola. Este es un prototipo de **plataforma fintech B2B** para **facturación electrónica con integración DIAN**, el sistema tributario colombiano.
>
> El caso de uso es **factoring**: un proveedor emite una factura, un factor la compra para darle liquidez inmediata, y el pagador confirma la cesión.
>
> Por eso la app tiene **cuatro vistas**: **Proveedor**, **Wizard** (la misma operación guiada en pasos), **Factor** y **Pagador**.
>
> El foco del video no es la UI, sino la **arquitectura de estado**: el proyecto implementa el **patrón Flux** de Facebook, con flujo unidireccional. Vamos a ver cómo está estructurado y cómo se aplica en cada pantalla."

---

## 🎬 BLOQUE 2 — Patrón Flux (0:30 – 1:30)

**[PANTALLA]** Navegador, página de inicio.
**[ACCIÓN]** Señala una tarjeta al decir "vista".

> "Flux es un patrón de arquitectura para gestionar el estado de la aplicación. Lo componen **cuatro piezas** con responsabilidades bien definidas:
>
> **1. Vista:** los componentes React. Renderizan el estado y capturan la interacción del usuario. No mutan datos, solo disparan acciones.
>
> **2. Acción:** un objeto plano `{ type, payload }` que describe **qué pasó**. El `type` es una constante; el `payload` lleva los datos. Las crea un *action creator*.
>
> **3. Dispatcher:** un singleton que recibe las acciones y las **reparte a todos los stores** registrados. Es el único punto de entrada al estado.
>
> **4. Store:** mantiene el estado y la lógica de negocio. Recibe la acción, calcula el nuevo estado de forma **inmutable** y notifica a las vistas suscritas para que se re-rendericen."

**[ACCIÓN]** Mueve la mano describiendo un círculo al explicar el flujo.

> "El ciclo es **unidireccional**: vista → acción → dispatcher → store → vista. Los datos siempre viajan en la misma dirección, nunca al revés.
>
> Esto nos da tres ventajas concretas: el estado vive en **un único lugar**, cada cambio queda **trazado** como una acción, y la lógica de negocio queda **fuera de los componentes**."

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

## 🎬 BLOQUE 4 — Demo por pantallas (2:45 – 5:30)

### 4.1 Proveedor (2:45 – 3:15)

**[ACCIÓN]** Navegador → `/proveedor`.

> "Vista del **Proveedor**. Aquí se oferta una factura electrónica. El checkbox de acuse dispara `PROVIDER_TOGGLE_SIGNED` y el botón principal dispara `PROVIDER_SUBMIT_PENDING`. La validación previa también es una acción: `PROVIDER_VALIDATION_FAILED`."

**[ACCIÓN]** Marcar el checkbox y pulsar "Ofertar Factura".

> "La llamada a la API mock se hace con `useMutation` de TanStack Query. En `onMutate`, `onSuccess` y `onError` se despachan acciones que mueven el store entre loading, submitted o error."

### 4.2 Wizard (3:15 – 3:50)

**[ACCIÓN]** Navegador → `/wizard`.

> "Misma operación segmentada en **tres pasos**: revisar, configurar y confirmar. Cada paso es una transición en el store: `WIZARD_NEXT_STEP`, `WIZARD_PREV_STEP`, `WIZARD_UPDATE_FIELD`."

**[ACCIÓN]** Avanzar uno o dos pasos.

> "El estado del wizard (paso actual, datos del formulario, factura seleccionada) vive en el store, no en el componente."

### 4.3 Factor (3:50 – 4:35)

**[ACCIÓN]** Navegador → `/factor`.

> "Vista del **Factor**: bandeja de facturas disponibles para compra. El buscador dispara `SET_INVOICE_SEARCH`; el store recalcula `filteredInvoices` y la lista se re-renderiza. La vista no filtra, solo consume estado derivado."

**[ACCIÓN]** Escribir en el buscador, abrir una factura, pulsar "Aceptar operación".

> "Aceptar dispara `ASSIGNMENT_SUBMIT_PENDING`. El store gestiona el ciclo de la cesión: pendiente, aceptada, confirmada."

### 4.4 Pagador (4:35 – 5:10)

**[ACCIÓN]** Navegador → `/pagador`.

> "Vista del **Pagador**: confirma la cesión hacia el factor. Las acciones `PAYER_ACCEPT_ASSIGNMENT` y `PAYER_REJECT_ASSIGNMENT` cierran el ciclo del documento."

**[ACCIÓN]** Aceptar o rechazar una cesión.

> "Las tres vistas comparten el **mismo store**. Cualquier cambio se refleja en todas porque la fuente de verdad es única."

---

## 🎬 BLOQUE 5 — Cierre (5:10 – 5:30)

**[ACCIÓN]** Volver a la home.

> "Para añadir una funcionalidad nueva el flujo es siempre el mismo: constante en `actionTypes`, caso en `handleAction`, creator en `actions.ts`, consumir en la vista.
>
> Flux nos da **predecibilidad, responsabilidades separadas y un estado fácil de trazar**. Gracias."

**[ACCIÓN]** Detener grabación.

---

## 📐 Resumen de tiempos

| Tiempo | Bloque | Pantalla |
|--------|--------|----------|
| 0:00 – 0:30 | Presentación | Navegador `/` |
| 0:30 – 1:30 | Patrón Flux | Navegador `/` |
| 1:30 – 2:45 | Código | VS Code: `src/flux/` |
| 2:45 – 3:15 | Demo Proveedor | Navegador `/proveedor` |
| 3:15 – 3:50 | Demo Wizard | Navegador `/wizard` |
| 3:50 – 4:35 | Demo Factor | Navegador `/factor` |
| 4:35 – 5:10 | Demo Pagador | Navegador `/pagador` |
| 5:10 – 5:30 | Cierre | Navegador `/` |

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
