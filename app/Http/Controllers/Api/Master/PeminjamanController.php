<?php

namespace App\Http\Controllers\Api\Master;
use App\Http\Controllers\Controller;
use App\Helpers\Master\PeminjamanHelper;
use Illuminate\Http\Request;
use App\Http\Resources\Peminjaman\PeminjamanCollection;
use App\Http\Resources\Peminjaman\PeminjamanResource;
use App\Http\Requests\Peminjaman\PeminjamanRequest;
use App\Models\Master\peminjamanModel;

class PeminjamanController extends Controller
{
    private $peminjaman;
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function __construct()
    {
        $this->peminjaman = new PeminjamanHelper();
        $this->peminjamanModel = new peminjamanModel();
    }

    public function index(Request $request)
    {
        $filter = ['id' => $request->id ?? ''];
        //dd($filter);
        $listPeminjaman = $this->peminjaman->getAll($filter, 5, $request->sort ?? '');
        //dd($listPeminjaman);
        return response()->success(new PeminjamanCollection($listPeminjaman));
    }
    public function indexx(Request $request)
    {
        $listPeminjaman['data'] = $this->peminjamanModel->getAlls();
        return $listPeminjaman;
    }
    public function show($id)
    {
        $dataPeminjaman = $this->peminjaman->getById($id);
        //dd($dataBuku);
        if (empty($dataPeminjaman)) {
            return response()->failed(['Data buku tidak ditemukan']);
        }

        return response()->success(new PeminjamanResource($dataPeminjaman));
    }
    public function showByUser($id)
    {
        //dd($id);
        $dataPeminjaman['data'] = $this->peminjamanModel->getByUser($id);
        //dd($dataBuku);
        if (empty($dataPeminjaman)) {
            return response()->failed(['Data buku tidak ditemukan']);
        }

        return $dataPeminjaman;
    }
    public function store(PeminjamanRequest $request)
    {
        if (isset($request->validator) && $request->validator->fails()) {
            return response()->failed($request->validator->errors(), 422);
        }
        
        $dataInput = $request->all();
        $dataPeminjaman = $this->peminjaman->create($dataInput);
        
        if (!$dataPeminjaman['status']) {
            return response()->failed($dataPeminjaman['error'], 422);
        }

        return response()->success([], 'Data buku berhasil disimpan');
    }
    public function update(PeminjamanRequest $request)
    {
        /**
         * Menampilkan pesan error ketika validasi gagal
         * pengaturan validasi bisa dilihat pada class app/Http/request/Customer/CustomerRequest
         */
        if (isset($request->validator) && $request->validator->fails()) {
            return response()->failed($request->validator->errors());
        }

        $dataInput = $request->all();
        $dataPeminjaman = $this->peminjaman->update($dataInput, $dataInput['id']);
        
        if (!$dataPeminjaman['status']) {
            return response()->failed($dataPeminjaman['error']);
        }

        return response()->success(new PeminjamanResource($dataPeminjaman['data']), 'Data buku berhasil disimpan');
    }
    public function destroy($id)
    {
        $dataPeminjaman = $this->peminjaman->delete($id);

        if (!$dataPeminjaman) {
            return response()->failed(['Mohon maaf data customer tidak ditemukan']);
        }

        return response()->success($dataPeminjaman);
    }
    public function getLaporanUser(Request $request)
    {
        $listPeminjaman['data'] = $this->peminjamanModel->getAllByUser($request);
        return $listPeminjaman;

    }
    public function getLaporanBuku(Request $request)
    {
        //dd($request->tanggalKembali);
        //$request->tanggalPinjam == "null" ? null : $request->tanggalPinjam;
        //$request->tanggalKembali = $request->tanggalKembali == "null" ? "sadsad" : "hubla";
        // if($request->tanggalKembali  == "null"){
        //     "sadsad";
        // } else{
        //     "hubla";
        // };
        //dd($request->all());
        $listPeminjaman['data'] = $this->peminjamanModel->getAllByBuku($request);
        return $listPeminjaman;
    }
}
