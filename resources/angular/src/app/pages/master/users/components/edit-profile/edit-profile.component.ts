import { Component, Input, OnInit, Output, SimpleChange, EventEmitter} from '@angular/core';

import { LandaService } from 'src/app/core/services/landa.service';
import { RoleService } from '../../../roles/services/role-service.service';
import { UserService } from '../../services/user-service.service';
import { AuthService } from 'src/app/pages/auth/services/auth.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { ReplaySubject } from 'rxjs';
import { Observable } from 'rxjs';
@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss']
})
export class EditProfileComponent implements OnInit {
  @Output() afterSave  = new EventEmitter<boolean>();
  mode: string;
  userLogin;
  userId;
  oldFoto:string;
  formModel : {
      id: number,
      nama: string,
      foto: string,
      fotoUrl: string,
      email: string,
      password: string
  }
  constructor(
    private userService: UserService,
    private landaService: LandaService,
    private authService: AuthService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.authService.getProfile().subscribe((user: any) => {
      this.userLogin = user;
    });
    this.userId = this.userLogin.id;
    this.emptyForm();
  }
  emptyForm() {
    this.mode = 'add';
    this.formModel = {
        id: 0,
        nama: '',
        foto: '',
        fotoUrl: '',
        email: '',
        password: ''
    }

    if (this.userId > 0) {
        this.mode = 'edit';
        console.log(this.userId);
        this.getUser(this.userId);
    }
  }
  save() {
    if (this.oldFoto == this.formModel.foto ){
      this.formModel.foto = null;
    }
    this.userService.updateProfile(this.formModel).subscribe((res : any) => {
      this.authService.logout();
      this.router.navigate(['auth/login']);
      this.landaService.alertSuccess('Berhasil', res.message);
      this.afterSave.emit();
    }, err => {
      this.landaService.alertError('Mohon Maaf', err.error.errors);
  });
  }
  getUser(userId) {
    this.userService.getProfileById(userId).subscribe((res: any) => {
        this.formModel = res.data;
        this.oldFoto = this.formModel.foto;
        console.log(this.formModel);
    }, err => {
        console.log(err);
    });
  }
  hapus() {
    Swal.fire({
        title: 'Apakah kamu yakin ?',
        text: 'Kamu tidak dapat login setelah kamu menghapus datanya',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#34c38f',
        cancelButtonColor: '#f46a6a',
        confirmButtonText: 'Ya, Hapus data ini !',
    }).then((result) => {
        if (result.value) {
            this.userService.deleteProfile(this.userId).subscribe((res: any) => {
                this.authService.logout();
                this.router.navigate(['auth/login']);
                this.landaService.alertSuccess('Berhasil', res.message);
            }, err => {
                console.log(err);
            });
        }
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
  

}
