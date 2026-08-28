# SGB Window Cleaning

A modern, dark-themed website for SGB Window Cleaning — a local window cleaning and property care business. Built as a static site for GitHub Pages, designed to be easy to extend with new services over time.

## Stack

- Static HTML, CSS and vanilla JavaScript
- No build step, no framework
- Google Fonts (Inter + Plus Jakarta Sans)
- Hosted via GitHub Pages

## Project structure

```
.
├── index.html              # Main page
├── css/
│   └── style.css           # All styles
├── js/
│   └── main.js             # Mobile nav, header scroll, contact form
├── assets/
│   └── images/             # Hero, service, about, logo, contact icons
├── .nojekyll               # Disables Jekyll on GitHub Pages
└── README.md
```

## Running locally

Just open `index.html` in a browser, or serve the folder with any static server:

```bash
# Python
python -m http.server 8000

# Node (if installed)
npx serve .
```

Then visit `http://localhost:8000`.

## Deploying to GitHub Pages

1. Push the repo to GitHub.
2. Go to **Settings → Pages**.
3. Under **Source**, select **Deploy from a branch**.
4. Choose `master` (or `main`) and `/ (root)`.
5. Save. The site will be live at `https://<username>.github.io/<repo-name>/` within a minute or two.

The included `.nojekyll` file ensures GitHub serves the files as-is, without Jekyll processing.

## Customising the site

All the business-specific content is in three places:

| What | Where |
| --- | --- |
| Phone, email, areas, owner name | `index.html` (search for `07700 900 123`, `hello@sgbpropertycare.co.uk`, `[Town 1]`, `Sam Bennett`) and the `CONFIG` object in `js/main.js` |
| Brand colours | `css/style.css` → `:root` variables (e.g. `--accent`, `--bg`) |
| Service offerings | `index.html` → `<section class="services">` — each card is self-contained |

### Adding a new service

Copy any `<article class="service-card service-card--soon">` block in `index.html` and edit the title, description and badge. Swap the badge class from `service-badge--soon` to the default `service-badge` once it's live.

### Switching to a real form backend

The current contact form opens the user's email client (`mailto:`). To accept submissions directly:

1. Sign up at [Formspree](https://formspree.io), [Getform](https://getform.io) or [Web3Forms](https://web3forms.com) (all have free tiers).
2. Replace the `initContactForm` function in `js/main.js` with a `fetch()` POST to your endpoint.
3. Update the "form-note" text in `index.html`.

## Future enhancements

- Individual service pages (`/services/window-cleaning.html`)
- A blog for seasonal tips
- A real CMS or form backend
- Google Reviews / Trustpilot integration
- Service area map (Leaflet + OpenStreetMap)
