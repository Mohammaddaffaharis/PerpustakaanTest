<?php

namespace App\Models\Master;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Repository\ModelInterface;
use App\Http\Traits\RecordSignature;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Concerns\HasRelationships;

class bukuModel extends Model implements ModelInterface
{
    use SoftDeletes, HasRelationships, HasFactory;

     /**
     * Menentukan nama tabel yang terhubung dengan Class ini
     *
     * @var string
     */
    protected $table = 'bukus';

    /**
     * Menentukan primary key, jika nama kolom primary key adalah "id",
     * langkah deklarasi ini bisa dilewati
     *
     * @var string
     */
    protected $primaryKey = 'id';

    /**
     * Akan mengisi kolom "created_at" dan "updated_at" secara otomatis,
     *
     * @var bool
     */
    public $timestamps = true;

    protected $attributes = [

    ];

    protected $fillable = [
        'judul',
        'penulis',
        'penerbit',
        'deskripsi',
        'tahunTerbit',
        'foto'
    ];

    public function getAll(array $filter, int $itemPerPage = 0, string $sort = ''): object
    {
        $buku = $this->query();

        if (!empty($filter['judul'])) {
            $buku->where('judul', 'LIKE', '%'.$filter['judul'].'%');
        }

        $sort = $sort ?: 'id DESC';
        $buku->orderByRaw($sort?: 'id DESC');
        $itemPerPage = ($itemPerPage > 0) ? $itemPerPage : $this->query()->count();  
        
        return $buku->paginate($itemPerPage)->appends('sort', $sort);
    }

    public function getById(int $id): object
    {
        return $this->find($id);
    }

    public function store(array $payload) {
        return $this->create($payload);
    }

    public function edit(array $payload, int $id) {
        return $this->find($id)->update($payload);
    }

    public function drop($id) {
        return $this->find($id)->delete();
    }
}
