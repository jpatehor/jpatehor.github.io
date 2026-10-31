# Proyecto Chatbot — Banca Empresarial Diana Hernández

## Estado actual (Fase 1 — publicada)

La landing ya tiene un **asistente virtual flotante** en la esquina inferior derecha.

**Qué hace hoy:**
- Se abre automáticamente al cargar la landing, con avatar de Diana y botón para cerrar.
- Incluye campo de texto y flecha de envío; reconoce preguntas frecuentes por palabras clave.
- Botones rápidos: **Trámites**, **Líneas de Atención**, **Bre-B** y **Hablar con Diana**.
- Trámites → **Solicitar Documentos**, que abre el panel de canales oficiales.
- Bre-B: explicación informativa dentro del chat y enlace a la ficha oficial.
- Avatar de Diana con indicador en línea y animación suave.
- Las respuestas de líneas/correo ajustan el texto al panel y ofrecen enlaces `tel:`/`mailto:`.
- No pide ni almacena datos personales.
- No requiere backend ni API de IA; las respuestas son reglas locales.

**Archivo:** `web/index.html` (widget embebido, HTML + CSS + JavaScript).

**Límite:** el campo de texto reconoce intents básicos por palabras clave; no es un modelo de IA y deriva a Diana cuando no tiene una respuesta validada.

**Publicado:** https://jpatehor.github.io/ (el chat se abre automáticamente tras una breve pausa; el visitante puede cerrarlo).

## IA generativa — scaffold preparado, todavía no activo

La landing tiene el cliente preparado para usar un endpoint seguro cuando se configure `window.BANCOOMEVA_CHAT_API_URL`. El código del backend está en `chatbot/worker/` y se copiará al repositorio de despliegue.

**No se debe poner una clave de IA en `web/index.html` ni en GitHub Pages.** El Worker guarda la clave como secreto de Cloudflare y usa extractos seleccionados de fuentes Bancoomeva con enlaces de respaldo. El Worker no envía ni almacena el historial completo del chat; envía solo la pregunta actual y el contexto pertinente.

### Activación cuando estén aprobados el proveedor y el presupuesto

1. Crear/verificar una cuenta Cloudflare y configurar el subdominio aprobado.
2. Desde `chatbot/worker/`, ejecutar `npx wrangler login` y `npx wrangler deploy`.
3. Guardar la clave del proveedor de IA como secreto: `npx wrangler secret put OPENAI_API_KEY`.
4. Configurar `OPENAI_MODEL` en variables del Worker si se decide usar otro modelo.
5. Probar CORS, límites de petición, preguntas de Bre-B, tasas, documentos y consultas fuera de alcance.
6. Asignar el endpoint aprobado a `window.BANCOOMEVA_CHAT_API_URL` en la landing y volver a publicar.
7. Solicitar revisión de Seguridad, Cumplimiento y Mercadeo antes de atender clientes con IA.

Mientras `BANCOOMEVA_CHAT_API_URL` esté vacío, el campo de texto usa respuestas locales guiadas; no se presenta como IA generativa.

**Estado real:** Worker scaffold creado y validado sintácticamente. No está desplegado ni conectado porque aún requiere cuenta/proyecto Cloudflare, aprobación de proveedor y secreto `OPENAI_API_KEY`. No incluir la clave en GitHub ni compartirla por chat.

---

## Fase 2 — WhatsApp Business (sin API, 1–2 semanas)

Objetivo: que el primer mensaje del cliente reciba respuesta inmediata sin que Diana esté conectada.

### Configuración

1. **Perfil de WhatsApp Business** con foto, descripción, horario y enlace a la landing.
2. **Mensaje de bienvenida** automático (se envía una vez por cliente nuevo).
3. **Mensaje de ausencia** fuera de horario (lunes a viernes 8:00–18:00).
4. **Respuestas rápidas** para:
   - Documentos y certificados.
   - Línea de atención.
   - Requisitos de crédito.
   - Agenda.
5. **Etiquetas**: `nuevo`, `documentos`, `crédito`, `cita`, `seguimiento`, `cerrado`.
6. **Catálogo** con los productos principales.

### Flujo de bienvenida

```
Cliente escribe
   ↓
Mensaje automático: "Hola, soy el asistente de Diana. ¿Qué necesita?"
   ↓
[Documentos] [Crédito] [Hablar con Diana]
   ↓
Respuesta con enlace / teléfono / correo
   ↓
Si es caso específico → etiqueta "asesor" y notifica a Diana
```

