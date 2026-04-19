# 🎬 Guion para Video Explicativo (5 minutos)
### Prototipo Fintech B2B — Patrón Flux, Responsabilidades y Gestión de Estado

> **Cómo usarlo:** lee en voz alta los bloques en gris (lo que dices). Los bloques **[ACCIÓN]** son lo que muestras en pantalla. Apunta a un ritmo natural: ~130 palabras/min.

---

## ⏱️ Antes de grabar (checklist 1 minuto)

- [ ] Ejecutar `npm run dev` y abrir `http://localhost:8080` en el navegador.
- [ ] Tener el editor de código (VS Code) abierto con estos archivos en pestañas:
  - `src/flux/dispatcher.ts`
  - `src/flux/actions.ts`
  - `src/flux/invoiceStore.ts`
  - `src/flux/useStore.ts`
  - `src/pages/FactorView.tsx`
- [ ] Cerrar notificaciones, silenciar el celular.
- [ ] Probar el micrófono (1 frase de prueba).
- [ ] Iniciar la grabación (OBS, Win+G o `npm run video:guion -- -RecordWithFfmpeg`).

---

## 🎬 BLOQUE 1 — Presentación (0:00 – 0:30)

**[PANTALLA]** Solo el **navegador** en `http://localhost:8080/` mostrando la página de inicio con las tarjetas de Proveedor, Wizard, Factor y Pagador. **NO abras VS Code todavía.**

**[ACCIÓN sugerida]** Mientras hablas, mueve suavemente el cursor por encima de las 4 tarjetas (sin hacer clic) para que el espectador vea los perfiles disponibles.

> "Hola. En este video voy a mostrar el prototipo **Fintech B2B** que desarrollé como una *Single Page Application* en **React con TypeScript**. Es una plataforma de **factoring electrónico** con tres perfiles: **Proveedor**, **Factor** y **Pagador**, e integración simulada con la **DIAN**.
>
> Lo más importante: toda la gestión de estado de la aplicación está construida con el **patrón Flux**. Eso es lo que voy a explicar."

> 💡 **Tip:** VS Code lo abres recién en el **Bloque 3** (minuto 1:30). Durante los Bloques 1 y 2 mantén siempre el navegador en pantalla.

---

## 🎬 BLOQUE 2 — ¿Qué es Flux? (0:30 – 1:30)

**[ACCIÓN]** Mostrar un diagrama mental o decirlo apuntando con el cursor a una zona vacía.

> "Flux es un patrón creado por Facebook que impone un **flujo de datos unidireccional**. Tiene cuatro piezas:
>
> **Uno — la Vista**: los componentes de React. Solo leen el estado y disparan acciones. **Nunca** modifican datos directamente.
>
> **Dos — las Acciones**: son objetos simples con un `type` y un `payload`. Describen qué quiere hacer el usuario.
>
> **Tres — el Dispatcher**: es el único punto por donde pasan todas las acciones. Las reparte a los stores registrados.
>
> **Cuatro — el Store**: guarda el estado y la lógica de negocio. Cuando recibe una acción, calcula el nuevo estado y avisa a las vistas para que se vuelvan a renderizar.
>
> Esto evita un problema típico de las apps grandes: que cualquier componente modifique el estado desde cualquier lado y nadie sepa de dónde vino el cambio."

---

## 🎬 BLOQUE 3 — Responsabilidades en el código (1:30 – 2:45)

**[ACCIÓN]** Abrir VS Code y mostrar la carpeta `src/flux/`.

> "Veamos cómo se traduce esto en el proyecto. Toda la arquitectura Flux vive en la carpeta `src/flux/`."

**[ACCIÓN]** Abrir `dispatcher.ts`.

> "Primero, el **Dispatcher**. Es muy pequeño: tiene un método `register` para que los stores se suscriban, y un método `dispatch` que entrega cada acción a todos los suscriptores. Es el cuello de botella controlado de toda la app."

**[ACCIÓN]** Abrir `actions.ts`.

> "Segundo, los **Action Creators**. Son funciones agrupadas por dominio: `ProviderActions`, `WizardActions`, `AssignmentActions`, `PayerActions`. Cada función construye un objeto `{ type, payload }` y lo envía al dispatcher. Esta es la **única** forma en que la UI puede pedir un cambio de estado."

**[ACCIÓN]** Abrir `invoiceStore.ts` y hacer scroll por el método `handleAction`.

> "Tercero, el **Store**. Aquí está el corazón: `invoiceStore`. Concentra cinco *slices* lógicos —facturas, proveedor, wizard, asignación y pagador— y los actualiza en un único `handleAction` con un `switch` por tipo de acción. El estado **siempre** se reemplaza de forma inmutable, copiando con *spread*. Eso garantiza que React detecte los cambios."

