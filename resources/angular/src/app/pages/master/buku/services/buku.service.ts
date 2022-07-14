import { Injectable } from '@angular/core';
import { LandaService } from 'src/app/core/services/landa.service';

@Injectable({
  providedIn: 'root'
})
export class BukuService {

  constructor(private landaService: LandaService) { }
  getBuku(arrParameter) {
    return this.landaService.DataGet('/v1/buku', { arrParameter });
  }
  getBukuById(bukuId) {
    return this.landaService.DataGet('/v1/buku/' + bukuId);
  }

  createBuku(payload) {
      return this.landaService.DataPost('/v1/buku', payload);
  }

  updateBuku(payload) {
      return this.landaService.DataPut('/v1/buku', payload);
  }

  deleteBuku(bukuId) {
      return this.landaService.DataDelete('/v1/buku/' + bukuId);
  }
}
