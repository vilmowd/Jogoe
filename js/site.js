document.addEventListener("DOMContentLoaded", () => {
  const year = document.querySelectorAll("[data-year]");
  year.forEach((node) => {
    node.textContent = String(new Date().getFullYear());
  });

  document.querySelectorAll("[data-pay]").forEach((btn) => {
    btn.addEventListener("click", (event) => {
      event.preventDefault();
      goPay();
    });
  });

  document.querySelectorAll(".faq-item button").forEach((button) => {
    button.addEventListener("click", () => {
      const item = button.closest(".faq-item");
      const open = item.classList.contains("open");
      document.querySelectorAll(".faq-item").forEach((other) => other.classList.remove("open"));
      if (!open) item.classList.add("open");
    });
  });

  const menu = document.querySelector("[data-menu]");
  const drawer = document.querySelector("[data-drawer]");
  if (menu && drawer) {
    menu.addEventListener("click", (event) => {
      event.stopPropagation();
      drawer.classList.toggle("open");
    });
    drawer.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => drawer.classList.remove("open"));
    });
    document.addEventListener("click", (event) => {
      if (!event.target.closest("[data-drawer], [data-menu]")) {
        drawer.classList.remove("open");
      }
    });
  }

  if (hasLicense()) {
    document.querySelectorAll("[data-owned]").forEach((el) => el.classList.add("is-owned"));
  }

  const hoverFine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
  const wrap = document.querySelector("[data-hero-orb]");
  const track = wrap && wrap.querySelector(".hero-orb-track");
  if (wrap && track && hoverFine) {
    let frame = 0;
    const follow = (event) => {
      const box = wrap.getBoundingClientRect();
      const x = ((event.clientX - box.left) / box.width - 0.5) * 2;
      const y = ((event.clientY - box.top) / box.height - 0.5) * 2;
      if (frame) cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        wrap.classList.add("is-tracking");
        track.style.transform = `translate3d(${x * 18}px, ${y * 14}px, 0) rotateX(${(-y * 8).toFixed(2)}deg) rotateY(${(x * 10).toFixed(2)}deg) scale(1.03)`;
      });
    };
    wrap.addEventListener("pointermove", follow);
    wrap.addEventListener("pointerleave", () => {
      wrap.classList.remove("is-tracking");
      track.style.transform = "";
    });
  }
});
