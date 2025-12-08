<?php

/**
 * CONTROLLER FIXES - LENGKAP DENGAN IMPORT YANG BENAR
 * 
 * Copy method yang diperlukan ke controller masing-masing di project Laravel Anda.
 */

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\Log;

// =========================================================
// BERITA CONTROLLER METHODS
// =========================================================
class BeritaControllerMethods
{
    /**
     * Ambil berita untuk beranda (3 berita terbaru)
     * Route: GET /api/berita/beranda
     */
    public function beranda()
    {
        try {
            $berita = \App\Models\Berita::orderBy('created_at', 'desc')
                ->limit(3)
                ->get();

            return response()->json([
                'success' => true,
                'data' => $berita
            ]);
        } catch (\Exception $e) {
            Log::error('Error fetching berita beranda: ' . $e->getMessage());
            return response()->json([
                'success' => false,
                'message' => 'Gagal mengambil data berita beranda',
                'error' => config('app.debug') ? $e->getMessage() : null
            ], 500);
        }
    }

    /**
     * Simpan berita baru
     * Route: POST /api/berita
     */
    public function store(Request $request)
    {
        try {
            $validator = Validator::make($request->all(), [
                'judul' => 'required|string|max:255',
                'deskripsi' => 'required|string',
                'gambar' => 'nullable|string',
                'link' => 'nullable|string',
                'kategori' => 'nullable|string',
            ]);

            if ($validator->fails()) {
                return response()->json([
                    'success' => false,
                    'message' => 'Validation error: ' . $validator->errors()->first(),
                    'errors' => $validator->errors()
                ], 422);
            }

            $berita = \App\Models\Berita::create($request->all());

            return response()->json([
                'success' => true,
                'message' => 'Berita berhasil dibuat',
                'data' => $berita
            ], 201);
        } catch (\Exception $e) {
            Log::error('Error creating berita: ' . $e->getMessage());
            return response()->json([
                'success' => false,
                'message' => 'Terjadi kesalahan saat membuat berita',
                'error' => config('app.debug') ? $e->getMessage() : null
            ], 500);
        }
    }
}

// =========================================================
// ADUAN CONTROLLER METHODS
// =========================================================
class AduanControllerMethods
{
    // GET semua aduan (admin)
    public function index(Request $request)
    {
        try {
            $perPage = $request->get('per_page', 100);
            $page = $request->get('page', 1);

            $query = \App\Models\Aduan::orderBy('created_at', 'desc');

            if ($request->has('status') && $request->status) {
                $query->where('status', $request->status);
            }
            if ($request->has('search') && $request->search) {
                $search = $request->search;
                $query->where(function ($q) use ($search) {
                    $q->where('nama', 'LIKE', "%{$search}%")
                        ->orWhere('email', 'LIKE', "%{$search}%")
                        ->orWhere('isi_aduan', 'LIKE', "%{$search}%");
                });
            }

            $aduan = $query->paginate($perPage, ['*'], 'page', $page);

            return response()->json([
                'success' => true,
                'data' => $aduan->items(),
                'pagination' => [
                    'current_page' => $aduan->currentPage(),
                    'per_page' => $aduan->perPage(),
                    'total' => $aduan->total(),
                ]
            ]);
        } catch (\Exception $e) {
            Log::error('Error fetching aduan: ' . $e->getMessage());
            return response()->json([
                'success' => false,
                'message' => 'Gagal mengambil data aduan',
                'error' => config('app.debug') ? $e->getMessage() : null
            ], 500);
        }
    }

    // Cek status aduan (public)
    public function status(Request $request)
    {
        try {
            $nama = $request->query('nama');

            if (!$nama) {
                return response()->json([
                    'success' => false,
                    'message' => 'Parameter nama diperlukan'
                ], 400);
            }

            $columns = Schema::getColumnListing('aduan');
            $namaColumn = in_array('nama', $columns) ? 'nama'
                : (in_array('name', $columns) ? 'name' : null);

            if (!$namaColumn) {
                Log::error('Kolom nama tidak ditemukan di tabel aduan. Kolom: ' . implode(', ', $columns));
                return response()->json([
                    'success' => false,
                    'message' => 'Aduan Tidak Ditemukan, Silahkan hubungi pihak Kominfo pada halaman kontak',
                    'data' => []
                ], 404);
            }

            $aduan = \App\Models\Aduan::where($namaColumn, 'LIKE', "%{$nama}%")
                ->select($namaColumn, 'status', 'keterangan_tindak_lanjut', 'website')
                ->orderBy('created_at', 'desc')
                ->get();

            if ($aduan->isEmpty()) {
                return response()->json([
                    'success' => false,
                    'message' => 'Aduan Tidak Ditemukan, Silahkan hubungi pihak Kominfo pada halaman kontak',
                    'data' => []
                ], 404);
            }

            return response()->json([
                'success' => true,
                'data' => $aduan
            ]);
        } catch (\Exception $e) {
            Log::error('Error checking aduan status: ' . $e->getMessage());
            return response()->json([
                'success' => false,
                'message' => 'Aduan Tidak Ditemukan, Silahkan hubungi pihak Kominfo pada halaman kontak',
                'data' => []
            ], 404);
        }
    }

