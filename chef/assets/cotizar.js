/* ============================================================
   CHEF JUAN PABLO ATE — Cotizador interactivo
   Catálogo base: COTIZACION.pdf (10 páginas).
   ============================================================ */

(function () {
  "use strict";

  var CHEF_PRICE = 200000;
  var WA_NUMBER = "573187068501";

  /* ---------------- Catálogo ---------------- */

  var CATEGORIES = [
    { id: "parrilladas", label: "Parrilladas" },
    { id: "paellas", label: "Paellas" },
    { id: "platos", label: "Platos fuertes" },
    { id: "pavo", label: "Pavo" },
    { id: "tablas", label: "Tablas" },
    { id: "pasabocos", label: "Pasabocos" },
    { id: "cocteles", label: "Cócteles" }
  ];

  var MENU = [
    /* --- Parrilladas (historial de cotizaciones) --- */
    {
      id: "parr-basica", cat: "parrilladas", name: "Parrillada Básica 1", price: 40000, unit: "persona",
      desc: "Pollo 200 g en salsa cantonesa · bondiola 150 g con chimichurri · papa con sour cream · arepa.",
      details: ["Slice de pollo 200 g con salsa cantonesa", "Slice de bondiola de cerdo 150 g con chimichurri", "Papa con sour cream", "Arepa", "Contiene carne de cerdo"]
    },
    {
      id: "parr-3m", cat: "parrilladas", name: "Parrillada 3 Momentos", price: 65000, unit: "persona",
      desc: "Res 150 g · cerdo 200 g · chorizo 150 g · queso asado · piña asada · papa con sour cream · arepa.",
      details: ["Res 150 g", "Cerdo 200 g", "Chorizo 150 g", "Queso asado", "Piña asada", "Papa con sour cream y arepa", "Contiene carne de cerdo"]
    },

    /* --- Paellas --- */
    {
      id: "paella-marinara", cat: "paellas", name: "Paella Marinara", price: 67000, unit: "persona",
      desc: "Pescado, camarón, langostino, calamar, pulpo baby, scallops, mejillones y verduras.",
      details: ["Pescado, camarón y langostino", "Anillos de calamar, pulpo baby y cabecitas de calamar", "Scallops y mejillones", "Verduras y aceite de oliva", "Se sirve con ensalada y pan"]
    },
    {
      id: "paella-langosta", cat: "paellas", name: "Paella Marinara con Cola de Langosta", price: 85000, unit: "persona",
      desc: "Mariscos, langostino U15, azafrán y cola de langosta.",
      details: ["Pescado, almejas y mejillones", "Anillos de calamar, pulpo baby y calamar blanco", "Langostino U15 y scallops", "Palmitos, verduras y azafrán", "Cola de langosta", "Se sirve con ensalada y pan"]
    },
    {
      id: "paella-regional", cat: "paellas", name: "Paella Regional Mixta", price: 56000, unit: "persona",
      desc: "Cerdo, costilla de cerdo, pollo, chorizo coctel, camarones y verduras.",
      details: ["Carne de cerdo y costilla de cerdo", "Pollo y chorizo coctel", "Camarones", "Verduras y aceite de oliva", "Se sirve con ensalada y pan"]
    },
    {
      id: "paella-carnes", cat: "paellas", name: "Paella de Carnes", price: 50000, unit: "persona",
      desc: "Cerdo, costilla, pollo, chorizo coctel y verduras.",
      details: ["Carne de cerdo y costilla", "Pollo y chorizo coctel", "Verduras y aceite de oliva", "Se sirve con ensalada y pan"]
    },
    {
      id: "paella-pollo", cat: "paellas", name: "Paella de Solo Pollo", price: 28000, unit: "persona",
      desc: "Pollo, chorizo coctel, aceite de oliva y verduras.",
      details: ["Pollo", "Chorizo coctel", "Verduras y aceite de oliva", "Se sirve con ensalada y pan"]
    },
    {
      id: "paella-vegetariana", cat: "paellas", name: "Paella Vegetariana", price: 25000, unit: "persona",
      desc: "Pimientos, habichuela, arveja, espinaca, espárragos y albahaca.",
      details: ["Pimientos rojos, amarillos y verdes", "Habichuela, arveja y espinaca", "Espárragos y albahaca", "Se sirve con ensalada y pan"]
    },

    /* --- Platos fuertes --- */
    {
      id: "pollo-champinones", cat: "platos", name: "Pollo en salsa de champiñones", price: 42000, unit: "persona",
      desc: "Pollo marinado en salsa de champiñones, arroz verde y verduras frescas.",
      details: ["Pollo marinado en salsa de champiñones", "Arroz verde", "Verduras frescas: arvejas, zanahoria, lechuga, pepino y mango"]
    },
    {
      id: "medallon-cerdo", cat: "platos", name: "Medallón de cerdo en salsa de ciruelas", price: 48000, unit: "persona",
      desc: "Arroz a la jardinera, ensalada de verduras y pan.",
      details: ["Medallón de cerdo en salsa de ciruelas", "Arroz a la jardinera", "Ensalada: lechuga, mango, fresas y pepino", "Pan"]
    },
    {
      id: "solomito-bbq", cat: "platos", name: "Solomito en salsa barbacoa", price: 60000, unit: "persona",
      desc: "Molde de papa gratinado y ensalada tropical.",
      details: ["Solomito en salsa barbacoa", "Molde de papa gratinado", "Ensalada tropical"]
    },
    {
      id: "robalo", cat: "platos", name: "Róbalo apanado", price: 55000, unit: "persona",
      desc: "Arroz con coco, patacones y ensalada típica.",
      details: ["Róbalo apanado", "Arroz con coco", "Patacones", "Ensalada típica"]
    },
    {
      id: "pollo-cremoso", cat: "platos", name: "Pollo cremoso al sartén", price: 42000, unit: "persona",
      desc: "Arroz verde y ensalada.",
      details: ["Pollo cremoso al sartén", "Arroz verde", "Ensalada"]
    },
    {
      id: "chaufa", cat: "platos", name: "Arroz Chaufa", price: 38000, unit: "persona",
      desc: "Arroz tradicional peruano con ensalada y pan.",
      details: ["Arroz chaufa tradicional peruano", "Ensalada", "Pan"]
    },
    {
      id: "medallones-pollo", cat: "platos", name: "Medallones de pollo en salsa jardinera", price: 42000, unit: "persona",
      desc: "Arroz al cilantro, ensalada del campo y pan.",
      details: ["Medallones de pollo en salsa jardinera", "Arroz al cilantro", "Ensalada del campo con vinagreta", "Pan"]
    },
    {
      id: "merluza", cat: "platos", name: "Sliced de merluza en salsa verde", price: 55000, unit: "persona",
      desc: "Papas glaseadas y gratinadas, pan.",
      details: ["Sliced de merluza en salsa verde", "Papas glaseadas y gratinadas", "Pan"]
    },
    {
      id: "salmon", cat: "platos", name: "Salmón 170 g", price: 60000, unit: "persona",
      desc: "Al ajillo, soya y sésamo, finas hierbas, naranja y miel o pimienta y mostaza.",
      details: ["Salmón de 170 g aprox.", "Salsas: ajillo, soya y sésamo, finas hierbas, naranja y miel o pimienta y mostaza", "Papas glaseadas y gratinadas", "Ensalada del campo o arroz (apio, coco, cilantro o primavera)", "Pan"]
    },

    /* --- Pavo --- */
    {
      id: "pavo", cat: "pavo", name: "Pavo horneado", price: 830000, unit: "grupo10",
      desc: "Para 10 personas: gravy, arroz morrón o congrí, maduros calados y ensalada.",
      details: ["Pavo horneado", "Gravy", "Arroz morrón o congrí", "Maduros calados", "Ensalada", "Cubre 10 personas"]
    },

    /* --- Tablas --- */
    {
      id: "tabla-quesos", cat: "tablas", name: "Tabla de quesos y jamones", price: 190000, unit: "tabla",
      desc: "Para 10 a 12 personas. Mozzarella, jamón, cabano, aceitunas y cheddar.",
      details: ["Queso mozzarella", "Jamón", "Cabano", "Aceitunas", "Queso amarillo cheddar", "Apta para 10 a 12 personas"]
    },
    {
      id: "tabla-frutas", cat: "tablas", name: "Tabla de frutas y galletas", price: 120000, unit: "tabla",
      desc: "Para 10 a 12 personas. Fresa, uvas, uchuva y galletas.",
      details: ["Fresa", "Uvas", "Uchuva", "Galletas", "Apta para 10 a 12 personas"]
    },

    /* --- Pasabocas --- */
    {
      id: "rollos-jamon", cat: "pasabocos", name: "Rollos de jamón y queso", price: 3000, unit: "unidad", min: 30,
      desc: "Frío · aprox. 30 g por unidad. Mínimo 30 unidades.",
      details: ["Rollos de jamón y queso", "Se recomienda frío", "Aprox. 30 g por unidad", "Mínimo 30 unidades"]
    },
    {
      id: "bolas-pollo", cat: "pasabocos", name: "Bolas de pollo", price: 4000, unit: "unidad", min: 30,
      desc: "Frío · aprox. 30 g por unidad. Mínimo 30 unidades.",
      details: ["Bolas de pollo", "Se recomienda frío", "Aprox. 30 g por unidad", "Mínimo 30 unidades"]
    },
    {
      id: "pinchos", cat: "pasabocos", name: "Pinchos de frutas, queso y jamón", price: 9000, unit: "unidad", min: 30,
      desc: "Frío · aprox. 70 g por unidad. Mínimo 30 unidades.",
      details: ["Pinchos de frutas, queso y jamón", "Se recomienda frío", "Aprox. 70 g por unidad", "Mínimo 30 unidades"]
    },
    {
      id: "langostinos", cat: "pasabocos", name: "Langostinos al ajillo", price: 10000, unit: "unidad", min: 30,
      desc: "Caliente · aprox. 40 g por unidad. Mínimo 30 unidades.",
      details: ["Langostinos al ajillo", "Se recomienda caliente", "Aprox. 40 g por unidad", "Mínimo 30 unidades"]
    },
    {
      id: "albondigas", cat: "pasabocos", name: "Albóndigas endiabladas", price: 4000, unit: "unidad", min: 30,
      desc: "Caliente · aprox. 30 g por unidad. Mínimo 30 unidades.",
      details: ["Albóndigas endiabladas", "Se recomienda caliente", "Aprox. 30 g por unidad", "Mínimo 30 unidades"]
    },
    {
      id: "mini-sanduches", cat: "pasabocos", name: "Mini sándwiches", price: 7000, unit: "unidad", min: 30,
      desc: "Frío · aprox. 70 g por unidad. Mínimo 30 unidades.",
      details: ["Mini sándwiches", "Se recomienda frío", "Aprox. 70 g por unidad", "Mínimo 30 unidades"]
    },

    /* --- Cócteles --- */
    {
      id: "daiquiri-fresa", cat: "cocteles", name: "Daiquiri de fresa", price: 290000, unit: "grupo15",
      desc: "Base de ron · copa de 8 oz para 15 personas.",
      details: ["Cóctel a base de ron", "Copa de 8 oz", "Rinde para 15 personas"]
    },
    {
      id: "daiquiri-mango", cat: "cocteles", name: "Daiquiri de mango", price: 290000, unit: "grupo15",
      desc: "Base de ron · copa de 8 oz para 15 personas.",
      details: ["Cóctel a base de ron", "Copa de 8 oz", "Rinde para 15 personas"]
    },
    {
      id: "tequila-sunrise", cat: "cocteles", name: "Tequila Sunrise", price: 310000, unit: "grupo15",
      desc: "Base de tequila · copa de 8 oz para 15 personas.",
      details: ["Cóctel a base de tequila", "Copa de 8 oz", "Rinde para 15 personas"]
    },
    {
      id: "margarita-sunrise", cat: "cocteles", name: "Margarita Sunrise", price: 310000, unit: "grupo15",
      desc: "Base de tequila · copa de 8 oz para 15 personas.",
      details: ["Cóctel a base de tequila", "Copa de 8 oz", "Rinde para 15 personas"]
    }
  ];

  /* ---------------- Servicios ---------------- */

  var SERVICES = [
    {
      id: "chef", name: "Servicio de chef", price: 200000, unit: "evento", locked: true, badge: "Siempre incluido",
      desc: "Planeación, compra, montaje y dirección del servicio.",
      details: ["Chef principal en sitio", "Planeación del menú y cantidades", "Montaje y dirección del servicio", "Va incluido en toda cotización"]
    },
    {
      id: "chef-helper", name: "Chef helper", price: 150000, unit: "evento", recommendOver: 20,
      desc: "Apoyo adicional recomendado para eventos de más de 20 personas.",
      details: ["Chef de apoyo", "Recomendado para más de 20 personas", "Acelera el montaje y el servicio"]
    },
    {
      id: "chef-casa", name: "Chef en casa", price: 250000, unit: "evento",
      desc: "Municipios cercanos. Incluye samovares, desechables e insumos tipo buffet.",
      details: ["Servicio en municipios cercanos", "Samovares", "Desechables", "Insumos para servir tipo buffet"]
    },
    {
      id: "mesero", name: "Mesero", price: 35000, unit: "hora", qty: 4,
      desc: "Servicio de mesa por hora. Mínimo 4 horas.",
      details: ["Atención de mesas", "Se cobra por hora", "Mínimo 4 horas"]
    },
    {
      id: "asador", name: "Asador + transporte + carbón", price: 250000, unit: "evento",
      desc: "Solo si el lugar no cuenta con asador.",
      details: ["Alquiler del asador", "Transporte", "Carbón", "Insumos de parrilla"]
    },
    {
      id: "dj", name: "DJ", price: 1800000, unit: "evento",
      desc: "5 horas con sonido digital, luces y equipos.",
      details: ["DJ por 5 horas", "Sonido digital", "Luces", "Equipos incluidos"]
    },
    {
      id: "domicilio", name: "Domicilio", price: 8000, unit: "evento",
      desc: "Entrega a domicilio.",
      details: ["Entrega a domicilio"]
    }
  ];

  var ALL = MENU.concat(SERVICES);

  /* ---------------- Fotos por producto ---------------- */

  var IMG = {
    "parr-basica": "parrillada-basica",
    "parr-3m": "tres-momentos",
    "paella-marinara": "paella",
    "paella-langosta": "paella-langosta",
    "paella-regional": "paella-carnes",
    "paella-carnes": "paella-carnes",
    "paella-pollo": "paella",
    "paella-vegetariana": "paella-vegetariana",
    "pollo-champinones": "pollo",
    "medallon-cerdo": "cerdo",
    "solomito-bbq": "solomito",
    "robalo": "pescado",
    "pollo-cremoso": "pollo",
    "chaufa": "chaufa",
    "medallones-pollo": "pollo",
    "merluza": "pescado",
    "salmon": "plato-fuerte",
    "pavo": "pavo",
    "tabla-quesos": "tabla-quesos",
    "tabla-frutas": "tabla-frutas",
    "rollos-jamon": "pasabocos",
    "bolas-pollo": "pasabocos",
    "pinchos": "pasabocos",
    "langostinos": "langostinos",
    "albondigas": "pasabocos",
    "mini-sanduches": "pasabocos",
    "daiquiri-fresa": "coctel-fresa",
    "daiquiri-mango": "coctel",
    "tequila-sunrise": "coctel",
    "margarita-sunrise": "coctel"
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

  function imgFor(item) {
    var name = IMG[item.id] || CAT_IMG[item.cat] || "parrillada-basica";
    return "assets/img/" + name + ".jpg";
  }

  /* Si una foto falla, cae en la imagen principal */
  document.addEventListener("error", function (event) {
    var img = event.target;
    if (img && img.tagName === "IMG" && !img.dataset.fallback) {
      img.dataset.fallback = "1";
      img.src = "assets/img/parrillada-basica.jpg";
    }
  }, true);

  /* ---------------- Estado ---------------- */

  var state = {
    people: 30,
    cat: "parrilladas",
    cart: new Map(),
    form: { name: "", phone: "", date: "", time: "", place: "", notes: "" }
  };

  /* El chef siempre va incluido */
  state.cart.set("chef", { id: "chef", qty: 1, manual: true });

  var fmt = new Intl.NumberFormat("es-CO", {
    style: "currency", currency: "COP", maximumFractionDigits: 0
  });

  function money(n) { return fmt.format(Math.round(n || 0)); }

  function byId(id) {
    for (var i = 0; i < ALL.length; i++) if (ALL[i].id === id) return ALL[i];
    return null;
  }

  function unitLabel(item) {
    switch (item.unit) {
      case "persona": return "/ persona";
      case "unidad": return "/ unidad";
      case "tabla": return "/ tabla";
      case "grupo10": return "/ 10 personas";
      case "grupo15": return "/ 15 personas";
      case "hora": return "/ hora";
      default: return "/ evento";
    }
  }

  function defaultQty(item) {
    switch (item.unit) {
      case "persona": return state.people;
      case "grupo10": return Math.ceil(state.people / 10);
      case "grupo15": return Math.ceil(state.people / 15);
      case "unidad": return Math.max(item.min || 1, Math.ceil(state.people / 2));
      case "hora": return item.qty || 4;
      default: return 1;
    }
  }

  function minQty(item) {
    if (item.unit === "unidad") return item.min || 1;
    if (item.unit === "hora") return 1;
    return 1;
  }

  /* ---------------- Render catálogo ---------------- */

  var tabsEl = document.getElementById("tabs");
  var catalogEl = document.getElementById("catalog");
  var cartEl = document.getElementById("cart");
  var servicesEl = document.getElementById("services");

  function renderTabs() {
    tabsEl.innerHTML = CATEGORIES.map(function (c) {
      var count = MENU.filter(function (i) { return i.cat === c.id; }).length;
      return '<button class="tab' + (state.cat === c.id ? " is-active" : "") +
        '" data-cat="' + c.id + '" role="tab" aria-selected="' + (state.cat === c.id) + '">' +
        c.label + "<small>" + count + "</small></button>";
    }).join("");
  }

  function renderCatalog() {
    var items = MENU.filter(function (i) { return i.cat === state.cat; });
    catalogEl.innerHTML = items.map(function (item) {
      var added = state.cart.has(item.id);
      return '<article class="item">' +
        '<img class="item-media" src="' + imgFor(item) + '" alt="' + item.name + '" loading="lazy">' +
        '<div class="item-body">' +
          '<div class="item-top">' +
            "<h3>" + item.name + "</h3>" +
            '<span class="price">' + money(item.price) + "<small>" + unitLabel(item) + "</small></span>" +
          "</div>" +
          '<p class="desc">' + item.desc + "</p>" +
          '<div class="item-foot">' +
            '<button class="link-btn" data-detail="' + item.id + '">Ver detalles</button>' +
            '<button class="btn-add' + (added ? " is-added" : "") + '" data-add="' + item.id + '">' +
              (added ? "Agregado ✓" : "Agregar +") +
            "</button>" +
          "</div>" +
        "</div>" +
      "</article>";
    }).join("");
  }

  /* ---------------- Render servicios ---------------- */

  function renderServices() {
    servicesEl.innerHTML = SERVICES.map(function (s) {
      var on = state.cart.has(s.id);
      var recommended = s.recommendOver && state.people > s.recommendOver;
      return '<div class="service' + (on ? " is-on" : "") + (s.locked ? " is-locked" : "") + '">' +
        '<div class="service-body">' +
          "<h3>" + s.name +
            (s.badge ? ' <span class="tag">' + s.badge + "</span>" : "") +
            (recommended ? ' <span class="tag gold">Recomendado</span>' : "") +
          "</h3>" +
          "<p>" + s.desc + "</p>" +
        "</div>" +
        '<span class="s-price">' + money(s.price) + (s.unit === "hora" ? "<small style='font-family:var(--sans);font-size:10px;color:var(--muted-2)'>/h</small>" : "") + "</span>" +
        (s.locked
          ? '<span class="tag gold">Incluido</span>'
          : '<label class="switch"><input type="checkbox" data-service="' + s.id + '"' + (on ? " checked" : "") + ' aria-label="' + s.name + '"><span></span></label>') +
      "</div>";
    }).join("");
  }

  /* ---------------- Carrito ---------------- */

  function computedQty(entry) {
    var item = byId(entry.id);
    if (!item) return entry.qty;

    var auto = ["persona", "grupo10", "grupo15"].indexOf(item.unit) !== -1;
    if (auto && !entry.manual) {
      entry.qty = defaultQty(item);
    }
    return entry.qty;
  }

  function lineHtml(entry) {
    var item = byId(entry.id);
    if (!item) return "";
    var qty = computedQty(entry);
    var total = qty * item.price;
    var isEvent = item.unit === "evento";
    var isMenu = item.cat !== undefined;

    return '<li class="line" data-id="' + item.id + '">' +
      '<button class="line-name" type="button" data-detail="' + item.id + '">' + item.name + "</button>" +
      '<span class="line-total">' + money(total) + "</span>" +
      '<span class="line-meta">' + money(item.price) + " " + unitLabel(item) +
        (entry.manual && !isEvent ? ' · <span class="manual-tag">ajustado</span>' : "") +
      "</span>" +
      '<div class="line-controls">' +
        (isEvent
          ? ""
          : '<div class="qty-mini">' +
              '<button type="button" data-act="dec" aria-label="Quitar uno">−</button>' +
              '<input type="number" data-act="qty" value="' + qty + '" min="' + minQty(item) + '" aria-label="Cantidad de ' + item.name + '">' +
              '<button type="button" data-act="inc" aria-label="Agregar uno">+</button>' +
            "</div>" +
            (entry.manual && !isEvent
              ? '<button class="icon-btn" type="button" data-act="reset" title="Volver al automático" aria-label="Restablecer">⟳</button>'
              : "")) +
        (item.locked
          ? ""
          : '<button class="icon-btn" type="button" data-act="del" title="Eliminar" aria-label="Eliminar ' + item.name + '">🗑</button>') +
      "</div>" +
    "</li>";
  }

  function renderCart() {
    var menuEntries = [];
    var serviceEntries = [];

    state.cart.forEach(function (entry) {
      var item = byId(entry.id);
      if (!item) return;
      (item.cat ? menuEntries : serviceEntries).push(entry);
    });

    var html = "";
    if (menuEntries.length) {
      html += '<p class="cart-group">Menú</p>';
      html += menuEntries.map(lineHtml).join("");
    } else {
      html += '<p class="cart-empty">Tu cotización está en ceros.<br>Agrega un plato y el servicio de chef se suma automáticamente.</p>';
    }
    if (serviceEntries.length) {
      html += '<p class="cart-group">Servicios</p>';
      html += serviceEntries.map(lineHtml).join("");
    }
    cartEl.innerHTML = html;

    renderTotals(menuEntries, serviceEntries);
  }

  function renderTotals(menuEntries, serviceEntries) {
    var menu = 0, services = 0;

    menuEntries.forEach(function (e) {
      var item = byId(e.id);
      menu += computedQty(e) * item.price;
    });

    serviceEntries.forEach(function (e) {
      var item = byId(e.id);
      var qty = item.unit === "hora" ? e.qty : 1;
      services += qty * item.price;
    });

    var total = menu + services;

    setText("sumMenu", money(menu));
    setText("sumServices", money(services));
    setText("sumTotal", money(total));
    setText("sumPer", money(total / Math.max(1, state.people)));
    setText("summaryPeople", state.people + (state.people === 1 ? " persona" : " personas"));
    setText("mbTotal", money(total));

    var count = menuEntries.length;
    setText("navCount", count);
    var mbCount = document.getElementById("mbCount");
    if (mbCount) mbCount.textContent = count + (count === 1 ? " plato" : " platos");

    var waBtn = document.querySelector('[data-act="whatsapp"]');
    if (waBtn) waBtn.disabled = total === 0;

    var finalBtn = document.querySelector('[data-act="final"]');
    if (finalBtn) finalBtn.disabled = total === 0;
  }

  function setText(id, text) {
    var el = document.getElementById(id);
    if (el) el.textContent = text;
  }

  /* ---------------- Acciones carrito ---------------- */

  function addItem(id, qty) {
    var item = byId(id);
    if (!item) return;

    /* Si ya está, no se duplica: la cantidad se ajusta en el resumen */
    if (state.cart.has(id)) {
      renderAll();
      return;
    }

    state.cart.set(id, { id: id, qty: qty || defaultQty(item), manual: false });
    renderAll();
  }

  function removeItem(id) {
    var item = byId(id);
    if (item && item.locked) return;
    state.cart.delete(id);
    renderAll();
  }

  function changeQty(id, delta) {
    var entry = state.cart.get(id);
    var item = byId(id);
    if (!entry || !item) return;

    var next = (entry.qty || 1) + delta;
    entry.qty = Math.max(minQty(item), next);
    entry.manual = true;
    renderAll();
  }

  function setQty(id, value) {
    var entry = state.cart.get(id);
    var item = byId(id);
    if (!entry || !item) return;

    var qty = parseInt(value, 10);
    if (isNaN(qty)) return;
    entry.qty = Math.max(minQty(item), qty);
    entry.manual = true;
    renderAll();
  }

  function resetQty(id) {
    var entry = state.cart.get(id);
    var item = byId(id);
    if (!entry || !item) return;
    entry.manual = false;
    entry.qty = defaultQty(item);
    renderAll();
  }

  function renderAll() {
    syncChef();
    renderCatalog();
    renderServices();
    renderCart();
    saveSnapshot();
  }

  /* Guarda el estado para la página de cotización final */
  function buildSnapshot() {
    var menu = [], services = [], totals = { menu: 0, services: 0, total: 0 };

    state.cart.forEach(function (entry) {
      var item = byId(entry.id);
      if (!item) return;

      var qty = item.unit === "hora" ? entry.qty : (item.cat ? computedQty(entry) : 1);
      var lineTotal = qty * item.price;
      var row = {
        id: item.id, name: item.name, desc: item.desc, cat: item.cat || null,
        unit: item.unit, price: item.price, qty: qty, total: lineTotal
      };

      if (item.cat) { menu.push(row); totals.menu += lineTotal; }
      else { services.push(row); totals.services += lineTotal; }
    });

    totals.total = totals.menu + totals.services;

    return {
      createdAt: new Date().toISOString(),
      people: state.people,
      form: state.form,
      menu: menu,
      services: services,
      totals: totals
    };
  }

  function saveSnapshot() {
    try {
      if (state.cart.size === 0) {
        localStorage.removeItem("chefCotizacion");
      } else {
        localStorage.setItem("chefCotizacion", JSON.stringify(buildSnapshot()));
      }
    } catch (e) { /* almacenamiento no disponible */ }
  }

  /* El chef se incluye automáticamente en cuanto hay algo en la cotización,
     y desaparece si el cliente vacía todo para volver a ceros. */
  function syncChef() {
    var hasOther = false;
    state.cart.forEach(function (value, key) {
      if (key !== "chef") hasOther = true;
    });

    if (!hasOther) {
      state.cart.delete("chef");
      return;
    }

    if (!state.cart.has("chef")) {
      state.cart.set("chef", { id: "chef", qty: 1, manual: true });
    }
  }

  /* ---------------- Personas ---------------- */

  var peopleInput = document.getElementById("peopleInput");

  function setPeople(value, syncInput) {
    var n = parseInt(value, 10);
    if (isNaN(n)) n = state.people;
    state.people = Math.max(1, Math.min(300, n));
    if (syncInput) peopleInput.value = state.people;

    document.querySelectorAll(".chip[data-people]").forEach(function (chip) {
      chip.classList.toggle("is-active", Number(chip.getAttribute("data-people")) === state.people);
    });

    renderAll();
  }

  /* ---------------- Detalle ---------------- */

  var dialog = document.getElementById("detailDialog");

  function openDetail(id) {
    var item = byId(id);
    if (!item || !dialog) return;

    document.getElementById("dlgTitle").textContent = item.name;
    document.getElementById("dlgImg").src = imgFor(item);
    document.getElementById("dlgImg").alt = item.name;
    document.getElementById("dlgPrice").textContent = money(item.price) + " " + unitLabel(item);
    document.getElementById("dlgDesc").textContent = item.desc;
    document.getElementById("dlgDetails").innerHTML = (item.details || [])
      .map(function (d) { return "<li>" + d + "</li>"; }).join("");

    var addBtn = document.getElementById("dlgAdd");
    var inCart = state.cart.has(item.id);
    addBtn.setAttribute("data-add", item.id);
    addBtn.textContent = inCart ? "Ya está en tu cotización" : "Agregar a mi cotización";
    addBtn.disabled = inCart;

    if (typeof dialog.showModal === "function") dialog.showModal();
    else dialog.setAttribute("open", "");
  }

  /* ---------------- Formulario ---------------- */

  var FIELDS = {
    name: "cName", phone: "cPhone", date: "cDate",
    time: "cTime", place: "cPlace", notes: "cNotes"
  };

  function bindForm() {
    Object.keys(FIELDS).forEach(function (key) {
      var el = document.getElementById(FIELDS[key]);
      if (!el) return;
      el.addEventListener("input", function () {
        state.form[key] = el.value;
        saveSnapshot();
      });
    });
  }

  function clearForm() {
    Object.keys(FIELDS).forEach(function (key) {
      state.form[key] = "";
      var el = document.getElementById(FIELDS[key]);
      if (el) el.value = "";
    });
  }

  /* ---------------- WhatsApp ---------------- */

  function buildMessage() {
    var lines = [];
    lines.push("Hola Chef Juan Pablo, quiero cotizar:");
    lines.push("");
    lines.push("Personas: " + state.people);
    lines.push("");

    var menu = [], services = [], total = 0, menuTotal = 0, servTotal = 0;

    state.cart.forEach(function (entry) {
      var item = byId(entry.id);
      if (!item) return;
      var qty = item.unit === "hora" ? entry.qty : (item.cat ? computedQty(entry) : 1);
      var lineTotal = qty * item.price;
      total += lineTotal;
      var text = "- " + item.name + " (" + qty + ") — " + money(lineTotal);
      if (item.cat) { menu.push(text); menuTotal += lineTotal; }
      else { services.push(text); servTotal += lineTotal; }
    });

    if (menu.length) {
      lines.push("MENÚ:");
      lines = lines.concat(menu);
      lines.push("");
    }
    if (services.length) {
      lines.push("SERVICIOS:");
      lines = lines.concat(services);
      lines.push("");
    }

    lines.push("TOTAL: " + money(total));
    lines.push("");

    if (state.form.date) lines.push("Fecha: " + state.form.date + (state.form.time ? " · " + state.form.time : ""));
    if (state.form.place) lines.push("Lugar: " + state.form.place);
    if (state.form.name) lines.push("Nombre: " + state.form.name);
    if (state.form.phone) lines.push("Teléfono: " + state.form.phone);
    if (state.form.notes) lines.push("Notas: " + state.form.notes);

    return lines.join("\n");
  }

  function sendWhatsapp() {
    var url = "https://wa.me/" + WA_NUMBER + "?text=" + encodeURIComponent(buildMessage());
    window.open(url, "_blank", "noopener");
  }

  /* ---------------- Eventos ---------------- */

  document.addEventListener("click", function (event) {
    var el = event.target.closest("[data-cat],[data-add],[data-detail],[data-act],[data-people],[data-people-ctrl],[data-service]");

    /* Acciones declarativas dentro del carrito */
    var actEl = event.target.closest("[data-act]");

    if (actEl) {
      var act = actEl.getAttribute("data-act");
      var line = actEl.closest(".line");
      var id = line ? line.getAttribute("data-id") : null;

      if (act === "del" && id) { removeItem(id); return; }
      if (act === "inc" && id) { changeQty(id, 1); return; }
      if (act === "dec" && id) { changeQty(id, -1); return; }
      if (act === "reset" && id) { resetQty(id); return; }
      if (act === "print") { window.print(); return; }
      if (act === "final") {
        saveSnapshot();
        window.open("cotizacion-final.html", "_blank", "noopener");
        return;
      }
      if (act === "whatsapp") { sendWhatsapp(); return; }
      if (act === "clearForm") { clearForm(); return; }
      if (act === "closeDialog") {
        var dlg = actEl.closest("dialog");
        if (dlg) dlg.close();
        return;
      }
      if (act === "clearCart") {
        state.cart.clear();
        renderAll();
        return;
      }
    }

    if (!el) return;

    if (el.hasAttribute("data-people-ctrl")) {
      setPeople(state.people + Number(el.getAttribute("data-people-ctrl")), true);
      return;
    }

    if (el.hasAttribute("data-cat")) {
      state.cat = el.getAttribute("data-cat");
      renderTabs();
      renderCatalog();
      return;
    }

    if (el.hasAttribute("data-add")) {
      addItem(el.getAttribute("data-add"));
      if (dialog && dialog.open) dialog.close();
      return;
    }

    if (el.hasAttribute("data-detail")) {
      openDetail(el.getAttribute("data-detail"));
      return;
    }

    if (el.hasAttribute("data-people")) {
      setPeople(Number(el.getAttribute("data-people")), true);
      return;
    }
  });

  document.addEventListener("input", function (event) {
    var target = event.target;

    if (target === peopleInput) {
      setPeople(target.value, false);
      return;
    }
  });

  document.addEventListener("change", function (event) {
    var target = event.target;

    if (target.matches('[data-act="qty"]')) {
      var line = target.closest(".line");
      if (line) setQty(line.getAttribute("data-id"), target.value);
      return;
    }

    if (target === peopleInput) {
      setPeople(target.value, true);
      return;
    }

    if (target.matches("[data-service]")) {
      var id = target.getAttribute("data-service");
      if (target.checked) {
        var item = byId(id);
        state.cart.set(id, { id: id, qty: item.unit === "hora" ? (item.qty || 4) : 1, manual: true });
      } else {
        state.cart.delete(id);
      }
      renderAll();
    }
  });

  peopleInput.addEventListener("blur", function () {
    setPeople(peopleInput.value, true);
  });

  /* Cerrar diálogo al tocar el fondo */
  if (dialog) {
    dialog.addEventListener("click", function (e) {
      if (e.target === dialog) dialog.close();
    });
  }

  /* ---------------- Impresión ---------------- */

  window.addEventListener("beforeprint", function () {
    var head = document.getElementById("printHead");
    if (!head) return;

    var parts = [];
    parts.push("<strong>CHEF JUAN PABLO ATE</strong>");
    parts.push("318 706 8501 · @CHEFJUANPABLOATE");
    if (state.form.name) parts.push("Cliente: " + state.form.name);
    if (state.form.phone) parts.push("Teléfono: " + state.form.phone);
    if (state.form.date) parts.push("Fecha: " + state.form.date + (state.form.time ? " · " + state.form.time : ""));
    if (state.form.place) parts.push("Lugar: " + state.form.place);
    parts.push("Personas: " + state.people);
    if (state.form.notes) parts.push("Notas: " + state.form.notes);

    head.innerHTML = parts.join("<br>");
  });

  /* ---------------- Arranque ---------------- */

  bindForm();
  renderTabs();
  renderServices();
  setPeople(30, true);
})();
