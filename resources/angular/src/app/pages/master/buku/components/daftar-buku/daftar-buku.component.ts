import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { LandaService } from 'src/app/core/services/landa.service';
import Swal from 'sweetalert2';
import { BukuService } from '../../services/buku.service';
import { AuthService } from 'src/app/pages/auth/services/auth.service';
@Component({
  selector: 'app-daftar-buku',
  templateUrl: './daftar-buku.component.html',
  styleUrls: ['./daftar-buku.component.scss']
})
export class DaftarBukuComponent implements OnInit {
  listBuku: [];
  titleModal: string;
  modelId: number;
  userLogin;
  isAdmin:boolean;
  constructor(
    private bukuService: BukuService,
    private landaService: LandaService,
    private modalService: NgbModal,
    private authService: AuthService,
  ) { }

  ngOnInit(): void {
      this.getBuku();
      this.authService.getProfile().subscribe((user: any) => {
        this.userLogin = user;
      });
      if (this.userLogin.akses == 'user'){
        this.isAdmin = false;
      } else if (this.userLogin.akses == 'Super Admin'){
        this.isAdmin = true;
      }
  }

  trackByIndex(index: number): any {
      return index;
  }
  createBuku(modal) {
    this.titleModal = 'Tambah Buku';
    this.modelId = 0;
    this.modalService.open(modal, { size: 'lg', backdrop: 'static' });
  }
  getBuku() {
    this.bukuService.getBuku([]).subscribe((res: any) => {
        this.listBuku = res.data.list;
        console.log(this.listBuku);
    }, (err: any) => {
        console.log(err);
    });
  }
  updateBuku(modal, bukuModel) {
    console.log(bukuModel);
    this.titleModal = 'Edit Buku: ' + bukuModel.judul;
    this.modelId = bukuModel.id;
    this.modalService.open(modal, { size: 'lg', backdrop: 'static' });
  }
  deleteBuku(userId) {
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
              this.bukuService.deleteBuku(userId).subscribe((res: any) => {
                  this.landaService.alertSuccess('Berhasil', res.message);
                  this.getBuku();
              }, err => {
                  console.log(err);
              });
          }
      });
  }


}
