import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {Observable} from "rxjs";
import {CrossOrigin} from "@angular-devkit/build-angular";
import {Jury, Reservation, Seance, Utilisateur} from "../model/reservation.model";

@Injectable({
  providedIn: 'root'
})
export class ReservationsService {

  constructor(private httpClient : HttpClient) { }

  public getAllUsers() : Observable<Array<Utilisateur>>{
    return this.httpClient.get<Array<Utilisateur>>(`${environment.backendHost}/api/utilisateurs`);
  }
  public deleteUser(user: Utilisateur): Observable<Utilisateur> {
    return this.httpClient.delete<Utilisateur>(`${environment.backendHost}/api/utilisateurs/${user.id}`);
  }
  public getAllReservations() : Observable<Array<Reservation>>{
    return this.httpClient.get<Array<Reservation>>(`${environment.backendHost}/api/reservations`);
  }
  deleteReservation(reservation: Reservation) {
    return this.httpClient.delete<Reservation>(`${environment.backendHost}/api/reservations/${reservation.id}`);
  }
  public getAllSeances() : Observable<Array<Seance>>{
    return this.httpClient.get<Array<Seance>>(`${environment.backendHost}/api/seances`);
  }
  deleteSeance(seance: Seance) {
    return this.httpClient.delete<Seance>(`${environment.backendHost}/api/seances/${seance.id}`);
  }
  public getAllJury() : Observable<Array<Jury>>{
    return this.httpClient.get<Array<Jury>>(`${environment.backendHost}/api/jurys`);
  }


  public saveUser(formData : any) : Observable<Utilisateur>{
    return this.httpClient.post<Utilisateur>(`${environment.backendHost}/utilisateurs`,formData);
  }
}
