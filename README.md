# ARIMA MANAGEMENT SYSTEM

Sistem manajemen LPKS Arima Persada dengan frontend web dan database Google Spreadsheet.

## Struktur

- `index.html` — entry point
- `login.html` — login
- `dashboard.html` — shell aplikasi
- `css/` — stylesheet
- `js/` — frontend logic dan API client
- `assets/` — logo
- `api/` — tempat backend Apps Script/endpoint
- `docs/` — dokumentasi

## Database

Spreadsheet ID:
`1xm6FqlvKLi2a2WP0vy3qfjEbCz3CggZnMxc6GcvGaA4`

## Demo

Frontend dapat dibuka langsung untuk preview UI. Demo mode menggunakan:

- ADMIN001 / admin123
- SENSEI001 / admin123
- SISWA001 / admin123

Password demo tersebut hanya untuk preview. Jangan digunakan untuk produksi.

## Produksi

Frontend perlu dihubungkan ke backend Google Apps Script melalui `js/config.js`:

```js
API_URL: "https://script.google.com/macros/s/DEPLOYMENT_ID/exec",
DEMO_MODE: false
```

Backend harus menyediakan action:
`login`, `dashboard`, `students`, `sensei`, `attendance`, `billing`, `payments`,
`finance`, dan `salary`. Action `finance` membuat sheet `FINANCE` beserta header
standarnya saat pertama kali digunakan untuk menyimpan mutasi pemasukan dan
pengeluaran.

Jangan menyimpan password plaintext di spreadsheet.


## Publish production

This ZIP is the frontend for GitHub Pages and is already configured to use the
current Google Apps Script Web App URL in `js/config.js`.

The Apps Script endpoint is configured in `js/config.js`. Backend changes in
`api/Code.gs` must be copied to the existing Apps Script project and deployed as
a new version of the existing web app deployment for new actions (including
`finance`) to become available; keep the deployment URL unchanged. Do not
replace the production backend with a different project or deployment.

After publishing/updating GitHub Pages:
1. Open `login.html`.
2. Log in with the credentials configured in the live Apps Script backend.
3. If an older cached build is open, use Ctrl+Shift+R once.
4. The current build synchronizes the login session between `arima_session` and
   `ARIMA_USER` for compatibility with older frontend builds.
