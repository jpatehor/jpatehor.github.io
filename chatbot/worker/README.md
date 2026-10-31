# Worker IA — Asistente Banca Empresarial

Backend de referencia para responder preguntas libres con IA, restringida a contenido empresarial y fuentes oficiales de Bancoomeva.

## Estado

- Código preparado en `src/index.js`.
- Sintaxis validada con Node.
- **Aún no desplegado ni conectado a la landing.** Requiere cuenta Cloudflare y una clave aprobada para el proveedor de IA.
- No se debe poner la clave en GitHub, HTML, JavaScript del navegador ni enviarla por chat.

## Qué hace

- Acepta `POST /api/chat` con `{ "message": "..." }`.
- Limita la consulta a 1.000 caracteres y aplica una limitación básica por IP.
- Selecciona contexto y enlaces de fichas oficiales de crédito, tasas, cash management, nómina, ahorro y Bre-B.
- Instruye al modelo para responder en español, no inventar tasas ni aprobaciones, y derivar consultas sensibles a Diana.
- Devuelve `{ answer, sources }` con enlaces oficiales.
- No registra ni conserva el contenido de las preguntas.

## Despliegue cuando estén listas cuenta y aprobación

1. Instalar Node.js y Wrangler: `npm install --global wrangler`.
2. Desde esta carpeta, iniciar sesión: `wrangler login`.
3. Configurar la clave como secreto (no en el archivo): `wrangler secret put OPENAI_API_KEY`.
4. Desplegar: `wrangler deploy`.
5. Probar `OPTIONS` y `POST /api/chat`, CORS desde `https://jpatehor.github.io` y las respuestas sobre documentos, Bre-B, tasas y casos fuera de alcance.
6. Configurar el endpoint desplegado en la landing como `window.BANCOOMEVA_CHAT_API_URL` antes de `web/index.html` y volver a publicar.
7. Solicitar revisión de Seguridad, Cumplimiento y Mercadeo antes de atender clientes con IA.

## Atención y límites

- El contexto se mantiene como extractos editoriales verificados; no es una búsqueda en tiempo real de todo el sitio.
- Revisar/actualizar fuentes y extractos cuando Bancoomeva cambie fichas o condiciones.
- Tasas/tarifas numéricas, aprobaciones, estado de cuentas, fraude, mora y datos personales: derivar al canal oficial o a Diana.
- Configurar límites de uso y gasto en el proveedor antes de abrir acceso al público.
- Probar en ambiente de preproducción antes de cambiar `BANCOOMEVA_CHAT_API_URL`.
