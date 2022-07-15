import { Component, OnInit, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { LandaService } from 'src/app/core/services/landa.service';
import Swal from 'sweetalert2';
import { BukuService } from '../../services/buku.service';
import { AuthService } from 'src/app/pages/auth/services/auth.service';

import { DataTableDirective } from 'angular-datatables';
@Component({
  selector: 'app-daftar-buku',
  templateUrl: './daftar-buku.component.html',
  styleUrls: ['./daftar-buku.component.scss']
})
export class DaftarBukuComponent implements OnInit {
  @ViewChild(DataTableDirective) dtElement: DataTableDirective;
    dtInstance: Promise<DataTables.Api>;
    dtOptions: any;

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
      } else if (this.userLogin.akses == 'Super Admin' || this.userLogin.akses == 'Admin'){
        this.isAdmin = true;
      }
  }

  createBuku(modal) {
    this.titleModal = 'Tambah Buku';
    this.modelId = 0;
    this.modalService.open(modal, { size: 'lg', backdrop: 'static' });
  }
  reloadDataTable():void{
    this.dtElement.dtInstance.then((dtInstance:DataTables.Api)=>{
      dtInstance.draw();
    });
  }
  getBuku() {
    this.dtOptions = {
        serverSide: true,
        processing: true,
        ordering: false,
        pagingType: 'full_numbers',
        
        ajax: (dataTablesParameters: any, callback) => {
            const page = 
                parseInt(dataTablesParameters.start) /
                parseInt(dataTablesParameters.length)+1;
            const params = {
                page: page,
                offset: dataTablesParameters.start,
                limit: dataTablesParameters.length,
            };
            this.bukuService.getBuku(params).subscribe((res: any) => {
                this.listBuku = res.data.list;
                //this.reloadDataTable();
                callback({
                    recordsTotal: res.data.meta.total,
                    recordsFiltered: res.data.meta.total,
                    data: [],
                });
            }, (err: any) => {
                console.log(err);
            });
        },
    };
  }
  // getBuku() {
  //   this.bukuService.getBuku([]).subscribe((res: any) => {
  //       this.listBuku = res.data.list;
  //       console.log(this.listBuku);
  //   }, (err: any) => {
  //       console.log(err);
  //   });
  // }
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
                  this.reloadDataTable();
              }, err => {
                  console.log(err);
              });
          }
      });
  }


}
