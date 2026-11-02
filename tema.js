// Tema: segue o celular/computador; a lâmpada força claro ou escuro e a escolha fica salva.
(function () {
  var root = document.documentElement;
  var saved = null;
  try { saved = localStorage.getItem('tema'); } catch (e) {}
  if (saved === 'light' || saved === 'dark') root.setAttribute('data-theme', saved);

  function isDark() {
    var t = root.getAttribute('data-theme');
    if (t) return t === 'dark';
    return window.matchMedia && matchMedia('(prefers-color-scheme: dark)').matches;
  }

  document.addEventListener('DOMContentLoaded', function () {
    var lamp = document.querySelector('.lamp');
    if (!lamp) return;
    function paint() { lamp.classList.toggle('on', !isDark()); }
    paint();
    lamp.addEventListener('click', function () {
      var next = isDark() ? 'light' : 'dark';
      root.setAttribute('data-theme', next);
      try { localStorage.setItem('tema', next); } catch (e) {}
      paint();
    });
    if (window.matchMedia) {
      var mq = matchMedia('(prefers-color-scheme: dark)');
      if (mq.addEventListener) mq.addEventListener('change', paint);
    }
  });
})();
