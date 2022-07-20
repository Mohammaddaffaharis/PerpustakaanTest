<?php

namespace App\Exports\Laporan;
use App\Models\Master\peminjamanModel;
use Maatwebsite\Excel\Concerns\FromView;
use Illuminate\Contracts\View\View;

class ExportBuku implements FromView
{
    private $BukuModel;
    private $request;
    public function __construct($request)
    {
        $this->request = $request;
        $this->BukuModel = new peminjamanModel();
    }
    public function view(): View
    {
        $data = $this->BukuModel->getAllByBuku($this->request);
        return view('generatePdfBuku',[
            'data'=>$data
        ]);
    }
}
