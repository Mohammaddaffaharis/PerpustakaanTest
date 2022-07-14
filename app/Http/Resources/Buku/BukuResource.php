<?php

namespace App\Http\Resources\Buku;

use Illuminate\Http\Resources\Json\JsonResource;

class BukuResource extends JsonResource
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
            'judul' => $this->judul,
            'deskripsi' => $this->deskripsi,
            'penulis' => $this->penulis,
            'tahunTerbit' => $this->tahunTerbit,
            'penerbit' => $this->penerbit,
            'foto' => $this->foto,
        ];
    }
}
