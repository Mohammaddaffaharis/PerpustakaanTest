import { Component, OnInit } from '@angular/core';
import { LaporanUserService } from '../services/laporan-user.service'
@Component({
  selector: 'app-laporan-user',
  templateUrl: './laporan-user.component.html',
  styleUrls: ['./laporan-user.component.scss']
})
export class LaporanUserComponent implements OnInit {
  listUser:[];
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
  constructor(private laporan: LaporanUserService) { }

  ngOnInit(): void {
    this.getPeminjaman();
    this.tanggal={
      tanggalPinjam:'',
      tanggalKembali:'',
    }
  }
  getPeminjaman() {
    this.laporan.getLaporanUser([]).subscribe((res: any) => {
      this.listUser = res.data.user;
      this.listHari = res.data.hari;
      this.listDenda = res.data.denda;
      this.listPeminjam = res.data.buku;
      this.totalDenda = res.data.totalDenda;
      this.totalHari = res.data.totalHari;
      console.log(res.data);
    }, (err: any) => {
        console.log(err);
    });
  }
  getPeminjamanBulan(data) {
    this.laporan.getLaporanUser(data).subscribe((res: any) => {
      this.listUser = res.data.user;
      this.listHari = res.data.hari;
      this.listDenda = res.data.denda;
      this.listPeminjam = res.data.buku;
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
    window.open("/api/print/generatePdfUser"+"?tanggalPinjam="+this.tanggal.tanggalPinjam+"&tanggalKembali="+this.tanggal.tanggalKembali);
  }

}
