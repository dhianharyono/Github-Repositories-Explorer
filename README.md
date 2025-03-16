# GitHub Repositories Explorer

GitHub Repositories Explorer adalah aplikasi berbasis **React**, **Vite**, **TypeScript**, dan **Tailwind CSS** yang memungkinkan pengguna mencari repositori GitHub dengan mudah dan cepat.

## 🚀 Fitur Utama

- 🔍 **Pencarian Repositori**: Cari repositori GitHub berdasarkan nama atau kata kunci.
- 🌙 **Mode Gelap & Terang**: Tersedia fitur dark mode untuk kenyamanan pengguna.
- 📊 **Detail Repositori**: Lihat informasi penting seperti bintang ⭐, fork 🍴, dan deskripsi repositori.
- ⚡ **Performa Cepat**: Dibangun dengan **Vite** untuk pengalaman pengguna yang lebih responsif.
- 🛠 **TypeScript Ready**: Menggunakan TypeScript untuk meningkatkan keamanan dan keterbacaan kode.
- 🎨 **Tampilan Modern**: Menggunakan Tailwind CSS untuk desain yang elegan dan responsif.

## 🛠 Teknologi yang Digunakan

- [React.js](https://reactjs.org/) – Framework frontend yang cepat dan modular.
- [Vite](https://vitejs.dev/) – Build tool yang ringan dan super cepat.
- [TypeScript](https://www.typescriptlang.org/) – Superset dari JavaScript untuk kode yang lebih aman.
- [Tailwind CSS](https://tailwindcss.com/) – Framework CSS yang fleksibel dan mudah dikustomisasi.
- [GitHub API](https://docs.github.com/en/rest) – Digunakan untuk mengambil data repositori secara real-time.

## 📌 Cara Menggunakan

### 1️⃣ **Clone repository**
```sh
git clone https://github.com/dhianharyono/Github-Repositories-Explorer.git
cd Github-Repositories-Explorer
```

### 2️⃣ **Instal dependensi**
```sh
npm install
```

### 3️⃣ **Jalankan aplikasi**
```sh
npm run dev
```

### 4️⃣ **Buka di browser**
Akses aplikasi di `http://localhost:5173` (default Vite)

## 🔧 Konfigurasi Tambahan

### **Menggunakan Token GitHub (Opsional)**
GitHub memiliki batasan request API. Untuk meningkatkan batas rate limit, gunakan **GitHub Access Token**.

1. **Buat token GitHub** di [GitHub Developer Settings](https://github.com/settings/tokens).
2. **Tambahkan token ke `.env`**
   ```sh
   VITE_GITHUB_TOKEN=your_personal_access_token_here
   ```
3. **Gunakan token dalam fetch request** di aplikasi.

## 🤝 Kontribusi
Pull request dan saran perbaikan selalu diterima! Jika ingin berkontribusi:

1. **Fork** repository ini
2. **Buat branch baru** (`git checkout -b feature-anda`)
3. **Lakukan perubahan** dan commit (`git commit -m 'Menambahkan fitur X'`)
4. **Push ke branch** (`git push origin feature-anda`)
5. **Buat Pull Request**

---
💙 Dibuat dengan React + TypeScript + Tailwind CSS oleh [Dhian Haryono](https://github.com/dhianharyono)
