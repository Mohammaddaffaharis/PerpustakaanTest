import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DaftarRolesComponent } from './roles/components/daftar-roles/daftar-roles.component';
import { DaftarUserComponent } from './users/components/daftar-user/daftar-user.component';
import { DaftarBukuComponent } from './buku/components/daftar-buku/daftar-buku.component';
import { DaftarPeminjamanComponent } from './peminjaman/components/daftar-peminjaman/daftar-peminjaman.component';
import { EditProfileComponent } from './users/components/edit-profile/edit-profile.component';
import { LaporanUserComponent } from './Laporan/laporan-user/components/laporan-user.component';
import { LaporanBukuComponent } from './Laporan/laporan-buku/components/laporan-buku.component';

const routes: Routes = [
    { path: 'users', component: DaftarUserComponent },
    { path: 'roles', component: DaftarRolesComponent },
    { path: 'buku', component: DaftarBukuComponent },
    { path: 'peminjaman', component: DaftarPeminjamanComponent },
    { path: 'editProfile', component: EditProfileComponent },
    { path: 'laporanUsers', component: LaporanUserComponent },
    { path: 'laporanBuku', component: LaporanBukuComponent },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class MasterRoutingModule { }
