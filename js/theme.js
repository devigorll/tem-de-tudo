(function () {
  var root = document.documentElement;
  function set(t) { root.dataset.theme = t; try { localStorage.setItem("tdt_theme", t); } catch (e) {} }
  document.getElementById("themeBtn").addEventListener("click", function () {
    set(root.dataset.theme === "dark" ? "light" : "dark");
  });
})();
