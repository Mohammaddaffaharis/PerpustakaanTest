<?php

namespace Database\Factories\Master;

use Illuminate\Database\Eloquent\Factories\Factory;
use App\Models\Master\bukuModel;
class BukuModelFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array
     */
    protected $model = bukuModel::class;
    
    public function definition()
    {
        return [
            'judul' => $this->faker->city(),
            'penulis' => $this->faker->name(),
            'penerbit' => $this->faker->company(),
            'deskripsi' => $this->faker->text($maxNbChars = 200),
            'tahunTerbit' => $this->faker->date($format = 'Y-m-d', $max = 'now'),
            'updated_by'=>1,
            'created_by'=>1,
        ];
    }
}
