# Jogoe

Marketing site and Windows installer for **Jogoe**, a local desktop AI companion.

Live preview (open `index.html`, or serve this folder):

```bash
python -m http.server 8765
```

Then visit http://127.0.0.1:8765/

## Download

After checkout, the site unlocks [`files/JogoeSetup.exe`](files/JogoeSetup.exe). The wizard installs:

- Jogoe (desktop overlay)
- Ollama, if it is missing
- Qwen 2.5 3B (optional 7B on Full setup)

To take real card payments, paste a Stripe Payment Link into `js/paywall.js` as `stripePaymentLink`.
