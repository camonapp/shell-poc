# Shell POC

POC de experiencia 3D embebible que recibe un resultado por query param, ejecuta una animación y emite un evento al finalizar.

## Stack

- Vite + React 18 + TypeScript
- React Router v6
- Zustand (estado global)
- React Three Fiber + Drei (escena 3D)
- Tailwind CSS v4

## Arrancar

```bash
npm install
npm run dev
```

## Flujo completo

```
Shell / App padre
    │
    └─▶  Navega a /experience?outcome=success|error
              │
              ▼
         Experience page
              │  Lee ?outcome= del query (lazy, antes de que React Router lo procese)
              │  Guarda en Zustand { outcome, phase: 'idle' }
              │  Limpia la URL → /experience (replace, sin history entry)
              │
              ▼
         ExperienceScene (R3F Canvas)
              │  Detecta outcome !== null → phase: 'animating'
              │  Ejecuta animación (placeholder: 3 cilindros girando)
              │  Después de 3s → phase: 'result'
              │
              ▼
         ResultOverlay
              │  Muestra mensaje de éxito o error
              │  El usuario presiona el botón
              │
              ├─▶  window.dispatchEvent('experience:complete', { outcome, success })
              ├─▶  console.log del evento
              ├─▶  reset() del store
              └─▶  navigate('/')
```

## Query param

| Param     | Valores            | Descripción                        |
|-----------|--------------------|------------------------------------|
| `outcome` | `success`, `error` | Determina animación y resultado    |

Ejemplos:
```
/experience?outcome=success
/experience?outcome=error
```

## Evento emitido

Al presionar el botón final se dispara un `CustomEvent` en `window`:

```ts
window.addEventListener('experience:complete', (e) => {
  const { outcome, success } = (e as CustomEvent).detail
  // outcome: 'success' | 'error'
  // success: boolean
})
```

## Rutas

| Ruta          | Descripción                              |
|---------------|------------------------------------------|
| `/`           | Home — links de test para cada outcome   |
| `/experience` | Experiencia 3D (requiere query param)    |
| `/loading`    | Loading screen standalone                |

## Estado (Zustand)

```
outcome: 'success' | 'error' | null
phase:   'idle' → 'animating' → 'result'
```

El store se resetea automáticamente al salir de la experiencia.

## Agregar la animación real

Todo el comportamiento 3D vive en `src/components/scene/ExperienceScene.tsx`.  
El componente `Drum` recibe `outcome` y `phase` del store — reemplazar la geometría placeholder por el modelo jackpot real y conectar la animación al ciclo de fases.
