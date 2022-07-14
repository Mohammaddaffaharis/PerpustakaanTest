<?php

namespace App\Helpers\Master;

use App\Models\Master\peminjamanModel;
use App\Repository\CrudInterface;

/**
 * Helper untuk manajemen customer
 * Mengambil data, menambah, mengubah, & menghapus ke tabel m_customer
 *
 * @author Wahyu Agung <wahyuagung26@gmail.com>
 */
class PeminjamanHelper implements CrudInterface
{
    private $peminjamanModel;

    public function __construct()
    {
        $this->peminjamanModel = new peminjamanModel();
    }

    /**
     * Mengambil data customer dari tabel m_customer
     *
     * @author Wahyu Agung <wahyuagung26@gmail.com>
     *
     * @param  array $filter
     * $filter['nama'] = string
     * $filter['email'] = string
     * @param integer $itemPerPage jumlah data yang tampil dalam 1 halaman, kosongi jika ingin menampilkan semua data
     * @param string $sort nama kolom untuk melakukan sorting mysql beserta tipenya DESC / ASC
     *
     * @return object
     */
    public function getAll(array $filter, int $itemPerPage = 0, string $sort = ''): object
    {
        return $this->peminjamanModel->getAll($filter, $itemPerPage, $sort);
    }

    /**
     * Mengambil 1 data customer dari tabel m_customer
     *
     * @param  integer $id id dari tabel m_customer
     * 
     * @return void
     */
    public function getById(int $id): object
    {
        return $this->peminjamanModel->getById($id);
    }
    public function getByUser(int $id)
    {
        //dd($id);
        return $this->peminjamanModel->getByUser($id);
    }

    /**
     * method untuk menginput data baru ke tabel m_customer
     *
     * @author Wahyu Agung <wahyuagung26@email.com>
     *
     * @param array $payload
     * $payload['nama'] = string
     * $payload['email] = string
     * $payload['is_verified] = string
     *
     * @return array
     */
    public function create(array $payload): array
    {
        try {
            $customer = $this->peminjamanModel->store($payload);
            return [
                'status' => true,
                'data' => $customer
            ];
        } catch (\Throwable $th) {
            return [
                'status' => false,
                'error' => $th->getMessage()
            ];
        }
    }

    /**
     * method untuk mengubah customer pada tabel m_customer
     *
     * @author Wahyu Agung <wahyuagung26@email.com>
     *
     * @param array $payload
     * $payload['nama'] = string
     * $payload['email] = string
     * $payload['is_verified] = boolean
     *
     * @return void
     */
    public function update(array $payload, int $id): array
    {
        try {

            $this->peminjamanModel->edit($payload, $id);

            return [
                'status' => true,
                'data' => $this->getById($id)
            ];
        } catch (\Throwable $th) {
            return [
                'status' => false,
                'error' => $th->getMessage()
            ];
        }
    }

    /**
     * Menghapus data customer dengan sistem "Soft Delete"
     * yaitu mengisi kolom deleted_at agar data tsb tidak
     * keselect waktu menggunakan Query
     *
     * @param  integer $id id dari tabel m_customer
     * @return bool
     */
    public function delete(int $id): bool
    {
        try {
            $this->peminjamanModel->drop($id);
            return true;
        } catch (\Throwable $th) {
            return false;
        }
    }
}
