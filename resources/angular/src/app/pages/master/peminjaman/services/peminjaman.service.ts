import { Injectable } from '@angular/core';
import { LandaService } from 'src/app/core/services/landa.service';

@Injectable({
  providedIn: 'root'
})
export class PeminjamanService {

  constructor(private landaService: LandaService) { }
  getPeminjaman(arrParameter) {
    return this.landaService.DataGet('/v1/peminjaman', { arrParameter });
  }
  getPeminjamanById(peminjamanId) {
    return this.landaService.DataGet('/v1/peminjaman/' + peminjamanId);
  }
  getPeminjamanByUser(userId) {
    //console.log(userId);
    return this.landaService.DataGet('/v1/peminjamanUser/' + userId);
  }

  createPeminjaman(payload) {
      return this.landaService.DataPost('/v1/peminjaman', payload);
  }

  updatePeminjaman(payload) {
      return this.landaService.DataPut('/v1/peminjaman', payload);
  }

  deletePeminjaman(peminjamanId) {
      return this.landaService.DataDelete('/v1/peminjaman/' + peminjamanId);
  }
}