### Reglas

- El mensaje automático se envía **una vez**, no en cada mensaje.
- No prometer aprobaciones, tasas ni plazos.
- No pedir cédula, claves ni extractos por WhatsApp.
- Si el cliente pide un humano, responder de inmediato y avisar a Diana.
- Fuera de horario, informar y prometer respuesta el siguiente día hábil.

---

## Fase 3 — WhatsApp API + IA (3–6 semanas)

Objetivo: atención automatizada con contexto, derivación inteligente y registro en CRM.

### Arquitectura propuesta

```
WhatsApp del cliente
        ↓
Meta Cloud API (número oficial)
        ↓
Proveedor: 360dialog / Gupshup / Twilio
        ↓
Orquestador: n8n o Make
        ↓
Motor de IA (OpenAI / Claude) + base de conocimiento
        ↓
CRM (HubSpot / Zoho) + tareas para Diana
        ↓
Respuesta al cliente
```

### Base de conocimiento del bot

- Productos y condiciones (sin tasas inventadas; enlace a Tasas y Tarifas).
- Requisitos por producto.
- Preguntas frecuentes.
- Horarios y canales.
- Guiones de acompañamiento documental.
- Reglas de escalamiento.

### Intenciones que debe manejar

| Intención | Acción |
|---|---|
| Horario | Responde horario y canal |
| Documentos | Explica el trámite y entrega línea/correo |
| Requisitos de crédito | Lista documentos y ofrece diagnóstico |
| Tasas | Enlace a la publicación oficial, sin cifras inventadas |
| Estado de solicitud | Deriva a Diana (requiere autenticación) |
| Agendar | Envía enlace de agenda o WhatsApp |
| Hablar con humano | Handoff inmediato |
| Queja | Registra, pide disculpas, escala |
| Fuera de alcance | "No tengo ese dato; le conecto con Diana" |

### Reglas de seguridad

1. **No inventar tasas, aprobaciones ni plazos.**
2. **No solicitar datos sensibles** (claves, tokens, cédula completa).
3. **No prometer** condonaciones ni excepciones.
4. **Derivar a humano** ante quejas, fraude, mora o solicitudes de crédito.
5. **Registrar consentimiento** y respetar la baja.
6. **No responder con datos de otros clientes.**

### Costos estimados

| Rubro | Costo |
|---|---|
| WhatsApp Cloud API | Por conversación (consultar tarifa vigente) |
| Proveedor BSP | USD 0–50/mes según plan |
| n8n / Make | USD 0–20/mes |
| IA (OpenAI / Claude) | USD 10–50/mes según volumen |
| CRM | USD 0–25/mes |

---

## Fase 4 — Medición y mejora (continuo)

| Métrica | Qué mide |
|---|---|
| Tiempo de primera respuesta | Velocidad |
| Tasa de resolución sin humano | Autoservicio |
| Handoff a Diana | Casos que requieren persona |
| Satisfacción (CSAT) | Calidad |
| Intenciones más frecuentes | Qué automatizar primero |
| Errores del bot | Qué corregir |

---

## Roadmap

| Semana | Entregable |
|---|---|
| 1 | Mensajes de bienvenida/ausencia y respuestas rápidas en WhatsApp Business |
| 2 | Etiquetas, catálogo y guiones de handoff |
| 3–4 | Cuenta de Meta Business, número oficial y verificación |
| 5–6 | API, orquestador y base de conocimiento |
| 7–8 | Piloto con 20 clientes |
| 9–12 | IA, CRM y medición |

---

## Lo que se necesita para arrancar la Fase 3

1. Número de teléfono dedicado (no el personal de Diana).
2. Cuenta de Meta Business verificada.
3. Política de privacidad publicada.
4. Proveedor BSP elegido.
5. Presupuesto mensual aprobado.
6. Definición de horarios y reglas de escalamiento.
7. Acceso al CRM o decisión de cuál usar.

---

## Decisión recomendada

**No empezar por IA.** Empezar por la Fase 2 (WhatsApp Business con respuestas rápidas) porque:
- Cuesta cero.
- Resuelve el 60–70% de las preguntas repetidas.
- Permite medir qué preguntan realmente los clientes.
- Reduce el riesgo de un bot que responda mal.

La IA se implementa cuando ya exista un histórico de conversaciones y una base de conocimiento validada.
