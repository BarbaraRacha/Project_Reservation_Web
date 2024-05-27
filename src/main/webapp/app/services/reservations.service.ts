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
  public getAllReservations() : Observable<Array<Reservation>>{
    return this.httpClient.get<Array<Reservation>>(`${environment.backendHost}/api/reservations`);
  }
  public getAllSeances() : Observable<Array<Seance>>{
    return this.httpClient.get<Array<Seance>>(`${environment.backendHost}/api/seances`);
  }
  public getAllJury() : Observable<Array<Jury>>{
    return this.httpClient.get<Array<Jury>>(`${environment.backendHost}/api/jurys`);
  }
}
