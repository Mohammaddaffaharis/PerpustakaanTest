<?php

namespace App\Http\Resources\Peminjaman;

use Illuminate\Http\Resources\Json\JsonResource;

class PeminjamanResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
     */
    public function toArray($request)
    {
        return [
            'id' => $this->id,
            'idUser' => $this->idUser,
            'idBuku' => $this->idBuku,
            'tanggalPinjam' => $this->tanggalPinjam,
            'tanggalKembali' => $this->tanggalKembali,
            'user'=> $this->user,
            'buku'=> $this->buku,
        ];
    }
}
