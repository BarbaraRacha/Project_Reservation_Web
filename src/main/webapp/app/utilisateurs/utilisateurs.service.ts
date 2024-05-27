import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'environments/environment';
import { UtilisateursDTO } from 'app/utilisateurs/utilisateurs.model';


@Injectable({
  providedIn: 'root',
})
export class UtilisateursService {

  http = inject(HttpClient);
  resourcePath = environment.apiPath + '/api/utilisateurss';

  getAllUtilisateurses() {
    return this.http.get<UtilisateursDTO[]>(this.resourcePath);
  }

  getUtilisateurs(id: number) {
    return this.http.get<UtilisateursDTO>(this.resourcePath + '/' + id);
  }

  createUtilisateurs(utilisateursDTO: UtilisateursDTO) {
    return this.http.post<number>(this.resourcePath, utilisateursDTO);
  }

  updateUtilisateurs(id: number, utilisateursDTO: UtilisateursDTO) {
    return this.http.put<number>(this.resourcePath + '/' + id, utilisateursDTO);
  }

  deleteUtilisateurs(id: number) {
    return this.http.delete(this.resourcePath + '/' + id);
  }

}
