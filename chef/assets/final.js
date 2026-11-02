/* ============================================================
   CHEF JUAN PABLO ATE — Render de la cotización final
   Lee el estado guardado por el cotizador y arma el documento.
   ============================================================ */

(function () {
  "use strict";

  var fmt = new Intl.NumberFormat("es-CO", {
    style: "currency", currency: "COP", maximumFractionDigits: 0
  });

  function money(n) { return fmt.format(Math.round(n || 0)); }

  /* Si una foto falla, cae en la imagen principal para no dejar huecos */
  document.addEventListener("error", function (event) {
    var img = event.target;
    if (img && img.tagName === "IMG" && !img.dataset.fallback) {
      img.dataset.fallback = "1";
      img.src = "assets/img/parrillada-basica.jpg";
    }
  }, true);

  var IMG = {
    "parr-basica": "parrillada-basica",
    "parr-3m": "tres-momentos",
    "tabla-quesos": "tabla-quesos",
    "tabla-frutas": "tabla-quesos",
    "langostinos": "langostinos",
    "pavo": "pavo",
    "coctel": "coctel"
  };

  var CAT_IMG = {
    parrilladas: "parrillada-basica",
    paellas: "paella",
    platos: "plato-fuerte",
    pavo: "pavo",
    tablas: "tabla-quesos",
    pasabocos: "pasabocos",
    cocteles: "coctel"
  };

  function imgFor(row) {
    var name = IMG[row.id] || CAT_IMG[row.cat] || "parrillada-basica";
    return "assets/img/" + name + ".jpg";
  }

  function escapeHtml(text) {
    return String(text == null ? "" : text)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  function dateLong(iso) {
    if (!iso) return "";
    var d = new Date(iso + "T12:00:00");
    if (isNaN(d.getTime())) return iso;
    var s = d.toLocaleDateString("es-CO", {
      weekday: "long", day: "numeric", month: "long", year: "numeric"
    });
    return s.charAt(0).toUpperCase() + s.slice(1);
  }

  function qtyLabel(row) {
    var q = row.qty;
    switch (row.unit) {
      case "persona": return q + (q === 1 ? " persona" : " personas");
      case "unidad": return q + (q === 1 ? " unidad" : " unidades");
      case "tabla": return q + (q === 1 ? " tabla" : " tablas");
      case "grupo10": return q + (q === 1 ? " grupo" : " grupos") + " (10 pers.)";
      case "grupo15": return q + (q === 1 ? " grupo" : " grupos") + " (15 pers.)";
      case "hora": return q + (q === 1 ? " hora" : " horas");
      default: return "1";
    }
  }

  function unitPrice(row) {
    switch (row.unit) {
      case "persona": return money(row.price) + " / persona";
      case "unidad": return money(row.price) + " / unidad";
      case "tabla": return money(row.price) + " / tabla";
      case "grupo10": return money(row.price) + " / 10 pers.";
      case "grupo15": return money(row.price) + " / 15 pers.";
      case "hora": return money(row.price) + " / hora";
      default: return money(row.price);
    }
  }

  function readState() {
    try {
      var raw = localStorage.getItem("chefCotizacion");
      if (!raw) return null;
      var data = JSON.parse(raw);
      if (!data || !data.menu) return null;
      if (!data.menu.length && !data.services.length) return null;
      return data;
    } catch (e) {
      return null;
    }
  }

  function renderEmpty() {
    document.getElementById("doc").innerHTML =
      '<div class="empty-state">' +
        '<h1>Aún no hay una cotización</h1>' +
        "<p>Arma tu menú en el cotizador y vuelve a esta página para ver la propuesta final.</p>" +
        '<a class="btn" href="cotizar.html">Ir al cotizador</a>' +
      "</div>";
    document.getElementById("btnPrint").disabled = true;
    document.getElementById("btnShare").disabled = true;
  }

  function render(data) {
    var form = data.form || {};
    var createdAt = data.createdAt ? new Date(data.createdAt) : new Date();
    var validUntil = new Date(createdAt.getTime() + 8 * 24 * 60 * 60 * 1000);

    var quoteNumber = "COT-" + createdAt.getFullYear() +
      String(createdAt.getMonth() + 1).padStart(2, "0") +
      String(createdAt.getDate()).padStart(2, "0") + "-" +
      String(Math.floor(Math.random() * 900) + 100);

    var first = data.menu[0] || data.services[0] || null;
    var banner = first ? imgFor(first) : "assets/img/parrillada-basica.jpg";
    var bannerTitle = first ? first.name : "Propuesta gastronómica";
    var bannerSub = first ? first.desc : "Menú seleccionado para tu evento";

    var menuRows = data.menu.map(function (row) {
      return "<tr>" +
        '<td><div class="item-cell">' +
          '<img class="item-thumb" src="' + imgFor(row) + '" alt="" loading="lazy">' +
          '<span><span class="item-name">' + escapeHtml(row.name) + "</span>" +
          (row.desc ? '<span class="item-desc">' + escapeHtml(row.desc) + "</span>" : "") +
          "</span>" +
        "</div></td>" +
        '<td class="num">' + qtyLabel(row) + "</td>" +
        '<td class="num">' + unitPrice(row) + "</td>" +
        '<td class="num">' + money(row.total) + "</td>" +
      "</tr>";
    }).join("");

    var serviceRows = data.services.map(function (row) {
      return "<tr>" +
        '<td class="item-name">' + escapeHtml(row.name) + "</td>" +
        '<td class="svc-detail">' + qtyLabel(row) + "</td>" +
        '<td class="num">' + money(row.total) + "</td>" +
      "</tr>";
    }).join("");

    var clientName = form.name ? escapeHtml(form.name) : "Por confirmar";
    var phone = form.phone ? escapeHtml(form.phone) : "—";
    var place = form.place ? escapeHtml(form.place) : "Por confirmar";
    var eventDate = form.date ? dateLong(form.date) : "Por definir";
    var eventTime = form.time ? escapeHtml(form.time) : "Por definir";

    var html =
      '<div class="doc-head">' +
        "<div>" +
          '<p class="eyebrow">Propuesta gastronómica</p>' +
          '<h1 class="doc-title">Cotización de evento</h1>' +
        "</div>" +
        '<div class="doc-meta">' +
          "<div><strong>" + quoteNumber + "</strong></div>" +
          "<div>Emitida: " + createdAt.toLocaleDateString("es-CO") + "</div>" +
          "<div>Vigencia: " + validUntil.toLocaleDateString("es-CO") + "</div>" +
        "</div>" +
      "</div>" +

      '<figure class="quote-banner">' +
        '<img src="' + banner + '" alt="' + escapeHtml(bannerTitle) + '">' +
        '<figcaption class="doc-banner-caption">' +
          "<strong>" + escapeHtml(bannerTitle) + "</strong>" +
          escapeHtml(bannerSub || "") +
        "</figcaption>" +
      "</figure>" +

      '<section class="card">' +
        '<h2 class="section-title">Datos del evento</h2>' +
        '<div class="data-grid">' +
          '<div class="data-item"><span class="label">Cliente</span><span class="value">' + clientName + "</span></div>" +
          '<div class="data-item"><span class="label">Teléfono</span><span class="value">' + phone + "</span></div>" +
          '<div class="data-item"><span class="label">Fecha</span><span class="value">' + eventDate + "</span></div>" +
          '<div class="data-item"><span class="label">Hora de servicio</span><span class="value">' + eventTime + "</span></div>" +
          '<div class="data-item"><span class="label">Comensales</span><span class="value">' + data.people + "</span></div>" +
          '<div class="data-item" style="grid-column:1/-1;"><span class="label">Lugar</span><span class="value">' + place + "</span></div>" +
        "</div>" +
      "</section>" +

      '<section class="card">' +
        '<h2 class="section-title">Menú</h2>' +
        '<div class="table-wrap"><table>' +
          "<thead><tr><th>Producto</th><th class=\"num\">Cantidad</th><th class=\"num\">Valor unitario</th><th class=\"num\">Subtotal</th></tr></thead>" +
          "<tbody>" + menuRows + "</tbody>" +
          '<tfoot><tr class="tfoot-row"><td colspan="3">Subtotal alimentación</td><td class="num">' + money(data.totals.menu) + "</td></tr></tfoot>" +
        "</table></div>" +
      "</section>" +

      '<section class="card">' +
        '<h2 class="section-title">Servicios</h2>' +
        '<div class="table-wrap"><table>' +
          "<thead><tr><th>Servicio</th><th>Detalle</th><th class=\"num\">Valor</th></tr></thead>" +
          "<tbody>" + serviceRows + "</tbody>" +
          '<tfoot><tr class="tfoot-row"><td colspan="2">Subtotal servicios</td><td class="num">' + money(data.totals.services) + "</td></tr></tfoot>" +
        "</table></div>" +
      "</section>" +

      '<section class="total-panel">' +
        "<div>" +
          '<p class="label">Total del evento</p>' +
          '<p class="amount">' + money(data.totals.total) + "</p>" +
        "</div>" +
        '<p class="note">Equivale a ' + money(data.totals.total / Math.max(1, data.people)) +
          " por persona. Reserva con el 100 % del valor.</p>" +
      "</section>" +

      '<section class="card">' +
        '<h2 class="section-title">Datos de pago</h2>' +
        '<div class="pay-grid">' +
          '<div class="pay-item"><span class="label">Banco</span><span class="value">Bancolombia</span></div>' +
          '<div class="pay-item"><span class="label">Cuenta de ahorros</span><span class="value">24500017000</span></div>' +
          '<div class="pay-item"><span class="label">Titular</span><span class="value">Juan Pablo Atehortúa</span></div>' +
        "</div>" +
      "</section>" +

      (form.notes ?
      '<section class="card">' +
        '<h2 class="section-title">Notas</h2>' +
        '<div class="notice">' + escapeHtml(form.notes) + "</div>" +
      "</section>" : "") +

      '<section class="card">' +
        '<h2 class="section-title">Condiciones</h2>' +
        '<div class="notice">' +
          "<ul>" +
            "<li>La reserva se confirma con el <strong>100 % del valor</strong>.</li>" +
            "<li>El menú es editable antes de confirmar la reserva.</li>" +
            "<li>Precios sujetos a validación y vigencia a la fecha de emisión.</li>" +
            "<li>Cambios en la cantidad de comensales ajustan el total.</li>" +
          "</ul>" +
          '<p style="margin:12px 0 0;"><span class="stamp">Propuesta sujeta a validación</span></p>' +
        "</div>" +
      "</section>" +

      '<footer class="footer">' +
        "<div>CHEF JUAN PABLO ATE · 318 706 8501 · @CHEFJUANPABLOATE</div>" +
        "<div>Bancolombia · Ahorros 24500017000</div>" +
      "</footer>";

    document.getElementById("doc").innerHTML = html;

    if (form.name) {
      document.title = "Cotización · " + form.name + " — CHEF JUAN PABLO ATE";
    }
  }

  function init() {
    var data = readState();
    if (!data) {
      renderEmpty();
      return;
    }

    render(data);

    document.getElementById("btnPrint").addEventListener("click", function () {
      window.print();
    });

    document.getElementById("btnShare").addEventListener("click", function () {
      var payload = {
        title: document.title,
        text: "Cotización CHEF JUAN PABLO ATE",
        url: window.location.href
      };
      if (navigator.share) {
        navigator.share(payload).catch(function () {});
      } else if (navigator.clipboard) {
        navigator.clipboard.writeText(window.location.href);
        var btn = document.getElementById("btnShare");
        var original = btn.textContent;
        btn.textContent = "¡Copiado!";
        window.setTimeout(function () { btn.textContent = original; }, 1800);
      }
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
