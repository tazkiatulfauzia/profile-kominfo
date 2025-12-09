# DESKRIPSI PROJECT PORTAL DINAS KOMINFO BUKITTINGGI

## BAB 3 - METODOLOGI PENGEMBANGAN

### 3.1 Teknologi yang Digunakan

#### 3.1.1 Frontend Development

**Framework dan Library:**
- **React.js 19.1.1** - Framework JavaScript untuk membangun user interface yang interaktif dan dinamis
- **React Router DOM 7.8.2** - Library untuk routing dan navigasi antar halaman dalam aplikasi single-page application (SPA)
- **Vite 7.1.2** - Build tool dan development server yang cepat untuk React, menggantikan Create React App

**Styling dan UI:**
- **Tailwind CSS 4.1.12** - Utility-first CSS framework untuk styling yang cepat dan responsif
- **Lucide React 0.542.0** - Library icon modern dan ringan untuk UI components

**Data Visualization:**
- **Chart.js 4.5.0** - Library untuk membuat grafik dan chart interaktif
- **React Chart.js 2 5.3.0** - Wrapper React untuk Chart.js

**HTTP Client:**
- **Axios 1.13.2** - Library untuk melakukan HTTP requests ke backend API

**Authentication:**
- **Supabase JS 2.76.1** - Client library untuk integrasi dengan Supabase (authentication dan database)

**Development Tools:**
- **ESLint 9.33.0** - Linter untuk menjaga kualitas kode JavaScript
- **PostCSS & Autoprefixer** - Tools untuk processing CSS

#### 3.1.2 Backend Development

**Framework:**
- **Laravel** - PHP framework untuk pengembangan aplikasi web dengan arsitektur MVC (Model-View-Controller)

**Development Environment:**
- **Laragon** - Local development environment yang menyediakan:
  - Apache/Nginx web server
  - PHP runtime environment
  - MySQL database server
  - PHPMyAdmin untuk manajemen database

**Database:**
- **MySQL** - Relational database management system untuk menyimpan data aplikasi
- **PHPMyAdmin** - Web-based tool untuk mengelola database MySQL secara visual

**API:**
- **RESTful API** - Arsitektur API menggunakan metode HTTP (GET, POST, PUT, DELETE) untuk komunikasi antara frontend dan backend

### 3.2 Arsitektur Sistem

#### 3.2.1 Frontend Architecture

Aplikasi frontend dibangun menggunakan **Single Page Application (SPA)** dengan React.js. Struktur aplikasi terdiri dari:

1. **Components** - Reusable UI components (Header, Footer, Sidebar, dll)
2. **Pages** - Halaman-halaman utama aplikasi (Beranda, Berita, Aduan, Kontak, Aplikasi, Admin Dashboard)
3. **Context** - State management menggunakan React Context API (AuthContext)
4. **Lib** - Utility functions dan API client untuk komunikasi dengan backend
5. **Routing** - Menggunakan React Router untuk navigasi antar halaman

#### 3.2.2 Backend Architecture

Backend menggunakan arsitektur **MVC (Model-View-Controller)** dengan Laravel:

1. **Models** - Representasi data dan business logic (Berita, Aduan, Kontak, Aplikasi, Admin)
2. **Controllers** - Menangani HTTP requests dan responses
3. **Routes** - Definisi endpoint API
4. **Migrations** - Database schema management
5. **Middleware** - Authentication dan authorization

### 3.3 Metode Pengembangan

Pengembangan aplikasi menggunakan metode **Incremental Development** dengan tahapan:

1. **Perencanaan** - Analisis kebutuhan sistem dan perancangan database
2. **Desain** - Perancangan UI/UX dan arsitektur sistem
3. **Implementasi** - Pengembangan frontend dan backend secara paralel
4. **Testing** - Pengujian fungsionalitas dan integrasi
5. **Deployment** - Penempatan aplikasi di server

---

## BAB 4 - IMPLEMENTASI DAN PENGUJIAN

### 4.1 Implementasi Frontend

#### 4.1.1 Setup dan Konfigurasi

**Instalasi Dependencies:**
```bash
npm install
```

**Struktur Folder Frontend:**
```
src/
├── components/     # Reusable components
│   ├── Header/    # Header dan Sidebar
│   └── Footer/    # Footer component
├── pages/         # Halaman-halaman aplikasi
│   ├── Beranda.jsx
│   ├── Berita.jsx
│   ├── Aduan.jsx
│   ├── Kontak.jsx
│   ├── Aplikasi.jsx
│   ├── AdminDashboard.jsx
│   └── Account.jsx
├── context/       # React Context untuk state management
│   └── AuthContext.jsx
├── lib/          # API client dan utility functions
│   ├── apiClient.js
│   ├── berita.js
│   ├── aduan.js
│   ├── kontak.js
│   └── aplikasi.js
└── App.jsx       # Root component dengan routing
```

