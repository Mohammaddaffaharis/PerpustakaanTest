<?php

namespace App\Models\Master;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\User\UserModel;
use App\Models\Master\bukuModel;
use App\Repository\ModelInterface;
use App\Http\Traits\RecordSignature;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Concerns\HasRelationships;
use Illuminate\Support\Facades\DB;
class peminjamanModel extends Model implements ModelInterface
{
    use SoftDeletes, RecordSignature, HasRelationships, HasFactory;

     /**
     * Menentukan nama tabel yang terhubung dengan Class ini
     *
     * @var string
     */
    protected $table = 'peminjaman';

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
        'idUser',
        'idBuku',
        'tanggalPinjam',
        'tanggalKembali'
    ];
    public function buku()
    {
        return $this->hasOne(bukuModel::class, 'id', 'idBuku');
    }
    public function user()
    {
        return $this->hasOne(UserModel::class, 'id', 'idUser');
    }

    public function getAll(array $filter, int $itemPerPage = 0, string $sort = ''): object
    {
        $peminjaman = $this->query();

        if (!empty($filter['id'])) {
            $peminjaman->where('id', 'LIKE', '%'.$filter['id'].'%');
        }

        $sort = $sort ?: 'id DESC';
        $peminjaman->orderByRaw($sort);
        $itemPerPage = $itemPerPage > 0 ? $itemPerPage : false;
        
        return $peminjaman->paginate($itemPerPage)->appends('sort', $sort);
    }
    public function getAlls()
    {
        $peminjaman = [];
        $peminjaman =  DB::select(DB::raw("
        SELECT 
            peminjaman.id,
            peminjaman.idUser,
            peminjaman.idBuku,
            peminjaman.tanggalPinjam,
            peminjaman.tanggalKembali,
            user_auth.nama,
            bukus.judul,
            DATEDIFF(peminjaman.tanggalKembali, peminjaman.tanggalPinjam)+1 AS hari,
            IF((DATEDIFF(peminjaman.tanggalKembali, peminjaman.tanggalPinjam)+1)>14, (((DATEDIFF(peminjaman.tanggalKembali, peminjaman.tanggalPinjam))-13)*2000), null) as denda
            from peminjaman
            join user_auth on user_auth.id = peminjaman.idUser
            join bukus on bukus.id = peminjaman.idBuku
            where peminjaman.deleted_at is null;
        "));
        
        return $peminjaman;
    }

    public function getById(int $id): object
    {
        return $this->find($id);
    }
    public function getByUser(int $id)
    {
        $peminjaman = DB::select(DB::raw("
        SELECT 
            peminjaman.id,
            peminjaman.idUser,
            peminjaman.idBuku,
            peminjaman.tanggalPinjam,
            peminjaman.tanggalKembali,
            user_auth.nama,
            bukus.judul,
            DATEDIFF(peminjaman.tanggalKembali, peminjaman.tanggalPinjam)+1 AS hari,
            IF((DATEDIFF(peminjaman.tanggalKembali, peminjaman.tanggalPinjam)+1)>14, (((DATEDIFF(peminjaman.tanggalKembali, peminjaman.tanggalPinjam))-13)*2000), null) as denda
            from peminjaman
            join user_auth on user_auth.id = peminjaman.idUser
            join bukus on bukus.id = peminjaman.idBuku
            where peminjaman.deleted_at is null and peminjaman.idUser = ".$id.";
        "));
        return $peminjaman;
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
