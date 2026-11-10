(function () {
  var $ = function (s) { return document.querySelector(s); };
  var CFG = TDT.CONFIG, state = { cat: "all", q: "" }, lastFocus;
  var esc = function (s) { return String(s).replace(/[&<>"']/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]; }); };
  var norm = function (s) { return s.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase(); };

  function toast(msg, ms) {
    var t = $("#toast"); t.textContent = msg; t.hidden = false;
    clearTimeout(toast.id); toast.id = setTimeout(function () { t.hidden = true; }, ms || 2600);
  }

  /* Info da loja */
  var place = [CFG.address, CFG.neighborhood, CFG.city].filter(Boolean).join(", ");
  $("#addr").textContent = place; $("#hours").textContent = CFG.hours;
  $("#fAddr").textContent = place; $("#fHours").textContent = CFG.hours;
  $("#mapBtn").href = "https://www.google.com/maps/search/?api=1&query=" + encodeURIComponent(place);
  $("#year").textContent = new Date().getFullYear();
  document.querySelectorAll("[data-wa]").forEach(function (a) { a.href = CFG.whatsappLink; });
  (function () {
    var d = new Date(), open = CFG.openDays.indexOf(d.getDay()) > -1 && d.getHours() >= CFG.openHour && d.getHours() < CFG.closeHour;
    $("#openState").textContent = open ? "Aberto agora · " + CFG.hours : "Fechado agora · " + CFG.hours;
  })();

  /* Categorias e filtros */
  $("#cats").innerHTML = TDT.CATEGORIES.map(function (c) {
    return '<button class="cat" type="button" data-cat="' + c.id + '"><img src="' + c.image + '" alt="" loading="lazy" width="400" height="300"><span>' + esc(c.name) + "</span></button>";
  }).join("");
  $("#filters").innerHTML = [{ id: "all", name: "Todos" }].concat(TDT.CATEGORIES).map(function (c) {
    return '<button class="chip" type="button" data-cat="' + c.id + '">' + esc(c.name) + "</button>";
  }).join("");

  function setCat(id) {
    state.cat = id;
    document.querySelectorAll(".chip").forEach(function (b) { b.classList.toggle("on", b.dataset.cat === id); b.setAttribute("aria-pressed", b.dataset.cat === id); });
    document.querySelectorAll(".cat").forEach(function (b) { b.classList.toggle("on", b.dataset.cat === id); });
    renderGrid();
  }
  function renderGrid() {
    var q = norm(state.q.trim());
    var list = TDT.PRODUCTS.filter(function (p) { return (state.cat === "all" || p.category === state.cat) && (!q || norm(p.name).indexOf(q) > -1); });
    $("#grid").innerHTML = list.map(function (p) {
      var tag = p.tags.indexOf("popular") > -1 ? '<span class="tag">Mais pedido</span>' : p.tags.indexOf("new") > -1 ? '<span class="tag new">Novidade</span>' : p.tags.indexOf("promo") > -1 ? '<span class="tag">Oferta</span>' : "";
      return '<article class="card prod">' + tag + '<img src="' + esc(p.image) + '" alt="' + esc(p.name) + '" loading="lazy" width="400" height="300"><div class="prod-b"><h3>' + esc(p.name) + "</h3><p>" + esc(p.description) +
        '</p><div class="prod-f"><span class="price">' + TDT.money(p.price) + '</span><div class="act" data-act="' + esc(p.id) + '"></div>'
        + '</div></div></article>';
    }).join("");
    $("#empty").hidden = list.length > 0;
    paintActions();
  }
  /* Botão "+" ou controles de quantidade, atualizados no lugar para não perder o foco */
  function paintActions() {
    var qty = {}; TDT.cart.lines().forEach(function (l) { qty[l.product.id] = l.qty; });
    document.querySelectorAll("[data-act]").forEach(function (box) {
      var id = box.dataset.act, q = qty[id] || 0, p = TDT.PRODUCTS.filter(function (x) { return x.id === id; })[0];
      if (box.dataset.q === String(q)) return;
      box.dataset.q = q;
      box.innerHTML = q ? '<div class="qty step"><button type="button" data-dec="' + esc(id) + '" aria-label="Diminuir quantidade de ' + esc(p.name) + '">−</button><b>' + q + '</b><button type="button" data-inc="' + esc(id) + '" aria-label="Aumentar quantidade de ' + esc(p.name) + '">+</button></div>'
        : '<button class="btn add" type="button" data-add="' + esc(id) + '" aria-label="Adicionar ' + esc(p.name) + ' ao carrinho"><span class="t">Adicionar</span><span class="pl" aria-hidden="true">+</span></button>';
    });
  }
  document.addEventListener("click", function (e) {
    var c = e.target.closest("[data-cat]");
    if (c) { setCat(c.dataset.cat); if (c.classList.contains("cat")) $("#cardapio").scrollIntoView(); }
    var a = e.target.closest("[data-add]");
    if (a) {
      TDT.cart.add(a.dataset.add);
      toast("Item adicionado ao carrinho", 1400);
    }
    var l = e.target.closest("[data-inc],[data-dec],[data-rm]");
    if (l) {
      if (l.dataset.inc) TDT.cart.add(l.dataset.inc); else if (l.dataset.dec) TDT.cart.dec(l.dataset.dec);
      else { TDT.cart.remove(l.dataset.rm); toast("Item removido", 1400); }
    }
    if (e.target.closest(".menu a")) closeMenu();
  });
  $("#search").addEventListener("input", function (e) { state.q = e.target.value; renderGrid(); });

  /* Menu mobile */
  function closeMenu() { $("#menu").classList.remove("open"); $("#burger").setAttribute("aria-expanded", "false"); }
  $("#burger").addEventListener("click", function () { var o = $("#menu").classList.toggle("open"); this.setAttribute("aria-expanded", o); });

  /* Carrinho */
  function renderCart() {
    var lines = TDT.cart.lines(), n = TDT.cart.count();
    $("#cartCount").textContent = n; $("#cartCount").classList.remove("bump"); void $("#cartCount").offsetWidth; $("#cartCount").classList.add("bump");
    $("#cartTotal").textContent = TDT.money(TDT.cart.total());
    $("#cartBody").innerHTML = lines.length ? lines.map(function (l) {
      var p = l.product;
      return '<div class="line"><img src="' + esc(p.image) + '" alt="" width="60" height="60"><div><h3>' + esc(p.name) + "</h3><small>" + TDT.money(p.price) + ' cada</small><div class="qty"><button type="button" data-dec="' + esc(p.id) + '" aria-label="Diminuir quantidade de ' + esc(p.name) + '">−</button><b>' + l.qty +
        '</b><button type="button" data-inc="' + esc(p.id) + '" aria-label="Aumentar quantidade de ' + esc(p.name) + '">+</button><button type="button" class="rm" data-rm="' + esc(p.id) + '" aria-label="Remover ' + esc(p.name) + '">Remover</button></div><div class="sub">' + TDT.money(l.subtotal) + "</div></div></div>";
    }).join("") : '<div class="cart-empty"><p><strong>Seu carrinho está vazio</strong></p><p>Escolha seus favoritos no cardápio e eles aparecem aqui.</p></div>';
    paintActions();
    $("#checkout").disabled = !lines.length; $("#clear").disabled = !lines.length;
  }
  TDT.cart.onChange = renderCart;
  function openCart() { lastFocus = document.activeElement; $("#cart").classList.add("open"); $("#cart").setAttribute("aria-hidden", "false"); $("#overlay").hidden = false; $("#cartClose").focus(); }
  function closeCart() { $("#cart").classList.remove("open"); $("#cart").setAttribute("aria-hidden", "true"); $("#overlay").hidden = true; if (lastFocus) lastFocus.focus(); }
  $("#cartBtn").addEventListener("click", openCart);
  ["#cartClose", "#keep", "#overlay"].forEach(function (s) { $(s).addEventListener("click", closeCart); });
  document.addEventListener("keydown", function (e) { if (e.key === "Escape") { closeCart(); closeMenu(); } });
  $("#clear").addEventListener("click", function () { if (confirm("Remover todos os itens do carrinho?")) { TDT.cart.clear(); toast("Carrinho limpo"); } });

  $("#checkout").addEventListener("click", function () {
    if (!TDT.cart.count()) { toast("Adicione ao menos um produto para finalizar."); return; }
    var url = TDT.cart.whatsappUrl(), text = TDT.cart.message();
    var w = window.open(url, "_blank", "noopener"), has = TDT.cart.hasPhone();
    var done = function (ok) {
      if (has) toast(w ? "Abrindo o WhatsApp com o seu pedido." + (ok ? " Uma cópia ficou guardada: se a mensagem não aparecer, cole na conversa." : "") : "Não foi possível abrir o WhatsApp. Permita pop-ups e tente de novo.", 5000);
      else toast(ok ? "Resumo copiado. Cole na conversa do WhatsApp para enviar." : "Não foi possível copiar o resumo automaticamente.", 5000);
      if (!ok && !has) window.prompt("Copie o resumo do pedido e cole no WhatsApp:", text);
    };
    if (navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(text).then(function () { done(true); }, function () { done(false); });
    else done(false);
  });

  setCat("all"); renderCart();
})();
