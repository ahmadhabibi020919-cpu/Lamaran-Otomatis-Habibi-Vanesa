# Asisten Lamaran Kerja

Unggah CV dan lowongan (PDF atau gambar/PNG), teks terisi otomatis (PDF.js + OCR Tesseract di browser), lalu AI menghitung kecocokan dan menulis surat lamaran.

## Struktur
- `index.html` : halaman utama (statis)
- `netlify/functions/analyze.mjs` : penghubung ke Claude API (menyimpan API key di server)
- `netlify.toml` : konfigurasi Netlify

## Deploy lewat GitHub + Netlify (disarankan)
1. Buat repo GitHub, upload semua isi folder ini, commit.
2. Di Netlify: Add new site > Import from Git > pilih repo. Build command kosong, publish directory `.`
3. Site configuration > Environment variables > tambah `ANTHROPIC_API_KEY` (dari console.anthropic.com). Opsional: `ANTHROPIC_MODEL`.
4. Deploy ulang. Selesai.

## Catatan
- GitHub Pages saja hanya menampilkan halaman dan upload/baca file; fitur AI butuh Netlify Function di atas (API key tidak boleh ditaruh di `index.html`).
- Siapa pun yang tahu URL situs bisa memakai fungsi AI dengan kuotamu, jadi pantau pemakaian API key.
- OCR pertama kali butuh internet dan beberapa detik (mengunduh data bahasa).
