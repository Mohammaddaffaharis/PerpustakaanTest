<?php

namespace Database\Seeders;
use \App\Models\User\UserModel;
use \App\Models\Master\bukuModel;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        $this->call([
            UserSeeder::class,
        ]);
        bukuModel::factory(30)->create();
        UserModel::factory(30)->create();
    }
}
