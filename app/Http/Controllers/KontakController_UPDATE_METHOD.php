<?php

namespace App\Http\Controllers;

use App\Models\Kontak;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

/**
 * Tambahkan method ini ke KontakController.php
 * Route: PUT /api/kontak/{id}
 */
class KontakController extends Controller
{
    public function update(Request $request, $id)
    {
        try {
            $kontak = Kontak::find($id);

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
            return response()->json([
                'success' => false,
                'message' => 'Terjadi kesalahan saat memperbarui kontak',
                'error' => config('app.debug') ? $e->getMessage() : null
            ], 500);
        }
    }
}

