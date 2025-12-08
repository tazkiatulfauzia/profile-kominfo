<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Schema;

class AdminSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        try {
            // Cek apakah tabel admins ada
            if (!Schema::hasTable('admins')) {
                $this->command->warn('⚠️  Tabel admins tidak ditemukan. Membuat tabel...');
                $this->createAdminsTable();
            }

            // Cek struktur kolom tabel
            $columns = Schema::getColumnListing('admins');
            $this->command->info('📋 Kolom yang ada di tabel admins: ' . implode(', ', $columns));

            // Tentukan nama kolom email / nama / password
            $emailColumn = $this->findColumn($columns, ['email', 'admin_email', 'user_email', 'email_address', 'e_mail']);
            $nameColumn = $this->findColumn($columns, ['nama', 'name', 'admin_name', 'user_name', 'full_name']);
            $passwordColumn = $this->findColumn($columns, ['password', 'pass', 'admin_password', 'user_password', 'pwd'], 'password');

            if (!$emailColumn) {
                throw new \Exception('Kolom email tidak ditemukan di tabel admins. Kolom yang ada: ' . implode(', ', $columns));
            }

            // Hapus admin yang sudah ada dengan email sama
            DB::table('admins')->where($emailColumn, 'tazkiatazkia02@gmail.com')->delete();

            // Buat admin baru
            $adminData = [
                $emailColumn    => 'tazkiatazkia02@gmail.com',
                $passwordColumn => Hash::make('adminkia'),
            ];
            if ($nameColumn) {
                $adminData[$nameColumn] = 'Admin Kia';
            }

            DB::table('admins')->insert($adminData);

            $this->command->info('✅ Admin berhasil dibuat!');
            $this->command->info('📧 Email: tazkiatazkia02@gmail.com');
            $this->command->info('🔑 Password: adminkia');
            $this->command->info('📝 Kolom yang digunakan:');
            $this->command->info('   - Email: ' . $emailColumn);
            $this->command->info('   - Password: ' . $passwordColumn);
            if ($nameColumn) {
                $this->command->info('   - Nama: ' . $nameColumn);
            }
        } catch (\Exception $e) {
            $this->command->error('❌ Error: ' . $e->getMessage());
            $this->command->warn('💡 Alternatif: Buat admin manual dengan SQL atau Tinker');
            $this->command->info('   SQL: INSERT INTO admins (email, nama, password) VALUES ("tazkiatazkia02@gmail.com", "Admin Kia", "' . Hash::make('adminkia') . '")');
            throw $e;
        }
    }

    private function findColumn(array $columns, array $candidates, $default = null)
    {
        foreach ($candidates as $col) {
            if (in_array($col, $columns)) {
                return $col;
            }
        }
        return $default;
    }

    private function createAdminsTable()
    {
        DB::statement('CREATE TABLE IF NOT EXISTS admins (
            id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
            email VARCHAR(255) NOT NULL UNIQUE,
            nama VARCHAR(255) NOT NULL,
            password VARCHAR(255) NOT NULL,
            created_at TIMESTAMP NULL,
            updated_at TIMESTAMP NULL
        )');
        $this->command->info('✅ Tabel admins berhasil dibuat.');
    }
}

