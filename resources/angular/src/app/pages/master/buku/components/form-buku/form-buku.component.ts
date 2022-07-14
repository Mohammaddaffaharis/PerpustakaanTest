import {  Component, EventEmitter, Input, OnInit, Output, SimpleChange } from '@angular/core';
import { LandaService } from 'src/app/core/services/landa.service';
import { BukuService } from '../../services/buku.service';
import { ReplaySubject } from 'rxjs';
import { Observable } from 'rxjs';
@Component({
  selector: 'app-form-buku',
  templateUrl: './form-buku.component.html',
  styleUrls: ['./form-buku.component.scss']
})
export class FormBukuComponent implements OnInit {
  @Input() bukuId: number;
  @Output() afterSave  = new EventEmitter<boolean>();
  mode: string;
  oldFoto: string;
  formModel : {
    id: number,
    judul: string,
    penulis: string,
    penerbit: string,
    deskripsi: string,
    tahunTerbit: string,
    foto: string,
  }
  constructor(
    private bukuService: BukuService,
    private landaService: LandaService
  ) { }

  ngOnInit(): void {
  }
  ngOnChanges(changes: SimpleChange) {
    this.emptyForm();
  }

  emptyForm() {
      this.mode = 'add';
      this.formModel = {
          id: 0,
          judul: '',
          penulis: '',
          penerbit: '',
          deskripsi: '',
          tahunTerbit: '',
          foto: '',
      }

      if (this.bukuId > 0) {
          this.mode = 'edit';
          this.getBuku(this.bukuId);
      }
  }
  getBuku(bukuId) {
    this.bukuService.getBukuById(bukuId).subscribe((res: any) => {
        this.formModel = res.data;
        this.oldFoto = this.formModel.foto;
    }, err => {
        console.log(err);
    });
}
  onFileSelected(event) {
    this.convertFile(event.target.files[0]).subscribe(base64 => {
      this.formModel.foto = base64;
    });
  }
  convertFile(file : File) : Observable<string> {
      const result = new ReplaySubject<string>(1);
      const reader = new FileReader();
      reader.readAsBinaryString(file);
      reader.onload = (event) => result.next(btoa(event.target.result.toString()));
      return result;
  }
  save() {
    if(this.mode == 'add') {
      console.log(this.formModel);
        this.bukuService.createBuku(this.formModel).subscribe((res : any) => {
            this.landaService.alertSuccess('Berhasil', res.message);
            this.afterSave.emit();
        }, err => {
            this.landaService.alertError('Mohon Maaf', err.error.errors);
        });
    } else {
        if (this.oldFoto == this.formModel.foto ){
            this.formModel.foto = null;
        }
        this.bukuService.updateBuku(this.formModel).subscribe((res : any) => {
            console.log(this.formModel);
            this.landaService.alertSuccess('Berhasil', res.message);
            this.afterSave.emit();
        }, err => {
            this.landaService.alertError('Mohon Maaf', err.error.errors);
        });
    }
}

}
