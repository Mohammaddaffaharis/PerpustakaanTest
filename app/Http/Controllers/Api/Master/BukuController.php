<?php

namespace App\Http\Controllers\Api\Master;
use App\Http\Controllers\Controller;
use App\Http\Requests\Buku\BukuRequest;
use Illuminate\Http\Request;
use App\Helpers\Master\BukuHelper;
use App\Http\Resources\Buku\BukuCollection;
use App\Http\Resources\Buku\BukuResource;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Storage;
class BukuController extends Controller
{
    private $buku;
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function __construct()
    {
        $this->buku = new BukuHelper();
    }

    public function index(Request $request)
    {
        $filter = ['nama' => $request->nama ?? ''];
        $listBuku = $this->buku->getAll($filter, 5, $request->sort ?? '');

        return response()->success(new BukuCollection($listBuku));
    }
    public function show($id)
    {
        $dataBuku = $this->buku->getById($id);
        //dd($dataBuku);
        if (empty($dataBuku)) {
            return response()->failed(['Data buku tidak ditemukan']);
        }

        return response()->success(new BukuResource($dataBuku));
    }
    public function store(BukuRequest $request)
    {
        if (isset($request->validator) && $request->validator->fails()) {
            return response()->failed($request->validator->errors(), 422);
        }
        
        $dataInput = $request->all();
        //dd($dataInput['foto']);
        if ($dataInput['foto']!=''){
            $image = $dataInput['foto'];
            $image = str_replace('data:image/jpg;base64,', '', $image);
            $image = str_replace(' ', '+', $image);
            $imageName = Str::random(10).'.'.'jpg';
            $dataInput['foto'] = $imageName;
            Storage::disk('public')->put($imageName, base64_decode($image));
        }
        $dataBuku = $this->buku->create($dataInput);
        
        if (!$dataBuku['status']) {
            return response()->failed($dataBuku['error'], 422);
        }

        return response()->success([], 'Data buku berhasil disimpan');
    }
    public function update(BukuRequest $request)
    {
        /**
         * Menampilkan pesan error ketika validasi gagal
         * pengaturan validasi bisa dilihat pada class app/Http/request/Customer/CustomerRequest
         */
        if (isset($request->validator) && $request->validator->fails()) {
            return response()->failed($request->validator->errors());
        }

        $dataInput = $request->all();
        if ($dataInput['foto']!=''){
            $image = $dataInput['foto'];
            $image = str_replace('data:image/jpg;base64,', '', $image);
            $image = str_replace(' ', '+', $image);
            $imageName = Str::random(10).'.'.'jpg';
            $dataInput['foto'] = $imageName;
            Storage::disk('public')->put($imageName, base64_decode($image));
        }
        $dataBuku = $this->buku->update($dataInput, $dataInput['id']);
        
        if (!$dataBuku['status']) {
            return response()->failed($dataBuku['error']);
        }

        return response()->success(new BukuResource($dataBuku['data']), 'Data buku berhasil disimpan');
    }
    public function destroy($id)
    {
        $dataBuku = $this->buku->delete($id);

        if (!$dataBuku) {
            return response()->failed(['Mohon maaf data customer tidak ditemukan']);
        }

        return response()->success($dataBuku);
    }
}
