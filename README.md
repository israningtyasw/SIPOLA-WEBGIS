# SI-POLA v1.0

## Sistem Informasi Peta Online Tata Ruang dan Administrasi Kota Medan

SI-POLA merupakan aplikasi WebGIS yang dikembangkan oleh Bidang Infrastruktur dan Kewilayahan Bappeda Kota Medan untuk menyediakan informasi spasial Pola Ruang RTRW dan Batas Administrasi Kota Medan secara interaktif melalui browser.

Aplikasi ini dikembangkan sebagai media pendukung perencanaan pembangunan yang memungkinkan pengguna mengakses informasi spasial tanpa memerlukan perangkat lunak GIS desktop.

---

## Pengembang

Israningtyas, S.Si.

Perencana Ahli Pertama

Bidang Infrastruktur dan Kewilayahan

Bappeda Kota Medan

---

## Teknologi

- HTML5
- CSS3
- JavaScript
- Leaflet
- QGIS2Web
- Font Awesome

---

## Struktur Folder

index.html
→ Halaman utama aplikasi

map.html
→ Engine Leaflet hasil ekspor QGIS2Web

css/
→ Styling aplikasi

js/
→ Logika aplikasi

data/
→ Data spasial (GeoJSON)

assets/
→ Logo dan ikon

legend/
→ Legenda peta

---

## Fitur

- Loading Screen
- Search Kecamatan
- Search Kelurahan
- Popup RTRW
- Popup Kecamatan
- Popup Kelurahan
- Layer Manager
- Basemap Switcher
- Transparansi RTRW
- Lokasi Saya
- Status Bar Dinamis
- About SI-POLA

---

## Menjalankan Aplikasi

### Pengembangan

1. Buka folder menggunakan Visual Studio Code.
2. Jalankan menggunakan Live Server.
3. Akses:
http://127.0.0.1:5500

### Deployment

Salin seluruh folder aplikasi ke web server.

Pastikan file:

index.html

menjadi halaman utama.

---

## Browser yang Direkomendasikan

- Google Chrome
- Microsoft Edge

---

## Lisensi

Dokumen, source code, dan aplikasi SI-POLA digunakan untuk mendukung penyelenggaraan tugas Bappeda Kota Medan.