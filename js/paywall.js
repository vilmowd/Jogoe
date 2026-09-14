const JOGOE_STORE = {
  price: 19,
  currency: "USD",
  product: "Jogoe Desktop License",
  /* Paste a Stripe Payment Link here to take real payments. Leave empty to use the on-site checkout. */
  stripePaymentLink: "",
  licenseKey: "jogoe.license.v1",
};

function getLicense() {
  try {
    const raw = localStorage.getItem(JOGOE_STORE.licenseKey);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

function hasLicense() {
  const license = getLicense();
  return Boolean(license && license.token && license.paid);
}

function saveLicense(payload) {
  localStorage.setItem(JOGOE_STORE.licenseKey, JSON.stringify(payload));
}

function requireLicense() {
  if (!hasLicense()) {
    window.location.replace("checkout.html");
    return false;
  }
  return true;
}

function goPay() {
  if (JOGOE_STORE.stripePaymentLink) {
    window.location.href = JOGOE_STORE.stripePaymentLink;
    return;
  }
  window.location.href = "checkout.html";
}

function mintToken(email) {
  const seed = `${email}|${Date.now()}|${Math.random().toString(36).slice(2)}`;
  return btoa(unescape(encodeURIComponent(seed))).replace(/[^A-Z0-9]/gi, "").slice(0, 20).toUpperCase();
}