**[ACCIÓN]** Abrir `useStore.ts`.

> "Y cuarto, el puente con React: el hook `useStore` usa `useSyncExternalStore`, la API oficial de React 18 para fuentes externas. Se suscribe al store y re-renderiza el componente cuando el estado cambia."

---

## 🎬 BLOQUE 4 — Gestión de estado en vivo (2:45 – 4:15)

**[ACCIÓN]** Volver al navegador, ir a `/factor`.

> "Veámoslo funcionando. Esta es la vista del **Factor**, que evalúa facturas para comprarlas con descuento."

**[ACCIÓN]** Escribir algo en el campo de búsqueda.

> "Cuando escribo aquí, el componente llama a `setInvoiceSearch`, que es un Action Creator. Eso dispara la acción `SET_INVOICE_SEARCH` al dispatcher. El `invoiceStore` la recibe, recalcula la lista filtrada y emite un cambio. La tabla se actualiza al instante. **Nunca toqué el estado directamente.**"

**[ACCIÓN]** Hacer clic en una factura para abrir el detalle, luego "Aceptar operación".

> "Ahora abro el detalle y acepto la operación. Aquí pasa algo interesante: combinamos Flux con **TanStack Query**. El `useMutation` simula la llamada a la API DIAN; en `onMutate` disparo `submitPending` para mostrar el spinner, y en `onSuccess` disparo `submitSuccess` para marcar la operación como aceptada. La parte asíncrona la maneja Query, pero el **estado del dominio** sigue viviendo en el store de Flux."

**[ACCIÓN]** Ir a `/proveedor`, marcar firma, ofertar.

> "Mismo patrón en el perfil del Proveedor: marco la firma, ofrezco la factura, y cada interacción es una acción que pasa por el dispatcher antes de cambiar el store."

---

## 🎬 BLOQUE 5 — Cierre (4:15 – 5:00)

**[ACCIÓN]** Volver a VS Code y mostrar `src/flux/index.ts`.

> "Para resumir las **ventajas** de aplicar Flux en este proyecto:
>
> **Uno — Trazabilidad total**: cualquier cambio de estado pasó sí o sí por una acción con nombre. Es muy fácil depurar.
>
> **Dos — Separación clara**: la UI se dedica a renderizar, las acciones describen intención, y el store concentra la lógica de negocio.
>
> **Tres — Escalabilidad**: para agregar una funcionalidad nueva basta con definir un `actionType`, un creator y un caso en `handleAction`. La UI lo consume con un hook.
>
> **Cuatro — Compatibilidad con React 18** gracias a `useSyncExternalStore`, sin necesidad de librerías externas como Redux.
>
> Con eso cumplimos con la actividad: una arquitectura unidireccional, predecible y mantenible. Gracias por ver el video."

**[ACCIÓN]** Detener la grabación.

---

## 📐 Distribución de tiempos (resumen visual)

| Tiempo | Bloque | Pantalla |
|--------|--------|----------|
| 0:00 – 0:30 | Presentación | Navegador `/` |
| 0:30 – 1:30 | Teoría de Flux | Hablado / diagrama |
| 1:30 – 2:45 | Responsabilidades en código | VS Code: `dispatcher`, `actions`, `invoiceStore`, `useStore` |
| 2:45 – 4:15 | Demo en vivo | Navegador `/factor` y `/proveedor` |
| 4:15 – 5:00 | Cierre y ventajas | VS Code + cara |

---

## 🎙️ Tips de grabación

- **Habla más lento de lo que crees** — al revisar siempre suena rápido.
- **Pausa medio segundo** entre bloque y bloque (te da margen para editar).
- **No leas literal** — usa el guion como apoyo, no como teleprompter.
- Si te equivocas, **espera 2 segundos en silencio** y repite la frase: facilita cortar después.
- Resolución recomendada: **1280×720** o **1920×1080** a 30 fps.

---

## 🛠️ Atajos útiles

```bash
# Levantar la app antes de grabar
npm run dev

# Mostrar este guion + iniciar dev server (Windows PowerShell)
npm run video:guion -- -StartDevServer

# Grabar 5 min con ffmpeg si lo tienes en PATH (Windows)
npm run video:guion -- -StartDevServer -RecordWithFfmpeg
```

> Alternativas de grabación: **OBS Studio** (recomendado), **Win + G** (Game Bar de Windows), **QuickTime** (macOS) o **SimpleScreenRecorder** (Linux).
