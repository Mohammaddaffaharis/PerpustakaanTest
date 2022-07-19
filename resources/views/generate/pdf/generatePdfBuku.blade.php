<!DOCTYPE html>
<html>
    <head>
		<style>
            #menu {
              font-family: Arial, Helvetica, sans-serif;
              border-collapse: collapse;
              width: 100%;
            }
            
            #menu td, #menu th {
              border: 1px solid #ddd;
              padding: 3px;
            }
            #menu th {
              padding-top: 12px;
              padding-bottom: 12px;
              text-align: left;
              background-color: #22bfef;
              color: white;
            }
        </style>
	</head>
	<body>
		{{-- @dd($data) --}}
		<table id="menu">
			<thead class="thead-light">
				<tr>
					<th colspan="11" class="align-middle" style="text-align: center;">Periode {{$_GET['tanggalPinjam']!=null ?$_GET['tanggalPinjam']:'-'}} s/d {{$_GET['tanggalKembali']!=null?$_GET['tanggalKembali']:'-'}}</th>
				</tr>
				<tr>
					<th rowspan="2" class="align-middle" style="text-align: center;">Nama Buku</th>
					<th rowspan="2" class="align-middle" style="text-align: center;">Tahun Terbit</th>
					<th rowspan="2" class="align-middle" style="text-align: center;">Penerbit</th>
					<th rowspan="2" class="align-middle" style="text-align: center;">Penulis</th>
					<th colspan="5" class="align-middle" style="text-align: center;">Peminjam</th>
					<th rowspan="2" class="align-middle" style="text-align: center;">Total Hari Pinjam</th>
					<th rowspan="2" class="align-middle" style="text-align: center;">Total Denda</th>
				</tr>
				<tr>
					<th class="align-middle" style="text-align: center;">Nama</th>
					<th class="align-middle" style="text-align: center;">Tanggal Peminjaman</th>
					<th class="align-middle" style="text-align: center;">Tanggal Pengembalian</th>
					<th class="align-middle" style="text-align: center;">Status</th>
					<th class="align-middle" style="text-align: center;">Denda</th>
				</tr>
			</thead>
			<tbody>
				@foreach ($data['peminjam'] as $i => $item)
					@foreach ($item as $j => $detail)
					<tr>
						@if ($j == 0)
						<td rowspan="{{count($item)}}" style="vertical-align: middle;">{{$data['buku'][$i]->judul}}</td>
						<td rowspan="{{count($item)}}" style="vertical-align: middle;">{{$data['buku'][$i]->tahunTerbit}}</td>
						<td rowspan="{{count($item)}}" style="vertical-align: middle;">{{$data['buku'][$i]->penerbit}}</td>
						<td rowspan="{{count($item)}}" style="vertical-align: middle;">{{$data['buku'][$i]->penulis}}</td>
						@endif
						<td>{{$detail->nama}}</td>
						<td>{{$detail->tanggalPinjam}}</td>
						<td>{{$detail->tanggalKembali!=null?$detail->tanggalKembali:'-'}}</td>
						@if ($detail->tanggalKembali != null)
							<td><span class="badge badge-pill badge-success"style="font-size:12px; vertical-align: middle;">Buku Sudah Dikembalikan</span></td>
						@else
							<td><span class="badge badge-pill badge-warning"style="font-size:12px; vertical-align: middle;">Buku Belum Dikembalikan</span></td>
						@endif
						@if ($detail->denda != null)
							<td><span class="badge badge-pill badge-danger"style="font-size:12px; vertical-align: middle;">Denda Rp. {{(number_format($detail->denda))}} (Terlambat {{$detail->hari-14}} Hari)</span></td>
						@else
							<td><span class="badge badge-pill badge-success" style="font-size:12px; vertical-align: middle;">Tidak Ada Denda</span></td>
						@endif
						@if ($j == 0)
						<td rowspan="{{count($item)}}" style="vertical-align: middle;">{{$data['hari'][$i]}} Hari</td>
						<td rowspan="{{count($item)}}" style="vertical-align: middle;">Rp. {{number_format($data['denda'][$i])}}</td>
						@endif
					</tr>
					@endforeach
				@endforeach
			</tbody>
			<tfoot>
				<tr style="font-weight: bold;">
					<td colspan="9" style="text-align: right;">Total</td>
					<td>{{$data['totalHari']}} Hari</td>
					<td>Rp.{{number_format($data['totalDenda'])}}</td>
				</tr>
			</tfoot>
		</table>
	</body>
</html>