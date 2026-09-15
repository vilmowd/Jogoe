# Jogoe

Marketing site and Windows installer for **Jogoe**, a local desktop AI companion.

Live preview (open `index.html`, or serve this folder):

```bash
python -m http.server 8765
```

Then visit http://127.0.0.1:8765/

## Download

After checkout, the site unlocks [`files/JogoeSetup.exe`](files/JogoeSetup.exe) (Jogoe **1.1.11**). The wizard installs:

- Jogoe (desktop overlay)
- Ollama, if it is missing

The Qwen 2.5 3B model downloads the first time you open Jogoe (optional 7B on Full setup).

To take real card payments, paste a Stripe Payment Link into `js/paywall.js` as `stripePaymentLink`.

Jogoe is a companion: chat, jokes, files, memory. It will not open Command Prompt, PowerShell, or run scripts. See the homepage section “What Jogoe can and cannot do” and the Terms.

## Legal

- [Privacy Policy](privacy.html)
- [Terms & Conditions](terms.html)
- [Accessibility](accessibility.html)
