// Snehal Nawal — small progressive-enhancement layer.
// Nothing here is required for the content to render.

(function () {
  "use strict";

  var reduceMotion = window.matchMedia &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // Current year in the footer.
  var yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());

  // Reveal the fixed header once the hero has scrolled mostly out of view.
  var header = document.querySelector(".site-header");
  var hero = document.querySelector(".hero");
  if (header && hero && "IntersectionObserver" in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        header.classList.toggle("is-visible", !entry.isIntersecting);
      });
    }, { rootMargin: "-72px 0px 0px 0px", threshold: 0 });
    io.observe(hero);
  }

  // Count the marquee figure up once, on load.
  var fig = document.querySelector(".figure-value[data-count]");
  if (fig) {
    var target = parseFloat(fig.getAttribute("data-count"));
    var prefix = fig.getAttribute("data-prefix") || "";
    var suffix = fig.getAttribute("data-suffix") || "";
    var decimals = (String(target).split(".")[1] || "").length;

    var render = function (n) {
      fig.textContent = prefix + n.toFixed(decimals) + suffix;
    };

    if (reduceMotion || isNaN(target)) {
      render(target);
    } else {
      render(0);
      var duration = 1100;
      var start = null;
      var step = function (ts) {
        if (start === null) start = ts;
        var p = Math.min((ts - start) / duration, 1);
        // easeOutCubic
        var eased = 1 - Math.pow(1 - p, 3);
        render(target * eased);
        if (p < 1) requestAnimationFrame(step);
        else render(target);
      };
      requestAnimationFrame(step);
    }
  }
})();
