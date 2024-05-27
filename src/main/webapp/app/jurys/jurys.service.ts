import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'environments/environment';
import { JurysDTO } from 'app/jurys/jurys.model';
import { map } from 'rxjs';
import { transformRecordToMap } from 'app/common/utils';


@Injectable({
  providedIn: 'root',
})
export class JurysService {

  http = inject(HttpClient);
  resourcePath = environment.apiPath + '/api/juryss';

  getAllJuryses() {
    return this.http.get<JurysDTO[]>(this.resourcePath);
  }

  getJurys(id: number) {
    return this.http.get<JurysDTO>(this.resourcePath + '/' + id);
  }

  createJurys(jurysDTO: JurysDTO) {
    return this.http.post<number>(this.resourcePath, jurysDTO);
  }

  updateJurys(id: number, jurysDTO: JurysDTO) {
    return this.http.put<number>(this.resourcePath + '/' + id, jurysDTO);
  }

  deleteJurys(id: number) {
    return this.http.delete(this.resourcePath + '/' + id);
  }

  getSeancesValues() {
    return this.http.get<Record<string,number>>(this.resourcePath + '/seancesValues')
        .pipe(map(transformRecordToMap));
  }

}
