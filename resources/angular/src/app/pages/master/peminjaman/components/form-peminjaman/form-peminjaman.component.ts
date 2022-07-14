import { Component, OnInit, EventEmitter, Input, Output, SimpleChange  } from '@angular/core';
import { LandaService } from 'src/app/core/services/landa.service';
import {formatDate} from '@angular/common';
import { Moment } from 'moment';
import * as moment from 'moment';
import { PeminjamanService } from '../../services/peminjaman.service';
import { UserService } from '../../../users/services/user-service.service';
import { BukuService } from '../../../buku/services/buku.service';
@Component({
  selector: 'app-form-peminjaman',
  templateUrl: './form-peminjaman.component.html',
  styleUrls: ['./form-peminjaman.component.scss']
})
export class FormPeminjamanComponent implements OnInit {
  @Input() peminjamanId: number;
  @Output() afterSave  = new EventEmitter<boolean>();
  mode: string;
  listUser: [];
  listBuku: [];
  dataUser:any;
  dataBuku:any;
  moment : Moment;
  isUpdate:boolean;
  formModel : {
    id: number,
    idUser: number,
    idBuku: number,
    tanggalPinjam:string,
    tanggalKembali:string,
    user:{
      id:number,
      namaUser:string,
    },
    buku:{
      id:number,
      namaBuku:string,
    },
};
  constructor(
    private peminjamanService: PeminjamanService,
    private bukuService: BukuService,
    private landaService: LandaService,
    private userService: UserService,
  ) { }

  ngOnInit(): void {
    this.getUser();
    this.getListBuku();
  }
  ngOnChanges(changes: SimpleChange) {
    this.emptyForm();
  }
  emptyForm(){
    this.isUpdate = false;
    this.mode = 'add';
    this.formModel = {
      id:0,
      idUser:null,
      idBuku:null,
      tanggalPinjam:null,
      tanggalKembali:null,
      user:{
        id:null,
        namaUser:null,
      },
      buku:{
        id:null,
        namaBuku:null,
      },
    }
    if (this.peminjamanId > 0) {
      this.isUpdate = true;
      this.mode = 'edit';
      this.getPeminjaman(this.peminjamanId);
    }
  }
  getUser() {
    this.userService.getUsers([]).subscribe((res: any) => {
        this.listUser = res.data.list;
    }, (err: any) => {
        console.log(err);
    });
  }
  getListBuku() {
    this.bukuService.getBuku([]).subscribe((res: any) => {
        this.listBuku = res.data.list;
    }, (err: any) => {
        console.log(err);
    });
  }
  getPeminjaman(voucherId) {
    this.peminjamanService.getPeminjamanById(voucherId).subscribe((res: any) => {
        this.formModel = res.data;
        console.log(this.formModel);
    }, err => {
        console.log(err);
    });
  }
  save() {
    var reader = new FileReader();
    this.formModel.idUser = this.formModel.user.id;
    this.formModel.idBuku = this.formModel.buku.id;
    
    if(this.mode == 'add') {
        this.formModel.tanggalKembali = null;
        this.peminjamanService.createPeminjaman(this.formModel).subscribe((res : any) => {
            this.landaService.alertSuccess('Berhasil', res.message);
            this.afterSave.emit();
        }, err => {
            this.landaService.alertError('Mohon Maaf', err.error.errors);
        });
    } else {
        
        this.peminjamanService.updatePeminjaman(this.formModel).subscribe((res : any) => {
            this.landaService.alertSuccess('Berhasil', res.message);
            this.afterSave.emit();
        }, err => {
            this.landaService.alertError('Mohon Maaf', err.error.errors);
        });
    }
  }
  trackByIndex(index: number): any {
    return index;
  }

  back() {
      this.afterSave.emit();
  }

}
