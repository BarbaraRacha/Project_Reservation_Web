import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'environments/environment';
import { SeancesDTO } from 'app/seances/seances.model';


@Injectable({
  providedIn: 'root',
})
export class SeancesService {

  http = inject(HttpClient);
  resourcePath = environment.apiPath + '/api/seancess';

  getAllSeanceses() {
    return this.http.get<SeancesDTO[]>(this.resourcePath);
  }

  getSeances(id: number) {
    return this.http.get<SeancesDTO>(this.resourcePath + '/' + id);
  }

  createSeances(seancesDTO: SeancesDTO) {
    return this.http.post<number>(this.resourcePath, seancesDTO);
  }

  updateSeances(id: number, seancesDTO: SeancesDTO) {
    return this.http.put<number>(this.resourcePath + '/' + id, seancesDTO);
  }

  deleteSeances(id: number) {
    return this.http.delete(this.resourcePath + '/' + id);
  }

}
