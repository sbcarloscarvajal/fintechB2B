#Requires -Version 5.1
<#
.SYNOPSIS
  Ayuda para grabar un video de ~5 minutos sobre el prototipo y el patron Flux.

.DESCRIPTION
  - Muestra un guion por tiempos sugeridos (300 s).
  - Opcional: inicia el servidor de desarrollo en segundo plano.
  - Opcional: si existe ffmpeg en PATH, graba pantalla completa 5 min (Windows: gdigrab).

.USAGE
  .\scripts\grabar-video-prototipo.ps1
  .\scripts\grabar-video-prototipo.ps1 -StartDevServer
  .\scripts\grabar-video-prototipo.ps1 -StartDevServer -RecordWithFfmpeg

.NOTES
  Para mejor calidad use OBS Studio o la herramienta de captura de Windows (Win+G)
  y siga el guion impreso por este script.
#>

param(
  [switch] $StartDevServer,
  [switch] $RecordWithFfmpeg
)

$ErrorActionPreference = "Stop"
$root = Split-Path $PSScriptRoot -Parent
if (-not (Test-Path (Join-Path $root "package.json"))) {
  Write-Error "No se encontro package.json. Ejecute el script desde la raiz del repositorio."
}

Write-Host ""
Write-Host "=== GUION SUGERIDO (5 minutos, 300 s) - Prototipo Fintech B2B + Flux ===" -ForegroundColor Cyan
Write-Host ""

$guion = @'
0:00-0:45  Presentacion
  - Que es el prototipo: flujos Proveedor, Wizard (UX guiada), Factor, Pagador.
  - Stack: React, Vite, TypeScript; Flux (store) + TanStack Query (async simulado DIAN), segun actividad sumativa.

0:45-1:45  Patron Flux (teoria breve)
  - Vista: componentes React solo leen estado via hooks y escriben mediante Action Creators.
  - Acciones: objetos { type, payload } disparados desde la UI.
  - Dispatcher: reparte cada accion a los stores registrados (unico punto de entrada).
  - Store: contiene estado y logica de reduccion; emite cambio; React se suscribe (useSyncExternalStore).

1:45-3:00  Recorrido en vivo - Proveedor y Wizard
  - Abrir /proveedor: marcar firma, ofertar; mencionar ProviderActions -> Dispatcher -> invoiceStore.
  - Abrir /wizard: pasos 1-3; WizardActions (next, selectInvoice, complete).

3:00-4:15  Factor y Pagador
  - /factor: filtros, busqueda Flux, detalle, useMutation + AssignmentActions (submitPending/submitSuccess).
  - /pagador: useMutation + PayerActions (ackSuccess, paySuccess).

4:15-5:00  Cierre
  - Resumir: un solo store (invoiceStore) con dominios logicos; datos mockInvoices.
  - Mencionar deploy: npm run build + hosting estatico (Vercel, Netlify, S3, GitHub Pages con base correcta).
'@

Write-Host $guion
Write-Host ""
Write-Host "URL local habitual: http://localhost:8080" -ForegroundColor Yellow
Write-Host ""

if ($StartDevServer) {
  Write-Host "Iniciando npm run dev en segundo plano..." -ForegroundColor Green
  Start-Process -FilePath "npm" -ArgumentList "run","dev" -WorkingDirectory $root -WindowStyle Minimized
  Write-Host "Espere unos segundos y abra el navegador en http://localhost:8080"
  Write-Host ""
}

if ($RecordWithFfmpeg) {
  $ffmpeg = Get-Command ffmpeg -ErrorAction SilentlyContinue
  if (-not $ffmpeg) {
    Write-Warning "ffmpeg no esta en PATH. Instale ffmpeg o use OBS / Barra de juegos de Windows."
    exit 1
  }
  $out = Join-Path $root "video-prototipo-flux-$(Get-Date -Format 'yyyyMMdd-HHmm').mp4"
  Write-Host "Grabando pantalla completa 300 s -> $out" -ForegroundColor Magenta
  Write-Host "Pulse Q en la ventana de ffmpeg para detener antes si lo necesita."
  Write-Host ""
  & ffmpeg -y -f gdigrab -framerate 15 -i desktop -t 300 -pix_fmt yuv420p -vf "scale=1280:-2" $out
  Write-Host "Archivo generado: $out" -ForegroundColor Green
}

Write-Host ""
Write-Host "Listo. Revise tambien DEPLOY_Y_PROTO_FLUX.md en la raiz del proyecto."
Write-Host ""
