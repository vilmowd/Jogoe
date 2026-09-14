document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("checkout-form");
  if (!form) return;

  if (hasLicense()) {
    window.location.replace("download.html");
    return;
  }

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const name = form.elements.namedItem("name").value.trim();
    const email = form.elements.namedItem("email").value.trim();

    if (!name || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setStatus("Enter a valid name and email so we can attach the license.");
      return;
    }
    if (JOGOE_STORE.stripePaymentLink) {
      window.location.href = JOGOE_STORE.stripePaymentLink;
      return;
    }

    const token = mintToken(email);
    saveLicense({
      paid: true,
      name,
      email,
      token,
      product: JOGOE_STORE.product,
      amount: JOGOE_STORE.price,
      at: new Date().toISOString(),
    });
    window.location.href = "download.html";
  });
});

function setStatus(text) {
  const status = document.getElementById("checkout-status");
  if (status) status.textContent = text;
}
