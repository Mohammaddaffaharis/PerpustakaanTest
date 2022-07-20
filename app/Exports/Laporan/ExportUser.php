<?php

namespace App\Exports\Laporan;
use App\Models\Master\peminjamanModel;
use Maatwebsite\Excel\Concerns\FromView;
use Illuminate\Contracts\View\View;

class ExportUser implements FromView
{
    private $userModel;
    private $request;
    public function __construct($request)
    {
        $this->request = $request;
        $this->userModel = new peminjamanModel();
    }
    public function view(): View
    {
        $data = $this->userModel->getAllByUser($this->request);
        return view('generatePdfUser',[
            'data'=>$data
        ]);
    }
}
