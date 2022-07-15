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
  constructor(private laporan: LaporanBukuService) { }

  ngOnInit(): void {
    this.getPeminjaman();
  }
  getPeminjaman() {
    this.laporan.getLaporanBuku([]).subscribe((res: any) => {
      this.listBuku = res.data.buku;
      this.listHari = res.data.hari;
      this.listDenda = res.data.denda;
      this.listPeminjam = res.data.peminjam;
      console.log(res.data);
    }, (err: any) => {
        console.log(err);
    });
  }

}
