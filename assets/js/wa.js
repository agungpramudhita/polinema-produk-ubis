// Semua tombol dengan [data-wa] diarahkan ke WhatsApp unit bisnis.
const WA = "628133800082";
document.querySelectorAll("[data-wa]").forEach(a => {
  const msg = a.dataset.wa || "Halo, saya tertarik dengan produk Unit Bisnis Polinema.";
  a.href = `https://wa.me/${WA}?text=${encodeURIComponent(msg)}`;
  a.target = "_blank"; a.rel = "noopener";
});
