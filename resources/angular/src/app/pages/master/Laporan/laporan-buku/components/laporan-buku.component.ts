import { Component, OnInit } from '@angular/core';
import { LaporanBukuService } from '../services/laporan-buku.service'
@Component({
  selector: 'app-laporan-buku',
  templateUrl: './laporan-buku.component.html',
  styleUrls: ['./laporan-buku.component.scss']
})
export class LaporanBukuComponent implements OnInit {
  listBuku:[];
  listPeminjam:[];
  listHari:[];
  listDenda:[];
  date:string;
  totalHari:number;
  totalDenda:number;
  tanggal:{
    tanggalPinjam:any,
    tanggalKembali:any,
  }
  constructor(private laporan: LaporanBukuService) { }

  ngOnInit(): void {
    this.getPeminjaman();
    this.tanggal={
      tanggalPinjam:'',
      tanggalKembali:'',
    }
  }
  getPeminjaman() {
    this.laporan.getLaporanBuku([]).subscribe((res: any) => {
      this.listBuku = res.data.buku;
      this.listHari = res.data.hari;
      this.listDenda = res.data.denda;
      this.listPeminjam = res.data.peminjam;
      this.totalDenda = res.data.totalDenda;
      this.totalHari = res.data.totalHari;
      console.log(res.data);
    }, (err: any) => {
        console.log(err);
    });
  }
  getPeminjamanBulan(data) {
    this.laporan.getLaporanBuku(data).subscribe((res: any) => {
      this.listBuku = res.data.buku;
      this.listHari = res.data.hari;
      this.listDenda = res.data.denda;
      this.listPeminjam = res.data.peminjam;
      this.totalDenda = res.data.totalDenda;
      this.totalHari = res.data.totalHari;
      console.log(res.data);
    }, (err: any) => {
        console.log(err);
    });
  }
  SendDataonChangePinjam(event: any) {
    this.tanggal.tanggalPinjam = event.target.value;
    this.getPeminjamanBulan(this.tanggal);
  }
  SendDataonChangeKembali(event: any) {
    this.tanggal.tanggalKembali = event.target.value;
    this.getPeminjamanBulan(this.tanggal);
  }
  printPDF(){
    window.open("/api/print/generatePdfBuku"+"?tanggalPinjam="+this.tanggal.tanggalPinjam+"&tanggalKembali="+this.tanggal.tanggalKembali);
  }
  printXLS(){
    window.open("/api/print/generateXlsBuku"+"?tanggalPinjam="+this.tanggal.tanggalPinjam+"&tanggalKembali="+this.tanggal.tanggalKembali);
  }
    

}
