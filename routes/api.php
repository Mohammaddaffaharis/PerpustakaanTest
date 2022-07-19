<?php

use App\Http\Controllers\Api\User\AuthController;
use App\Http\Controllers\Api\User\RoleController;
use App\Http\Controllers\Api\User\UserController;
use App\Http\Controllers\Api\Master\CustomerController;
use App\Http\Controllers\Api\Master\ItemController;
use App\Http\Controllers\Api\Master\BukuController;
use App\Http\Controllers\Api\Master\PeminjamanController;
use App\Http\Controllers\Api\User\ProfileController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::prefix('v1')->group(function () {
    /**
     * CRUD user
     */
    Route::get('/users', [UserController::class, 'index'])->middleware(['web', 'auth.api:user_view']);
    Route::get('/users/{id}', [UserController::class, 'show'])->middleware(['web', 'auth.api:user_view']);
    Route::post('/users', [UserController::class, 'store'])->middleware(['web', 'auth.api:user_create']);
    Route::put('/users', [UserController::class, 'update'])->middleware(['web', 'auth.api:user_update']);
    Route::delete('/users/{id}', [UserController::class, 'destroy'])->middleware(['web', 'auth.api:user_delete']);
        /**
     * CRUD profile
     */
    Route::get('/profile', [ProfileController::class, 'index'])->middleware(['web', 'auth.api:profile_view']);
    Route::get('/profile/{id}', [ProfileController::class, 'show'])->middleware(['web', 'auth.api:profile_view']);
    Route::post('/profile', [ProfileController::class, 'store'])->middleware(['web', 'auth.api:profile_create']);
    Route::put('/profile', [ProfileController::class, 'update'])->middleware(['web', 'auth.api:profile_update']);
    Route::delete('/profile/{id}', [ProfileController::class, 'destroy'])->middleware(['web', 'auth.api:profile_delete']);


    /**
     * CRUD role / hak akses
     */
    Route::get('/roles', [RoleController::class, 'index'])->middleware(['web', 'auth.api:roles_view']);
    Route::get('/roles/{id}', [RoleController::class, 'show'])->middleware(['web', 'auth.api:roles_view']);
    Route::post('/roles', [RoleController::class, 'store'])->middleware(['web', 'auth.api:roles_create']);
    Route::put('/roles', [RoleController::class, 'update'])->middleware(['web', 'auth.api:roles_update']);
    Route::delete('/roles/{id}', [RoleController::class, 'destroy'])->middleware(['web', 'auth.api:roles_delete']);

    /**
     * CRUD Buku
     */
    Route::get('/buku', [BukuController::class, 'index'])->middleware(['web', 'auth.api:buku_view']);
    Route::get('/buku/{id}', [BukuController::class, 'show'])->middleware(['web', 'auth.api:buku_view']);
    Route::post('/buku', [BukuController::class, 'store'])->middleware(['web', 'auth.api:buku_create']);
    Route::put('/buku', [BukuController::class, 'update'])->middleware(['web', 'auth.api:buku_update']);
    Route::delete('/buku/{id}', [BukuController::class, 'destroy'])->middleware(['web', 'auth.api:buku_delete']);
    /**
     * CRUD Peminjaman
     */
    Route::get('/peminjaman', [PeminjamanController::class, 'indexx'])->middleware(['web', 'auth.api:peminjaman_view']);
    Route::get('/peminjaman/{id}', [PeminjamanController::class, 'show'])->middleware(['web', 'auth.api:peminjaman_view']);
    Route::get('/peminjamanUser/{id}', [PeminjamanController::class, 'showByUser'])->middleware(['web', 'auth.api:peminjaman_view']);
    Route::post('/peminjaman', [PeminjamanController::class, 'store'])->middleware(['web', 'auth.api:peminjaman_create']);
    Route::put('/peminjaman', [PeminjamanController::class, 'update'])->middleware(['web', 'auth.api:peminjaman_update']);
    Route::delete('/peminjaman/{id}', [PeminjamanController::class, 'destroy'])->middleware(['web', 'auth.api:peminjaman_delete']);

    /**
     * Read Laporan
     */
    Route::get('/laporanUser', [PeminjamanController::class, 'getLaporanUser'])->middleware(['web', 'auth.api:laporanUser_view']);
    Route::get('/laporanBuku', [PeminjamanController::class, 'getLaporanBuku'])->middleware(['web', 'auth.api:laporanBuku_view']);
    /**
     * Route khusus authentifikasi
     */
    Route::prefix('auth')->group(function () {
        Route::post('/login', [AuthController::class, 'login']);
        Route::post('/logout', [AuthController::class, 'logout']);
        Route::get('/profile', [AuthController::class, 'profile'])->middleware(['auth.api']);
        Route::get('/csrf', [AuthController::class, 'csrf'])->middleware(['web']);
    });

});

Route::get('/', function () {
    return response()->failed(['Endpoint yang anda minta tidak tersedia']);
});

/**
 * Jika Frontend meminta request endpoint API yang tidak terdaftar
 * maka akan menampilkan HTTP 404
 */
Route::fallback(function () {
    return response()->failed(['Endpoint yang anda minta tidak tersedia']);
});