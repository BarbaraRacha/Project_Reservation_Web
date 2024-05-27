import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'environments/environment';
import { ReservationsDTO } from 'app/reservations/reservations.model';
import { map } from 'rxjs';
import { transformRecordToMap } from 'app/common/utils';


@Injectable({
  providedIn: 'root',
})
export class ReservationsService {

  http = inject(HttpClient);
  resourcePath = environment.apiPath + '/api/reservationss';

  getAllReservationses() {
    return this.http.get<ReservationsDTO[]>(this.resourcePath);
  }

  getReservations(id: number) {
    return this.http.get<ReservationsDTO>(this.resourcePath + '/' + id);
  }

  createReservations(reservationsDTO: ReservationsDTO) {
    return this.http.post<number>(this.resourcePath, reservationsDTO);
  }

  updateReservations(id: number, reservationsDTO: ReservationsDTO) {
    return this.http.put<number>(this.resourcePath + '/' + id, reservationsDTO);
  }

  deleteReservations(id: number) {
    return this.http.delete(this.resourcePath + '/' + id);
  }

  getUtilisateurValues() {
    return this.http.get<Record<string,number>>(this.resourcePath + '/utilisateurValues')
        .pipe(map(transformRecordToMap));
  }

  getSeanceValues() {
    return this.http.get<Record<string,number>>(this.resourcePath + '/seanceValues')
        .pipe(map(transformRecordToMap));
  }

}
