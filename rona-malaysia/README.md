# Rona Malaysia

Website edukatif bertema **Budaya Malaysia** untuk Tugas Besar IN212 Web Dasar Semester Genap 2025/2026.

## Ringkasan

- 8 halaman utama + halaman 404.
- Mobile-first dan responsif untuk ponsel, tablet, serta desktop.
- HTML, CSS, dan JavaScript murni; tidak menggunakan template siap pakai.
- Semua ilustrasi dibuat sebagai SVG lokal di dalam proyek.
- CSS dan JavaScript diletakkan pada file eksternal.
- Layout menggunakan Flexbox dan CSS Grid dengan fallback Flexbox.
- Fitur tambahan: mode gelap, pencarian, filter, modal galeri, random fact, random food, phrase explorer, text-to-speech, kuis, voting localStorage, form validation, scroll reveal, dan back-to-top.

## Struktur Folder

```text
rona-malaysia/
├── index.html
├── sejarah.html
├── warisan.html
├── kuliner.html
├── bahasa.html
├── galeri.html
├── interaktif.html
├── sumber.html
├── 404.html
├── assets/
│   ├── css/style.css
│   ├── js/data.js
│   ├── js/app.js
│   └── img/*.svg
└── docs/
    ├── FEATURE-CHECKLIST.md
    ├── GITHUB-HOSTING.md
    └── PRESENTASI.md
```

## Cara Menjalankan

### Cara termudah

Buka `index.html` langsung menggunakan Google Chrome, Mozilla Firefox, Opera, atau Microsoft Edge.

### Menggunakan local server

Di terminal, masuk ke folder proyek lalu jalankan:

```bash
python -m http.server 8000
```

Buka `http://localhost:8000` pada browser.

## Halaman

1. **Beranda** - pengantar, efek mengetik, daftar fitur, fakta acak.
2. **Sejarah** - timeline, pencarian halaman.
3. **Warisan & Seni** - songket, baju kurung, rumah Melayu, Mak Yong, kompang, Dondang Sayang.
4. **Kuliner** - filter menu dan pilihan acak.
5. **Bahasa Melayu** - dropdown frasa dan pelafalan browser.
6. **Galeri** - filter gambar dan modal.
7. **Interaktif** - kuis, voting, dan form validation.
8. **Sumber** - sitasi konten dan kredit teknis.

## Catatan Cross-Browser

- Chrome, Firefox, Opera, dan Edge mendapatkan pengalaman penuh.
- Internet Explorer/Browser lama mendapatkan layout fallback berbasis Flexbox karena CSS Grid, `position: sticky`, smooth scroll, dan speech synthesis tidak didukung penuh.
- Fitur text-to-speech memiliki pengecekan kondisi dan menampilkan pesan fallback bila tidak tersedia.
- Jangan mengandalkan Internet Explorer untuk pengujian fitur modern karena browser tersebut sudah dihentikan oleh Microsoft; pengujian tampilan dapat dilakukan dengan graceful degradation.

## Deploy

Baca `docs/GITHUB-HOSTING.md` untuk langkah GitHub dan hosting gratis melalui GitHub Pages, Netlify, atau Cloudflare Pages.

## Sumber

Lihat `sumber.html`. Konten merupakan parafrasa ringkas dari sumber resmi pemerintah Malaysia, UNESCO, Jabatan Warisan Negara, Dewan Bahasa dan Pustaka, serta Tourism Malaysia.

## Lisensi

Proyek ini dibuat untuk keperluan akademik. Nama anggota kelompok, NIM, kelas, dan identitas kampus dapat ditambahkan pada footer atau halaman sumber.