#### 4.1.2 Fitur-Fitur Frontend

**1. Halaman Beranda (Beranda.jsx)**
- Hero section dengan background parallax
- Menampilkan berita terbaru (3 berita)
- Menampilkan aplikasi/website resmi
- Artikel singkat dan video Bukittinggi
- Responsive design untuk mobile dan desktop

**2. Halaman Berita (Berita.jsx)**
- Filter kategori berita (Semua, Kominfo, Kota Bukittinggi)
- Card layout dengan gambar, judul, dan deskripsi
- Fitur CRUD untuk admin (Tambah, Edit, Hapus)
- Pagination dan loading states

**3. Halaman Aduan (Aduan.jsx)**
- Form pengaduan untuk user
- Tabel daftar aduan untuk admin
- Status tracking (Diajukan, Diproses, Diteruskan, Selesai)
- Edit dan hapus aduan (admin only)

**4. Halaman Kontak (Kontak.jsx)**
- Form kontak untuk user
- Tabel pesan kontak untuk admin
- Hapus pesan kontak (admin only)
- Informasi kontak dan peta lokasi

**5. Halaman Aplikasi (Aplikasi.jsx)**
- Grid layout aplikasi/website resmi
- Logo dan deskripsi aplikasi
- Link ke aplikasi eksternal
- CRUD untuk admin

**6. Admin Dashboard (AdminDashboard.jsx)**
- Statistik ringkas (Berita, Aduan, Kontak, Aplikasi)
- Grafik visualisasi data:
  - Grafik Berita: Per hari (7 hari terakhir)
  - Grafik Aduan: Per minggu (minggu dalam bulan saat ini)
  - Grafik Kontak: Per minggu (minggu dalam bulan saat ini)
  - Grafik Aplikasi: Per bulan (6 bulan terakhir)
- Sidebar navigasi khusus admin
- Card statistik yang dapat diklik untuk navigasi

**7. Authentication (AuthContext.jsx)**
- Login admin menggunakan Supabase
- Session management dengan localStorage
- Protected routes untuk halaman admin
- Logout functionality

#### 4.1.3 Styling dan Responsive Design

