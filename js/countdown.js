/* A tiny, dependency-free enhancement. All invitation content works without JS. */
(() => {
  "use strict";
  const timer = document.querySelector(".timer");
  if (!timer) return;
  const target = Date.parse(timer.dataset.target);
  const status = document.getElementById("countdown-status");
  const units = ["days", "hours", "minutes", "seconds"];
  const elements = units.map((unit) => timer.querySelector(`[data-unit="${unit}"]`));
  let interval;

  function tick() {
    const remaining = Math.max(0, Math.floor((target - Date.now()) / 1000));
    const values = [
      Math.floor(remaining / 86400),
      Math.floor((remaining % 86400) / 3600),
      Math.floor((remaining % 3600) / 60),
      remaining % 60,
    ];
    elements.forEach((element, index) => {
      element.textContent = String(values[index]).padStart(2, "0");
    });
    if (remaining === 0) {
      status.textContent = "Our wedding day has arrived — let the celebrations begin!";
      clearInterval(interval);
      return false;
    }
    return true;
  }

  if (tick()) interval = setInterval(tick, 1000);
})();
