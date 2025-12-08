<?php

namespace App\Http\Controllers;

use App\Models\Aduan;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\Log;

/**
 * AduanController versi diperbaiki.
 * Copy method sesuai kebutuhan ke AduanController.php Anda.
 */
class AduanController extends Controller
{
    /**
     * Ambil semua aduan (admin)
     */
    public function index(Request $request)
    {
        $perPage = $request->get('per_page', 100);
        $page = $request->get('page', 1);

        $query = Aduan::orderBy('created_at', 'desc');

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
            ],
        ]);
    }

    /**
     * Cek status aduan berdasarkan nama (PUBLIC)
     */
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

            $aduan = Aduan::where($namaColumn, 'LIKE', "%{$nama}%")
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

    /**
     * Simpan aduan baru (PUBLIC)
     */
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

        $aduan = Aduan::create([
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

    /**
     * Update tindak lanjut aduan (admin)
     */
    public function tindakLanjut(Request $request, $id)
    {
        $aduan = Aduan::find($id);

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