- Menggunakan **Tailwind CSS** untuk styling
- Utility classes untuk responsive design (sm:, md:, lg:, xl:)
- Gradient backgrounds dan hover effects
- Consistent color scheme (#003366, #0055aa, #FFB800)
- Mobile-first approach

#### 4.1.4 State Management

- **React Context API** untuk global state (authentication)
- **useState** untuk local component state
- **useEffect** untuk side effects dan data fetching

### 4.2 Implementasi Backend

#### 4.2.1 Setup Laravel

**Instalasi:**
```bash
composer create-project laravel/laravel portal-kominfo
```

**Struktur Folder Backend:**
```
app/
├── Http/
│   └── Controllers/    # API Controllers
│       ├── BeritaController.php
│       ├── AduanController.php
│       ├── KontakController.php
│       ├── AplikasiController.php
│       └── AdminController.php
├── Models/             # Eloquent Models
│   ├── Berita.php
│   ├── Aduan.php
│   ├── Kontak.php
│   ├── Aplikasi.php
│   └── Admin.php
└── ...
database/
├── migrations/         # Database migrations
└── seeders/           # Database seeders
routes/
└── api.php           # API routes
```

#### 4.2.2 Database Schema

**Tabel Berita:**
- id (primary key)
- judul
- deskripsi
- gambar (URL)
- link
- kategori (kominfo/bukittinggi)
- created_at, updated_at

**Tabel Aduan:**
- id (primary key)
- nama
- email
- no_hp
- isi_aduan
- status (diajukan/diproses/diteruskan/selesai)
- dinas_tujuan
- website
- keterangan_tindak_lanjut
- created_at, updated_at

**Tabel Kontak:**
- id (primary key)
- nama
- email
- pesan
- created_at, updated_at

**Tabel Aplikasi:**
- id (primary key)
- nama
- deskripsi
- link
- logo_url
- created_at, updated_at

**Tabel Admins:**
- id (primary key)
- user_id (UUID dari Supabase)
- email
- created_at, updated_at

#### 4.2.3 API Endpoints

**Berita:**
- GET `/api/berita` - List semua berita (dengan filter kategori)
- GET `/api/berita/beranda` - Berita untuk halaman beranda (limit 3)
- POST `/api/berita` - Tambah berita baru
- PUT `/api/berita/{id}` - Update berita
- DELETE `/api/berita/{id}` - Hapus berita

**Aduan:**
- GET `/api/aduan` - List semua aduan
- POST `/api/aduan` - Tambah aduan baru
- PUT `/api/aduan/{id}` - Update aduan
- DELETE `/api/aduan/{id}` - Hapus aduan

**Kontak:**
- GET `/api/kontak` - List semua pesan kontak
- POST `/api/kontak` - Tambah pesan kontak baru
- PUT `/api/kontak/{id}` - Update pesan kontak
- DELETE `/api/kontak/{id}` - Hapus pesan kontak

**Aplikasi:**
- GET `/api/aplikasi` - List semua aplikasi
- POST `/api/aplikasi` - Tambah aplikasi baru
- PUT `/api/aplikasi/{id}` - Update aplikasi
- DELETE `/api/aplikasi/{id}` - Hapus aplikasi

#### 4.2.4 CORS Configuration

Backend dikonfigurasi untuk mengizinkan CORS (Cross-Origin Resource Sharing) agar frontend dapat mengakses API dari domain yang berbeda.

### 4.3 Integrasi Frontend dan Backend

#### 4.3.1 API Client

Frontend menggunakan **Axios** sebagai HTTP client dengan konfigurasi base URL:

```javascript
// lib/apiClient.js
import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'http://localhost:8000/api', // Laravel API URL
  headers: {
    'Content-Type': 'application/json',
  },
});
```

#### 4.3.2 Data Flow

1. User melakukan action di frontend (contoh: submit form)
2. Frontend mengirim HTTP request ke backend API
3. Backend memproses request dan berinteraksi dengan database
4. Backend mengembalikan response (JSON)
5. Frontend menerima response dan update UI

### 4.4 Pengujian Sistem

#### 4.4.1 Pengujian Fungsionalitas

**1. Pengujian Halaman Beranda:**
- ✓ Menampilkan hero section dengan background
- ✓ Menampilkan 3 berita terbaru
- ✓ Menampilkan aplikasi/website resmi
- ✓ Responsive di berbagai ukuran layar

**2. Pengujian Halaman Berita:**
- ✓ Filter kategori berfungsi dengan benar
- ✓ CRUD berita untuk admin
- ✓ Card berita dapat diklik ke halaman detail
- ✓ Loading state saat fetch data

**3. Pengujian Halaman Aduan:**
- ✓ Form pengaduan dapat di-submit
- ✓ Admin dapat melihat daftar aduan
- ✓ Admin dapat edit dan hapus aduan
- ✓ Status aduan dapat diupdate

**4. Pengujian Halaman Kontak:**
- ✓ Form kontak dapat di-submit
- ✓ Admin dapat melihat pesan kontak
- ✓ Admin dapat hapus pesan kontak
- ✓ Peta lokasi ditampilkan dengan benar

**5. Pengujian Admin Dashboard:**
- ✓ Statistik ditampilkan dengan benar
- ✓ Grafik visualisasi data berfungsi
- ✓ Card statistik dapat diklik untuk navigasi
- ✓ Data grafik update otomatis sesuai periode

**6. Pengujian Authentication:**
- ✓ Login admin berfungsi dengan Supabase
- ✓ Protected routes hanya bisa diakses admin
- ✓ Logout mengarahkan ke halaman beranda
- ✓ Session management dengan localStorage

#### 4.4.2 Pengujian Responsive Design

- ✓ Mobile (320px - 640px): Layout menyesuaikan, sidebar menjadi hamburger menu
- ✓ Tablet (641px - 1024px): Grid layout menyesuaikan kolom
- ✓ Desktop (1025px+): Full layout dengan sidebar dan header

#### 4.4.3 Pengujian Browser Compatibility

- ✓ Google Chrome: Semua fitur berfungsi
- ✓ Mozilla Firefox: Semua fitur berfungsi
- ✓ Microsoft Edge: Semua fitur berfungsi
- ✓ Safari: Semua fitur berfungsi

### 4.5 Hasil Implementasi

Aplikasi Portal Dinas Kominfo Bukittinggi telah berhasil diimplementasikan dengan fitur-fitur:

1. **Halaman Publik:**
   - Beranda dengan informasi umum
   - Berita dengan filter kategori
   - Form pengaduan
   - Form kontak
   - Daftar aplikasi/website resmi

2. **Halaman Admin:**
   - Dashboard dengan statistik dan grafik
   - Manajemen berita (CRUD)
   - Manajemen aduan (CRUD)
   - Manajemen kontak (CRUD)
   - Manajemen aplikasi (CRUD)
   - Pengaturan akun admin

3. **Fitur Tambahan:**
   - Authentication dengan Supabase
   - Responsive design
   - Data visualization dengan Chart.js
   - Real-time data update
   - Loading states dan error handling

---

## KESIMPULAN

Aplikasi Portal Dinas Kominfo Bukittinggi telah berhasil dikembangkan menggunakan teknologi modern:

**Frontend:** React.js, Tailwind CSS, Chart.js, React Router
**Backend:** Laravel, MySQL, PHPMyAdmin
**Development Environment:** Laragon
**Authentication:** Supabase

Aplikasi ini menyediakan platform untuk publikasi informasi, pengelolaan aduan, dan manajemen konten oleh admin dengan antarmuka yang user-friendly dan responsif.

