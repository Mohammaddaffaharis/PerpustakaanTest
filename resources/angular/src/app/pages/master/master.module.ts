import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import {
    NgbModule,
    NgbTooltipModule,
    NgbModalModule
} from '@ng-bootstrap/ng-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select';
import { DataTablesModule } from 'angular-datatables';

import { MasterRoutingModule } from './master-routing.module';
import { DaftarUserComponent } from './users/components/daftar-user/daftar-user.component';
import { FormUserComponent } from './users/components/form-user/form-user.component';
import { DaftarRolesComponent } from './roles/components/daftar-roles/daftar-roles.component';
import { FormRolesComponent } from './roles/components/form-roles/form-roles.component';
import { DaftarCustomerComponent } from './customers/components/daftar-customer/daftar-customer.component';
import { FormCustomerComponent } from './customers/components/form-customer/form-customer.component';
import { FormItemComponent } from './items/components/form-item/form-item.component';
import { DaftarItemComponent } from './items/components/daftar-item/daftar-item.component';
import { DaftarBukuComponent } from './buku/components/daftar-buku/daftar-buku.component';
import { FormBukuComponent } from './buku/components/form-buku/form-buku.component';
import { DaftarPeminjamanComponent } from './peminjaman/components/daftar-peminjaman/daftar-peminjaman.component';
import { FormPeminjamanComponent } from './peminjaman/components/form-peminjaman/form-peminjaman.component';
import { EditProfileComponent } from './users/components/edit-profile/edit-profile.component';
import { NgxDaterangepickerMd } from 'ngx-daterangepicker-material';
import { LaporanBukuComponent } from './Laporan/laporan-buku/components/laporan-buku.component';
import { LaporanUserComponent } from './Laporan/laporan-user/components/laporan-user.component';


@NgModule({
    declarations: [DaftarUserComponent, FormUserComponent, DaftarRolesComponent, FormRolesComponent, DaftarCustomerComponent, FormCustomerComponent, FormItemComponent, DaftarItemComponent, DaftarBukuComponent, FormBukuComponent, DaftarPeminjamanComponent, FormPeminjamanComponent,EditProfileComponent, LaporanBukuComponent, LaporanUserComponent],
    imports: [
        CommonModule,
        MasterRoutingModule,
        NgbModule,
        NgbTooltipModule,
        NgbModalModule,
        NgSelectModule,
        FormsModule,
        DataTablesModule,
        NgxDaterangepickerMd.forRoot()
    ]
})
export class MasterModule { }
