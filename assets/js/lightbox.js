// Klik foto galeri -> tampil besar (pop up). Tutup: klik latar / X / Esc. Navigasi: tombol, panah keyboard, geser.
(() => {
  const imgs = [...document.querySelectorAll(".gallery img")];
  if (!imgs.length) return;
  const lb = document.createElement("div");
  lb.className = "lb"; lb.setAttribute("role", "dialog"); lb.setAttribute("aria-modal", "true");
  lb.innerHTML = '<button class="x" aria-label="Tutup">✕</button><button class="p" aria-label="Sebelumnya">‹</button><img alt=""><button class="n" aria-label="Berikutnya">›</button><div class="c"></div>';
  document.body.appendChild(lb);
  const big = lb.querySelector("img"), cap = lb.querySelector(".c");
  let i = 0;
  const show = n => { i = (n + imgs.length) % imgs.length; big.src = imgs[i].src; big.alt = imgs[i].alt; cap.textContent = `${i + 1} / ${imgs.length}`; };
  const open = n => { show(n); lb.classList.add("open"); requestAnimationFrame(() => lb.classList.add("show")); document.body.style.overflow = "hidden"; };
  const close = () => { lb.classList.remove("show"); setTimeout(() => lb.classList.remove("open"), 250); document.body.style.overflow = ""; };
  imgs.forEach((im, k) => { im.tabIndex = 0; im.addEventListener("click", () => open(k)); im.addEventListener("keydown", e => { if (e.key === "Enter") open(k); }); });
  lb.addEventListener("click", e => { if (e.target === lb || e.target.classList.contains("x")) close(); });
  lb.querySelector(".p").onclick = () => show(i - 1);
  lb.querySelector(".n").onclick = () => show(i + 1);
  addEventListener("keydown", e => { if (!lb.classList.contains("open")) return; if (e.key === "Escape") close(); if (e.key === "ArrowLeft") show(i - 1); if (e.key === "ArrowRight") show(i + 1); });
  let sx = 0;
  lb.addEventListener("touchstart", e => sx = e.touches[0].clientX, { passive: true });
  lb.addEventListener("touchend", e => { const d = e.changedTouches[0].clientX - sx; if (Math.abs(d) > 50) show(i + (d < 0 ? 1 : -1)); });
})();
