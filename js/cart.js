/* Carrinho: guarda apenas {id: quantidade}; preços vêm sempre do catálogo.
   Usa sessionStorage: sobrevive a atualizações na mesma visita (aba) e começa vazio em nova visita. */
(function () {
  var KEY = "tdt_cart", items = {};
  var byId = {}; TDT.PRODUCTS.forEach(function (p) { byId[p.id] = p; });
  var fmt = new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" });
  TDT.money = function (v) { return fmt.format(v).replace(/\u00a0/g, " "); };
  function load() {
    try { localStorage.removeItem(KEY); } catch (e) {} // descarta carrinho antigo da versão anterior
    try {
      var raw = JSON.parse(sessionStorage.getItem(KEY) || "{}");
      Object.keys(raw).forEach(function (id) {
        var q = Math.floor(Number(raw[id]));
        if (byId[id] && q > 0 && q <= 99) items[id] = q;
      });
    } catch (e) { items = {}; }
  }
  function save() { try { sessionStorage.setItem(KEY, JSON.stringify(items)); } catch (e) {} }
  var C = TDT.cart = {
    onChange: function () {},
    add: function (id) { if (byId[id]) { items[id] = Math.min(99, (items[id] || 0) + 1); C.commit(); } },
    dec: function (id) { if (items[id] > 1) items[id]--; else delete items[id]; C.commit(); },
    remove: function (id) { delete items[id]; C.commit(); },
    clear: function () { items = {}; C.commit(); },
    commit: function () { save(); C.onChange(); },
    lines: function () { return Object.keys(items).map(function (id) { return { product: byId[id], qty: items[id], subtotal: byId[id].price * items[id] }; }); },
    count: function () { return Object.values(items).reduce(function (a, b) { return a + b; }, 0); },
    total: function () { return C.lines().reduce(function (a, l) { return a + l.subtotal; }, 0); },
    message: function () {
      var rows = C.lines().map(function (l) { return "- " + l.qty + "x " + l.product.name + " — " + TDT.money(l.subtotal); });
      return "Olá! Gostaria de fazer um pedido na " + TDT.CONFIG.storeName + "!\n\n*MEU PEDIDO:*\n\n" + rows.join("\n") +
        "\n\n*TOTAL DO PEDIDO: " + TDT.money(C.total()) + "*\n\nAguardo a confirmação do pedido. Obrigado!";
    },
    /* Se houver whatsappPhone: link com texto pré-preenchido. Senão: link oficial (que não aceita texto)
       e o resumo é copiado para a área de transferência. */
    whatsappUrl: function () {
      var phone = String(TDT.CONFIG.whatsappPhone || "").replace(/\D/g, "");
      return phone ? "https://wa.me/" + phone + "?text=" + encodeURIComponent(C.message()) : TDT.CONFIG.whatsappLink;
    },
    hasPhone: function () { return !!String(TDT.CONFIG.whatsappPhone || "").replace(/\D/g, ""); }
  };
  load();
})();
