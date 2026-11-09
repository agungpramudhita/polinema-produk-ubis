// Scroll-reveal + count-up. Tanpa JS, konten tetap tampil (class .reveal hanya aktif jika JS jalan).
(() => {
  const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const count = el => {
    const to = +el.dataset.count, dur = 1200, t0 = performance.now();
    const f = t => { const p = Math.min((t - t0) / dur, 1); el.textContent = Math.round(to * (1 - Math.pow(1 - p, 3))); if (p < 1) requestAnimationFrame(f); };
    reduce ? el.textContent = to : requestAnimationFrame(f);
  };
  const io = new IntersectionObserver(es => es.forEach(e => {
    if (!e.isIntersecting) return;
    e.target.classList.add("in");
    e.target.querySelectorAll("[data-count]").forEach(count);
    io.unobserve(e.target);
  }), { threshold: .2 });
  document.querySelectorAll(".card,.step,.stat-wrap,.growth,.gallery img,.team .card").forEach((el, i) => {
    el.classList.add("reveal"); el.style.setProperty("--d", (i % 4) * .08 + "s"); io.observe(el);
  });
})();
