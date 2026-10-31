const SOURCES = {
  breb: {
    title: "Bre-B Bancoomeva",
    url: "https://www.bancoomeva.com.co/publicaciones/164752/bre-b/",
    text: "Bre-B es el sistema de pagos inmediatos del Banco de la República. Permite enviar y recibir dinero entre entidades en segundos, 24/7, mediante una llave asociada a una cuenta. Tipos de llave: celular, correo, cédula, alias personalizado y QR. Bancoomeva informa que el dinero llega en menos de 20 segundos y se pueden asociar hasta 5 llaves. La llave y la cuenta se administran desde los canales digitales de la entidad. Para las instrucciones vigentes, revisar la guía oficial."
  },
  businessSupport: {
    title: "Canales de atención empresarial Bancoomeva",
    url: "https://www.bancoomeva.com.co/empresas/publicaciones/163555/contactanos/",
    text: "Canales de apoyo compartidos en el material de Línea Empresarial Bancoomeva: línea nacional 01 8000 941 318 opción 4 y luego 2; línea móvil 300 910 9898 opción 2, 4 y 2; correo bancoomeva_empresarial@coomeva.com.co; horario lunes a viernes de 8:00 a.m. a 6:00 p.m. Trámites documentales informados: movimientos y extractos, estados de cuenta, certificados de planes de pago, productos y tributos, paz y salvos, certificados comerciales. Soporte transaccional: aplicación de pagos, detalle de pago de créditos, OVE y BME, transacciones masivas, usuarios, identificación de recaudos y transferencias ACH."
  },
  rates: {
    title: "Tasas y tarifas Bancoomeva",
    url: "https://www.bancoomeva.com.co/empresas/publicaciones/163812/tasas-y-tarifas/",
    text: "Las tasas y tarifas cambian. No dar cifras ni proyecciones. Indicar al cliente que consulte la publicación oficial vigente o contacte a Diana para revisar las condiciones aplicables a su producto y perfil."
  },
  credit: {
    title: "Portafolio de crédito empresarial Bancoomeva",
    url: "https://www.bancoomeva.com.co/empresas/publicaciones/163489/credito-empresarial/",
    text: "Portafolio empresarial: cartera ordinaria, crédito rotativo, crédito de tesorería, crédito de fomento y tarjeta de crédito empresarial Visa. La aprobación, monto, tasa y plazo dependen del estudio, documentación y políticas vigentes. No garantizar aprobación ni dar tasas no consultadas en fuente oficial."
  },
  cash: {
    title: "Cash Management Bancoomeva",
    url: "https://www.bancoomeva.com.co/empresas/publicaciones/163496/cash-management/",
    text: "Soluciones de recaudo, transporte de efectivo, recaudo con código de barras, recaudo referenciado, botón PSE y adquirencia. La disponibilidad, requisitos y condiciones se deben confirmar en la ficha oficial de cada producto."
  },
  payroll: {
    title: "Convenio de nómina Bancoomeva",
    url: "https://www.bancoomeva.com.co/empresas/publicaciones/163500/convenio-de-nomina/",
    text: "El convenio permite dispersar la nómina desde una cuenta empresarial, con archivo masivo en Oficina Virtual Empresarial. Las condiciones, tarifas y requisitos deben confirmarse en la ficha oficial vigente."
  },
  account: {
    title: "Cuenta corriente empresarial Bancoomeva",
    url: "https://www.bancoomeva.com.co/empresas/publicaciones/163505/cuenta-corriente/",
    text: "La cuenta corriente empresarial permite administrar recursos a la vista y puede acceder a cupo de sobregiro sujeto a estudio. Consultar requisitos y condiciones en la ficha oficial vigente."
  },
  savings: {
    title: "Ahorro e inversión empresarial Bancoomeva",
    url: "https://www.bancoomeva.com.co/empresas/publicaciones/163504/ahorro-e-inversion/",
    text: "Opciones empresariales incluyen cuenta de ahorro, cuenta corriente, CDT, Plan de Ahorro Programado Empresarial, tarjeta débito y cuentas maestras. Tasas y tarifas deben consultarse en la publicación oficial vigente."
  }
};

const ORIGIN = "https://jpatehor.github.io";
const RATE_LIMIT = new Map();
const WINDOW_MS = 60_000;
const MAX_PER_WINDOW = 20;

function corsHeaders(origin) {
  return {
    "Access-Control-Allow-Origin": origin === ORIGIN ? ORIGIN : "null",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Max-Age": "86400",
    "Vary": "Origin"
  };
}

function response(data, status, origin) {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      ...corsHeaders(origin),
      "Content-Type": "application/json; charset=utf-8",
      "Cache-Control": "no-store"
    }
  });
}

