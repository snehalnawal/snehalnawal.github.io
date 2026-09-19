// Snehal Nawal — progressive enhancement only. The page is complete without it.
(function () {
  "use strict";
  var y = document.getElementById("year");
  if (y) y.textContent = String(new Date().getFullYear());
})();
