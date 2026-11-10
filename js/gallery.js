/* Carrossel "Sobre nós": rolagem nativa com snap (gestos de deslizar), setas e pontos. */
(function () {
  var photos = (TDT.GALLERY || []).filter(function (g) { return g && g.src; });
  if (!photos.length) return;
  var box = document.getElementById("gallery"), track = document.getElementById("galTrack"), dots = document.getElementById("galDots");
  photos.forEach(function (g, i) {
    var img = document.createElement("img");
    img.src = g.src; img.alt = g.alt || "Foto do estabelecimento Tem de Tudo"; img.width = 800; img.height = 600;
    if (i) img.loading = "lazy"; else img.fetchPriority = "high";
    track.appendChild(img);
    var d = document.createElement("button"); d.type = "button"; d.setAttribute("aria-label", "Ir para a foto " + (i + 1));
    d.addEventListener("click", function () { go(i); }); dots.appendChild(d);
  });
  var index = 0;
  function go(i) { track.scrollTo({ left: track.clientWidth * ((i + photos.length) % photos.length) }); }
  function mark() {
    index = Math.round(track.scrollLeft / track.clientWidth);
    Array.prototype.forEach.call(dots.children, function (d, i) { d.setAttribute("aria-current", i === index); });
  }
  track.addEventListener("scroll", function () { cancelAnimationFrame(mark.raf); mark.raf = requestAnimationFrame(mark); }, { passive: true });
  document.getElementById("galPrev").addEventListener("click", function () { go(index - 1); });
  document.getElementById("galNext").addEventListener("click", function () { go(index + 1); });
  track.addEventListener("keydown", function (e) { if (e.key === "ArrowRight") go(index + 1); if (e.key === "ArrowLeft") go(index - 1); });
  window.addEventListener("resize", function () { track.style.scrollBehavior = "auto"; go(index); track.style.scrollBehavior = ""; });
  if (photos.length < 2) { document.getElementById("galPrev").hidden = document.getElementById("galNext").hidden = dots.hidden = true; }
  box.hidden = false; mark();
})();
