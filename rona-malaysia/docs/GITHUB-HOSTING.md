# Panduan GitHub dan Hosting Gratis

## A. Membuat Repository GitHub

1. Masuk ke GitHub dan pilih **New repository**.
2. Beri nama, misalnya `rona-malaysia`.
3. Pilih **Public** agar dosen dapat melihat progres.
4. Jangan memilih template lain karena proyek sudah memiliki file sendiri.
5. Salin seluruh isi folder proyek ke repository.

## B. Upload dengan Git

Jalankan perintah berikut dari folder proyek:

```bash
git init
git add .
git commit -m "feat: membuat struktur awal website budaya Malaysia"
git branch -M main
git remote add origin https://github.com/USERNAME/rona-malaysia.git
git push -u origin main
```

Ganti `USERNAME` dengan username GitHub kelompok.

## C. Contoh Riwayat Commit Progress

```text
feat: membuat struktur dan navigasi multipage
style: menambahkan desain mobile-first dan mode gelap
feat: menambahkan halaman sejarah dan warisan
feat: menambahkan filter kuliner dan galeri modal
feat: menambahkan phrase explorer dan text to speech
feat: menambahkan kuis, voting, dan validasi form
fix: memperbaiki responsivitas tablet dan desktop
docs: menambahkan sumber, checklist, dan panduan hosting
```

Commit secara bertahap agar progres benar-benar terlihat.

## D. Hosting dengan GitHub Pages

1. Buka repository GitHub.
2. Masuk ke **Settings** → **Pages**.
3. Pada **Build and deployment**, pilih **Deploy from a branch**.
4. Pilih branch `main` dan folder `/root`.
5. Klik **Save**.
6. Tunggu proses deployment. URL biasanya berbentuk:

```text
https://USERNAME.github.io/rona-malaysia/
```

## E. Alternatif Hosting Gratis

### Netlify

1. Masuk ke Netlify.
2. Pilih **Add new site** → **Deploy manually**.
3. Drag folder proyek atau file ZIP.
4. Netlify akan memberi URL publik.

### Cloudflare Pages

1. Hubungkan akun GitHub.
2. Pilih repository proyek.
3. Framework preset: `None`.
4. Build command: kosong.
5. Output directory: `/`.
6. Jalankan deployment.

## F. Sebelum Mengirim

- Uji semua link navigasi.
- Uji ponsel dengan DevTools responsive mode.
- Uji Chrome, Firefox, dan Opera/Edge.
- Pastikan sumber dapat dibuka.
- Ganti identitas kelompok pada README/footer bila diperlukan.
- Bagikan link GitHub dan link hosting.