function selectSources(question) {
  const q = question.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  const keys = new Set(["businessSupport"]);
  if (/bre.?b|llave|pago inmediato|qr/.test(q)) keys.add("breb");
  if (/tasa|tarifa|interes|costo/.test(q)) keys.add("rates");
  if (/credito|prestamo|cupo|financi/.test(q)) keys.add("credit");
  if (/recaudo|pse|efectivo|proveedor|pago/.test(q)) keys.add("cash");
  if (/nomina/.test(q)) keys.add("payroll");
  if (/cuenta corriente|sobregiro/.test(q)) keys.add("account");
  if (/ahorro|inversion|cdt|cuenta maestra/.test(q)) keys.add("savings");
  return [...keys].map(key => SOURCES[key]);
}

function checkRateLimit(ip) {
  const now = Date.now();
  const item = RATE_LIMIT.get(ip);
  if (!item || now - item.start > WINDOW_MS) {
    RATE_LIMIT.set(ip, { start: now, count: 1 });
    return true;
  }
  item.count += 1;
  return item.count <= MAX_PER_WINDOW;
}

export default {
  async fetch(request, env) {
    const origin = request.headers.get("Origin") || "";
    if (request.method === "OPTIONS") return new Response(null, { status: 204, headers: corsHeaders(origin) });
    if (request.method !== "POST") return response({ error: "Método no permitido." }, 405, origin);
    if (origin && origin !== ORIGIN) return response({ error: "Origen no autorizado." }, 403, origin);

    const ip = request.headers.get("CF-Connecting-IP") || "unknown";
    if (RATE_LIMIT.size > 2000) {
      const cutoff = Date.now() - WINDOW_MS;
      for (const [key, value] of RATE_LIMIT) if (value.start < cutoff) RATE_LIMIT.delete(key);
    }
    if (!checkRateLimit(ip)) return response({ error: "Se alcanzó el límite temporal. Intente más tarde." }, 429, origin);

    if (!env.OPENAI_API_KEY) return response({ error: "Asistente IA no configurado." }, 503, origin);

    let payload;
    const bodyLength = Number(request.headers.get("Content-Length") || 0);
    if (bodyLength > 6000) return response({ error: "La consulta excede el tamaño permitido." }, 413, origin);
    try { payload = await request.json(); }
    catch { return response({ error: "Solicitud inválida." }, 400, origin); }

    const question = typeof payload.message === "string" ? payload.message.trim() : "";
    if (!question || question.length > 1000) return response({ error: "Escriba una consulta de hasta 1000 caracteres." }, 400, origin);

    const sources = selectSources(question);
    const context = sources.map(s => `FUENTE: ${s.title}\nURL: ${s.url}\nCONTENIDO: ${s.text}`).join("\n\n");
    const system = `Eres el asistente informativo de Banca Empresarial Bancoomeva para clientes en Medellín. Responde en español colombiano, de forma breve, clara, cordial y útil.\n\nREGLAS OBLIGATORIAS:\n- Basa cada afirmación solo en el CONTENIDO de las fuentes suministradas. No inventes productos, requisitos, tasas, tarifas, plazos, aprobaciones, horarios, políticas ni excepciones.\n- No des tasas numéricas. Para tasas y tarifas, remite a la fuente oficial vigente.\n- No prometas aprobación de crédito ni resultados.\n- No solicites claves, tokens, números completos de tarjeta, saldos ni documentos sensibles por este chat.\n- No compartas ni solicites datos de otras personas.\n- Si la pregunta requiere revisar una cuenta, solicitud o caso individual, indica que Diana debe atenderlo por WhatsApp al 318 707 5136 o que puede llamar a la Línea Empresarial.\n- Si las fuentes no contienen la respuesta, dilo claramente y ofrece escalar a Diana; no supongas.\n- Devuelve solo JSON válido con la forma {\\"answer\\":\\"texto\\"}. Sin HTML ni Markdown.`;

    let upstream;
    try {
      upstream = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${env.OPENAI_API_KEY}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          model: env.OPENAI_MODEL || "gpt-4o-mini",
          temperature: 0.2,
          max_tokens: 450,
          response_format: { type: "json_object" },
          messages: [
            { role: "system", content: system },
            { role: "user", content: `FUENTES DE REFERENCIA:\n${context}\n\nCONSULTA DEL CLIENTE:\n${question}` }
          ]
        })
      });
    } catch {
      return response({ error: "No se pudo consultar el asistente. Use los botones o contacte a Diana." }, 502, origin);
    }

    if (!upstream.ok) return response({ error: "El asistente no está disponible en este momento." }, 502, origin);
    let result;
    try { result = await upstream.json(); }
    catch { return response({ error: "Respuesta inválida del asistente." }, 502, origin); }

    let answer;
    try { answer = JSON.parse(result.choices?.[0]?.message?.content || "{}").answer; }
    catch { answer = null; }
    if (typeof answer !== "string" || !answer.trim()) {
      return response({ error: "No pude formular una respuesta verificada. Contacte a Diana." }, 502, origin);
    }
    return response({ answer: answer.trim(), sources: sources.map(({ title, url }) => ({ title, url })) }, 200, origin);
  }
};
