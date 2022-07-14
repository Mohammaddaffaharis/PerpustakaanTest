<?php

namespace App\Policies;

use App\Models\User\UserModel;
use App\Models\peminjaman;
use Illuminate\Auth\Access\HandlesAuthorization;

class PeminjamanPolicy
{
    use HandlesAuthorization;

    /**
     * Determine whether the user can view any models.
     *
     * @param  \App\Models\User\UserModel  $userModel
     * @return \Illuminate\Auth\Access\Response|bool
     */
    public function viewAny(UserModel $userModel)
    {
        //
    }

    /**
     * Determine whether the user can view the model.
     *
     * @param  \App\Models\User\UserModel  $userModel
     * @param  \App\Models\peminjaman  $peminjaman
     * @return \Illuminate\Auth\Access\Response|bool
     */
    public function view(UserModel $userModel, peminjaman $peminjaman)
    {
        //
    }

    /**
     * Determine whether the user can create models.
     *
     * @param  \App\Models\User\UserModel  $userModel
     * @return \Illuminate\Auth\Access\Response|bool
     */
    public function create(UserModel $userModel)
    {
        //
    }

    /**
     * Determine whether the user can update the model.
     *
     * @param  \App\Models\User\UserModel  $userModel
     * @param  \App\Models\peminjaman  $peminjaman
     * @return \Illuminate\Auth\Access\Response|bool
     */
    public function update(UserModel $userModel, peminjaman $peminjaman)
    {
        //
    }

    /**
     * Determine whether the user can delete the model.
     *
     * @param  \App\Models\User\UserModel  $userModel
     * @param  \App\Models\peminjaman  $peminjaman
     * @return \Illuminate\Auth\Access\Response|bool
     */
    public function delete(UserModel $userModel, peminjaman $peminjaman)
    {
        //
    }

    /**
     * Determine whether the user can restore the model.
     *
     * @param  \App\Models\User\UserModel  $userModel
     * @param  \App\Models\peminjaman  $peminjaman
     * @return \Illuminate\Auth\Access\Response|bool
     */
    public function restore(UserModel $userModel, peminjaman $peminjaman)
    {
        //
    }

    /**
     * Determine whether the user can permanently delete the model.
     *
     * @param  \App\Models\User\UserModel  $userModel
     * @param  \App\Models\peminjaman  $peminjaman
     * @return \Illuminate\Auth\Access\Response|bool
     */
    public function forceDelete(UserModel $userModel, peminjaman $peminjaman)
    {
        //
    }
}