    // Store aduan baru (public)
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'nama' => 'required|string|max:255',
            'email' => 'required|email',
            'no_hp' => 'required|string',
            'isi_aduan' => 'required|string|min:10',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => $validator->errors()->first(),
                'errors' => $validator->errors()
            ], 422);
        }

        $columns = Schema::getColumnListing('aduan');
        $namaColumn = in_array('nama', $columns) ? 'nama'
            : (in_array('name', $columns) ? 'name' : 'nama');

        $aduan = \App\Models\Aduan::create([
            $namaColumn => $request->nama,
            'email' => $request->email,
            'no_hp' => $request->no_hp,
            'isi_aduan' => $request->isi_aduan,
            'status' => 'diajukan',
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Aduan berhasil dikirim',
            'data' => $aduan
        ], 201);
    }

    // Update tindak lanjut (admin)
    public function tindakLanjut(Request $request, $id)
    {
        $aduan = \App\Models\Aduan::find($id);

        if (!$aduan) {
            return response()->json([
                'success' => false,
                'message' => 'Aduan tidak ditemukan'
            ], 404);
        }

        $validator = Validator::make($request->all(), [
            'status' => 'sometimes|string',
            'dinas_tujuan' => 'nullable|string',
            'keterangan_tindak_lanjut' => 'nullable|string',
            'website' => 'nullable|string',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => 'Validation error',
                'errors' => $validator->errors()
            ], 422);
        }

        $aduan->update([
            'status' => $request->status ?? $aduan->status,
            'dinas_tujuan' => $request->dinas_tujuan,
            'keterangan_tindak_lanjut' => $request->keterangan_tindak_lanjut,
            'website' => $request->website,
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Tindak lanjut berhasil disimpan',
            'data' => $aduan
        ]);
    }
}

// =========================================================
// KONTAK CONTROLLER METHODS
// =========================================================
class KontakControllerMethods
{
    // Store kontak (public)
    public function store(Request $request)
    {
        try {
            $validator = Validator::make($request->all(), [
                'nama' => 'required|string|max:255',
                'email' => 'required|email',
                'pesan' => 'required|string',
            ]);

            if ($validator->fails()) {
                return response()->json([
                    'success' => false,
                    'message' => 'Validation error: ' . $validator->errors()->first(),
                    'errors' => $validator->errors()
                ], 422);
            }

            $kontak = \App\Models\Kontak::create($request->all());

            return response()->json([
                'success' => true,
                'message' => 'Pesan berhasil dikirim',
                'data' => $kontak
            ], 201);
        } catch (\Exception $e) {
            Log::error('Error creating kontak: ' . $e->getMessage());
            return response()->json([
                'success' => false,
                'message' => 'Terjadi kesalahan saat mengirim pesan',
                'error' => config('app.debug') ? $e->getMessage() : null
            ], 500);
        }
    }

    // Update kontak (admin)
    public function update(Request $request, $id)
    {
        try {
            $kontak = \App\Models\Kontak::find($id);

            if (!$kontak) {
                return response()->json([
                    'success' => false,
                    'message' => 'Kontak tidak ditemukan'
                ], 404);
            }

            $validator = Validator::make($request->all(), [
                'nama' => 'sometimes|required|string|max:255',
                'email' => 'sometimes|required|email',
                'pesan' => 'sometimes|required|string',
            ]);

            if ($validator->fails()) {
                return response()->json([
                    'success' => false,
                    'message' => 'Validation error',
                    'errors' => $validator->errors()
                ], 422);
            }

            $kontak->update($request->all());

            return response()->json([
                'success' => true,
                'message' => 'Kontak berhasil diperbarui',
                'data' => $kontak
            ]);
        } catch (\Exception $e) {
            Log::error('Error updating kontak: ' . $e->getMessage());
            return response()->json([
                'success' => false,
                'message' => 'Terjadi kesalahan saat memperbarui kontak',
                'error' => config('app.debug') ? $e->getMessage() : null
            ], 500);
        }
    }
}

// =========================================================
// APLIKASI CONTROLLER METHODS
// =========================================================
class AplikasiControllerMethods
{
    // GET semua aplikasi (public)
    public function index(Request $request)
    {
        try {
            $perPage = $request->get('per_page', 100);
            $page = $request->get('page', 1);

            $aplikasi = \App\Models\Aplikasi::orderBy('created_at', 'desc')
                ->paginate($perPage, ['*'], 'page', $page);

            return response()->json([
                'success' => true,
                'data' => $aplikasi->items(),
                'pagination' => [
                    'current_page' => $aplikasi->currentPage(),
                    'per_page' => $aplikasi->perPage(),
                    'total' => $aplikasi->total(),
                ]
            ]);
        } catch (\Exception $e) {
            Log::error('Error fetching aplikasi: ' . $e->getMessage());
            return response()->json([
                'success' => false,
                'message' => 'Terjadi kesalahan saat mengambil data aplikasi',
                'error' => config('app.debug') ? $e->getMessage() : null
            ], 500);
        }
    }
}

