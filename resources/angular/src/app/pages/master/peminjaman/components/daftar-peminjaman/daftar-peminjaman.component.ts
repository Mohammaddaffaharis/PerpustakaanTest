import {Component,OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { LandaService } from 'src/app/core/services/landa.service';
import Swal from 'sweetalert2';
import { PeminjamanService } from '../../services/peminjaman.service';
import { AuthService } from 'src/app/pages/auth/services/auth.service';
@Component({
  selector: 'app-daftar-peminjaman',
  templateUrl: './daftar-peminjaman.component.html',
  styleUrls: ['./daftar-peminjaman.component.scss']
})
export class DaftarPeminjamanComponent implements OnInit {

  listPeminjaman: [];
  titleModal: string;
  modelId: number;
  userLogin;
  isAdmin:boolean;
  hari: Array<{jumlah: number, denda: number}> = [];
  x:number;
  y:number;
  constructor(
    private peminjamanService: PeminjamanService,
    private landaService: LandaService,
    private modalService: NgbModal,
    private authService: AuthService,
  ) { }

  ngOnInit(): void {
    this.authService.getProfile().subscribe((user: any) => {
      this.userLogin = user;
    });
    if (this.userLogin.isAdmin == '0'){
      this.getPeminjamanUser(this.userLogin.id);
      this.isAdmin = false;
    } else if (this.userLogin.isAdmin == '1'){
      this.getPeminjaman();
      this.isAdmin = true;
    }
  }

  trackByIndex(index: number): any {
      return index;
  }
  createPeminjaman(modal) {
    this.titleModal = 'Tambah Peminjaman';
    this.modelId = 0;
    this.modalService.open(modal, { size: 'lg', backdrop: 'static' });
  }
  getPeminjaman() {
    this.peminjamanService.getPeminjaman([]).subscribe((res: any) => {
        this.listPeminjaman = res.data;
        console.log(this.listPeminjaman);
    }, (err: any) => {
        console.log(err);
    });
  }
  getPeminjamanUser(userId) {
    this.peminjamanService.getPeminjamanByUser(userId).subscribe((res: any) => {
        this.listPeminjaman = res.data;
        console.log(this.listPeminjaman);
    }, (err: any) => {
        console.log(err);
    });
  }
  updatePeminjaman(modal, bukuModel) {
    console.log(bukuModel);
    this.titleModal = 'Edit Peminjaman: '+bukuModel.nama + ' terhadap ' + bukuModel.judul;
    this.modelId = bukuModel.id;
    this.modalService.open(modal, { size: 'lg', backdrop: 'static' });
  }
  deletePeminjaman(userId) {
      Swal.fire({
          title: 'Apakah kamu yakin ?',
          text: 'Buku tidak dapat dipinjam setelah kamu hapus datanya',
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#34c38f',
          cancelButtonColor: '#f46a6a',
          confirmButtonText: 'Ya, Hapus data ini !',
      }).then((result) => {
          if (result.value) {
              this.peminjamanService.deletePeminjaman(userId).subscribe((res: any) => {
                  this.landaService.alertSuccess('Berhasil', res.message);
                  this.getPeminjaman();
              }, err => {
                  console.log(err);
              });
          }
      });
  }


}
