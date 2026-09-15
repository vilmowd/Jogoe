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
    const item = button.closest(".faq-item");
    const panel = item && (item.querySelector(".answer") || document.getElementById(button.getAttribute("aria-controls")));
    const sync = (open) => {
      item.classList.toggle("open", open);
      button.setAttribute("aria-expanded", open ? "true" : "false");
      if (panel) {
        if (open) panel.removeAttribute("hidden");
        else panel.setAttribute("hidden", "");
      }
    };
    sync(item.classList.contains("open"));
    button.addEventListener("click", () => {
      const open = button.getAttribute("aria-expanded") === "true";
      document.querySelectorAll(".faq-item").forEach((other) => {
        const otherButton = other.querySelector("button");
        if (!otherButton) return;
        const otherPanel = other.querySelector(".answer");
        other.classList.remove("open");
        otherButton.setAttribute("aria-expanded", "false");
        if (otherPanel) otherPanel.setAttribute("hidden", "");
      });
      if (!open) sync(true);
    });
  });

  const menu = document.querySelector("[data-menu]");
  const drawer = document.querySelector("[data-drawer]");
  const setMenu = (open) => {
    if (!menu || !drawer) return;
    drawer.classList.toggle("open", open);
    menu.setAttribute("aria-expanded", open ? "true" : "false");
    menu.setAttribute("aria-label", open ? "Close menu" : "Open menu");
  };
  if (menu && drawer) {
    menu.addEventListener("click", (event) => {
      event.stopPropagation();
      setMenu(!drawer.classList.contains("open"));
    });
    drawer.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => setMenu(false));
    });
    document.addEventListener("click", (event) => {
      if (!event.target.closest("[data-drawer], [data-menu]")) {
        setMenu(false);
      }
    });
    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape") {
        setMenu(false);
        menu.focus();
      }
    });
  }

  if (typeof hasLicense === "function" && hasLicense()) {
    document.querySelectorAll("[data-owned]").forEach((el) => el.classList.add("is-owned"));
  }

  const hoverFine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const wrap = document.querySelector("[data-hero-orb]");
  const track = wrap && wrap.querySelector(".hero-orb-track");
  if (wrap && track && hoverFine && !reduceMotion) {
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
