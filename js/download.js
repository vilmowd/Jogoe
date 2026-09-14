document.addEventListener("DOMContentLoaded", () => {
  if (!requireLicense()) return;
  const license = getLicense();
  const who = document.getElementById("license-email");
  const key = document.getElementById("license-key");
  if (who) who.textContent = license.email;
  if (key) key.textContent = license.token;
});
