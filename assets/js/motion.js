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

// ===== Versi ramai: parallax, tilt, confetti, tombol WA melayang =====
(() => {
  const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
  // tombol WhatsApp melayang
  const fab = document.createElement("a");
  fab.className = "wa-fab"; fab.setAttribute("data-wa", ""); fab.setAttribute("aria-label", "Chat WhatsApp"); fab.textContent = "💬";
  document.body.appendChild(fab);
  if (window.__bindWA) window.__bindWA();
  else fab.href = "https://wa.me/628133800082?text=" + encodeURIComponent("Halo, saya tertarik dengan produk Unit Bisnis Polinema."), fab.target = "_blank", fab.rel = "noopener";
  if (reduce) return;
  // confetti koin/emoji
  const burst = (x, y, n = 22) => {
    const set = ["🪙", "💰", "⭐", "🎲", "☕", "📈", "🎉"];
    for (let i = 0; i < n; i++) {
      const el = document.createElement("div"); el.className = "piece"; el.textContent = set[i % set.length];
      el.style.left = x + "px"; el.style.top = y + "px"; document.body.appendChild(el);
      const a = Math.random() * Math.PI * 2, v = 120 + Math.random() * 220;
      el.animate([{ transform: "translate(0,0) scale(.4) rotate(0)", opacity: 1 },
        { transform: `translate(${Math.cos(a) * v}px,${Math.sin(a) * v - 80}px) scale(1.2) rotate(${Math.random() * 540}deg)`, opacity: 1, offset: .6 },
        { transform: `translate(${Math.cos(a) * v * 1.1}px,${Math.sin(a) * v + 260}px) scale(.8) rotate(720deg)`, opacity: 0 }],
        { duration: 1400 + Math.random() * 600, easing: "cubic-bezier(.2,.7,.3,1)" }).onfinish = () => el.remove();
    }
  };
  document.addEventListener("click", e => { if (e.target.closest("[data-wa],.chip,.stat")) burst(e.clientX, e.clientY); });
  // confetti saat bagian ajakan terlihat
  const cta = document.querySelector(".cta");
  if (cta) new IntersectionObserver((es, o) => es.forEach(e => { if (e.isIntersecting) { const r = e.target.getBoundingClientRect(); burst(innerWidth / 2, r.top + r.height / 2, 30); o.disconnect(); } }), { threshold: .6 }).observe(cta);
  // parallax koin & ikon mengikuti mouse/scroll
  const floaters = document.querySelectorAll(".hero .coin,.hero .fi");
  addEventListener("scroll", () => { const y = scrollY; floaters.forEach((f, i) => f.style.translate = `0 ${y * (.05 + (i % 4) * .04)}px`); }, { passive: true });
  // tilt 3D pada kartu (hanya perangkat dengan mouse)
  if (matchMedia("(hover:hover)").matches) document.querySelectorAll(".card").forEach(c => {
    c.classList.add("tilt");
    c.addEventListener("mousemove", e => { const r = c.getBoundingClientRect(), x = (e.clientX - r.left) / r.width - .5, y = (e.clientY - r.top) / r.height - .5; c.style.transform = `perspective(700px) rotateY(${x * 12}deg) rotateX(${-y * 12}deg) translateY(-4px)`; });
    c.addEventListener("mouseleave", () => c.style.transform = "");
  });
})();
