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

  const gazeMarkup =
    '<div class="gaze" aria-hidden="true">' +
    '<span class="eye left"><span class="pupil"></span></span>' +
    '<span class="eye right"><span class="pupil"></span></span>' +
    "</div>";

  const hoverFine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;

  const clearLooking = (except) => {
    document.querySelectorAll("[data-gaze].is-looking").forEach((stage) => {
      if (stage === except) return;
      stage.classList.remove("is-looking");
      stage.closest(".face")?.classList.remove("is-looking");
      stage.closest(".orb-wrap")?.classList.remove("is-looking");
      stage.querySelectorAll(".pupil").forEach((pupil) => {
        pupil.style.transform = "translate(0, 0)";
      });
    });
  };

  document.querySelectorAll("[data-gaze]").forEach((stage) => {
    if (!stage.querySelector(".gaze")) {
      stage.insertAdjacentHTML("beforeend", gazeMarkup);
    }
    const pupils = stage.querySelectorAll(".pupil");
    const look = (event) => {
      const point = event.touches ? event.touches[0] : event;
      if (!point) return;
      const box = stage.getBoundingClientRect();
      const x = ((point.clientX - box.left) / box.width - 0.5) * 2;
      const y = ((point.clientY - box.top) / box.height - 0.5) * 2;
      const px = Math.max(-1, Math.min(1, x)) * 38;
      const py = Math.max(-1, Math.min(1, y)) * 34;
      pupils.forEach((pupil) => {
        pupil.style.transform = `translate(${px}%, ${py}%)`;
      });
    };
    const setLooking = (on) => {
      stage.classList.toggle("is-looking", on);
      stage.closest(".face")?.classList.toggle("is-looking", on);
      stage.closest(".orb-wrap")?.classList.toggle("is-looking", on);
      if (!on) {
        pupils.forEach((pupil) => {
          pupil.style.transform = "translate(0, 0)";
        });
      }
    };
    if (hoverFine) {
      stage.addEventListener("pointerenter", () => setLooking(true));
      stage.addEventListener("pointermove", look);
      stage.addEventListener("pointerleave", () => setLooking(false));
    } else {
      stage.addEventListener("pointerdown", (event) => {
        event.stopPropagation();
        const next = !stage.classList.contains("is-looking");
        clearLooking();
        setLooking(next);
        if (next) look(event);
      });
    }
  });

  document.addEventListener("pointerdown", (event) => {
    if (event.target.closest("[data-gaze], [data-menu], [data-drawer]")) return;
    clearLooking();
  });

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
