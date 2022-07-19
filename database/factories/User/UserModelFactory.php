<?php

namespace Database\Factories\User;
use Illuminate\Database\Eloquent\Factories\Factory;
use App\Models\User\UserModel;
use Illuminate\Support\Facades\Hash;

class UserModelFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array
     */
    protected $model = UserModel::class;
    public function definition()
    {
        return [
            'nama' => $this->faker->name(),
            'email' => $this->faker->unique()->email(),
            'password' => Hash::make('123123'),
            'user_roles_id' => 2,
            'updated_security' => date('Y-m-d H:i:s'),
        ];
    }
}
