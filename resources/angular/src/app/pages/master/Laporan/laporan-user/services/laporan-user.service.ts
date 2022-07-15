import { Injectable } from '@angular/core';
import { LandaService } from 'src/app/core/services/landa.service';

@Injectable({
  providedIn: 'root'
})
export class LaporanBukuService {

  constructor(private landaService: LandaService) { }
  getLaporanUser(arrParameter) {
    return this.landaService.DataGet('/v1/laporanUser', arrParameter);
}
}
