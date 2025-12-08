<?php

namespace App\Http\Controllers;

use App\Models\Berita;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

/**
 * Tambahkan method ini ke BeritaController.php
 * Route: GET /api/berita/beranda
 */
class BeritaController extends Controller
{
    public function beranda()
    {
        try {
            // Ambil 3 berita terbaru untuk ditampilkan di beranda
            $berita = Berita::orderBy('created_at', 'desc')
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
}

