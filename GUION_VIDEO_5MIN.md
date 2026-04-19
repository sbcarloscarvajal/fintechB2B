# 🎬 Guion Video Explicativo (5 minutos)
### Prototipo Fintech B2B — Patrón Flux

> **Cómo usarlo:** lee en voz alta los bloques en gris. Los **[ACCIÓN]** son lo que muestras en pantalla. Habla tranquilo, sin apuro.

---

## ⏱️ Antes de grabar (1 minuto)

- [ ] `npm run dev` y abrir `http://localhost:8080`.
- [ ] Tener VS Code abierto con `src/flux/` visible (lo usarás en el Bloque 3).
- [ ] Silenciar notificaciones y celular.
- [ ] Probar el micrófono.

---

## 🎬 BLOQUE 1 — Presentación (0:00 – 0:30)

**[PANTALLA]** Navegador en `http://localhost:8080/` con las 4 tarjetas de perfiles.

**[ACCIÓN]** Pasa el cursor suavemente por encima de las tarjetas mientras hablas.

> "Hola. Te voy a mostrar un prototipo de **plataforma fintech para facturas electrónicas**, con tres perfiles: **Proveedor**, **Factor** y **Pagador**.
>
> Lo interesante no es solo lo que hace, sino **cómo está organizada por dentro**: usa un patrón llamado **Flux** para manejar toda la información de la app de forma ordenada. Eso es lo que voy a explicarte."

---

## 🎬 BLOQUE 2 — ¿Qué es Flux? (0:30 – 1:30)

**[PANTALLA]** Sigue en el navegador con la página de inicio.

**[ACCIÓN]** Mientras hablas, señala las tarjetas con el cursor cuando menciones "vista".

> "Flux es una forma de organizar una aplicación para que **los datos viajen siempre en una sola dirección**. Imagínalo como una calle de un solo sentido:
>
> El **usuario hace clic** en algo (eso es la **vista**) → se dispara una **acción** que dice qué quiere hacer → la acción llega a un **lugar central** que guarda toda la información de la app → ese lugar actualiza los datos → y la pantalla se refresca sola.
>
> ¿Por qué importa? Porque en apps grandes, si cualquier parte puede cambiar los datos desde cualquier lado, **se vuelve un caos**. Con Flux, todos los cambios pasan por el mismo camino, así es **fácil saber qué pasó y por qué**."

---

## 🎬 BLOQUE 3 — Cómo está organizado el código (1:30 – 2:45)

**[ACCIÓN]** Cambia a VS Code y muestra la carpeta `src/flux/`.

> "Toda esta lógica vive en una sola carpeta: `src/flux/`. Y cada archivo tiene **una responsabilidad clara**."

**[ACCIÓN]** Click en `actions.ts`.

> "Aquí están las **acciones**: cosas como 'ofertar factura', 'aceptar operación', 'buscar'. Cada acción describe **qué quiere hacer el usuario**, nada más."

**[ACCIÓN]** Click en `invoiceStore.ts` y haz scroll rápido.

> "Aquí está el **almacén central**: guarda toda la información de la app —las facturas, quién está conectado, qué se está buscando— y decide cómo cambiar los datos cuando llega una acción. Es **el único lugar** donde se modifica la información."

**[ACCIÓN]** Click en `dispatcher.ts` (mostrar que es muy corto).

> "Y este es el **repartidor**: recibe las acciones y las lleva al almacén. Es pequeño pero clave, porque garantiza que todo pase por el mismo camino."

> "Resumen: la vista pide, la acción describe, el repartidor entrega, y el almacén guarda. Eso es todo."

---

## 🎬 BLOQUE 4 — Demo en vivo (2:45 – 4:15)

**[ACCIÓN]** Vuelve al navegador, entra a `/factor`.

> "Veámoslo funcionando. Esta es la vista del **Factor**, que evalúa facturas para comprarlas."

**[ACCIÓN]** Escribe en el buscador.

> "Cuando escribo aquí, **no estoy tocando los datos directamente**. Lo que pasa es que se dispara una acción de 'buscar', viaja al almacén, el almacén filtra la lista y la pantalla se actualiza sola. Limpio y predecible."

**[ACCIÓN]** Click en una factura → "Aceptar operación".

> "Ahora acepto una operación. Mismo flujo: una acción dice 'aceptar', el almacén la procesa y la pantalla muestra el resultado. Yo como desarrollador **nunca cambio los datos a mano**."

**[ACCIÓN]** Ir a `/proveedor`, marcar la firma y ofertar.

> "En el perfil del Proveedor pasa lo mismo: marco la firma, oferto la factura, y cada interacción es una acción que sigue el mismo camino."

---

## 🎬 BLOQUE 5 — Cierre (4:15 – 5:00)

**[ACCIÓN]** Vuelve a la página de inicio o a VS Code, lo que prefieras.

> "Para cerrar, ¿qué ganamos usando Flux en este proyecto?
>
> **Primero, orden**: todo cambio pasa por el mismo camino, así sé exactamente qué está pasando.
>
> **Segundo, cada parte hace lo suyo**: la pantalla muestra, las acciones piden, el almacén decide.
>
> **Tercero, es fácil crecer**: si quiero agregar una función nueva, solo creo una acción más. No tengo que reescribir nada.
>
> Eso es todo. Una app organizada, predecible y fácil de mantener. Gracias por ver el video."

**[ACCIÓN]** Detener la grabación.

---

## 📐 Resumen de tiempos

| Tiempo | Bloque | Pantalla |
|--------|--------|----------|
| 0:00 – 0:30 | Presentación | Navegador `/` |
| 0:30 – 1:30 | ¿Qué es Flux? | Navegador `/` |
| 1:30 – 2:45 | Código | VS Code: `src/flux/` |
| 2:45 – 4:15 | Demo | Navegador `/factor` y `/proveedor` |
| 4:15 – 5:00 | Cierre | Navegador o VS Code |

---

## 🎙️ Tips de grabación

- **Habla más lento de lo que crees** — al revisar siempre suena rápido.
- **Pausa medio segundo** entre bloque y bloque (ayuda al editar).
- **No leas literal** — usa el guion como apoyo.
- Si te equivocas, **espera 2 segundos en silencio** y repite la frase.
- Resolución recomendada: **1280×720** o **1920×1080** a 30 fps.

---

## 🛠️ Atajos útiles

```bash
# Levantar la app antes de grabar
npm run dev
```

> Grabación: **OBS Studio** (recomendado), **Win + G** (Game Bar), **QuickTime** (macOS).
