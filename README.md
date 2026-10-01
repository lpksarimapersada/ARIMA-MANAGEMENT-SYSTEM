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
`login`, `dashboard`, `students`, `sensei`, `attendance`, `billing`, `payments`, `salary`.

Jangan menyimpan password plaintext di spreadsheet.
