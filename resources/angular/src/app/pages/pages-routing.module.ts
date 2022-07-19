import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LayoutComponent } from '../layouts/layout.component';
import { LaporanUserComponent } from './master/Laporan/laporan-user/components/laporan-user.component';
import { DaftarPeminjamanComponent } from './master/peminjaman/components/daftar-peminjaman/daftar-peminjaman.component';
import { LaporanBukuComponent } from './master/Laporan/laporan-buku/components/laporan-buku.component';
import { DashboardComponent } from './dashboard/dashboard.component';

const routes: Routes = [
    { path: '', redirectTo: 'home' },
    { path: 'home', component: DashboardComponent },
    { path: 'master', loadChildren: () => import('./master/master.module').then(m => m.MasterModule) },
    { path: 'laporan/laporanUsers', component: LaporanUserComponent },
    { path: 'laporan/laporanBuku', component: LaporanBukuComponent },
    { path: 'transaksi/peminjaman', component: DaftarPeminjamanComponent },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PagesRoutingModule { }
