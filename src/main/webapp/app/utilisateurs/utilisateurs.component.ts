import { Component } from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {ReservationsService} from "../services/reservations.service";
import {Router} from "@angular/router";
import {Utilisateur} from "../model/reservation.model";
import {MatIcon, MatIconModule} from "@angular/material/icon";
import {MatCard, MatCardContent, MatCardHeader, MatCardModule} from "@angular/material/card";
import {MatDivider, MatDividerModule} from "@angular/material/divider";
import {MatButton, MatButtonModule} from "@angular/material/button";
import {CommonModule} from "@angular/common";

@Component({
  selector: 'app-utilisateurs',
  standalone: true,
  imports: [
    MatIconModule,
    MatCardModule,
    MatDividerModule,
    MatButtonModule,
    CommonModule
  ],
  templateUrl: './utilisateurs.component.html',
  styleUrl: './utilisateurs.component.scss'
})
export class UtilisateursComponent {

  users! : Array<Utilisateur>;
  usersDataSource! : MatTableDataSource<Utilisateur>;
  displayedColumns : string[] = ['id', 'nom', 'email'];
  /*@ViewChild(MatPaginator) paginator! : MatPaginator;
  @ViewChild(MatSort) matSort! : MatSort;*/

  constructor(private resrvationService: ReservationsService, private router : Router) {
  }
  ngOnInit(): void {
    this.resrvationService.getAllUsers()
      .subscribe({
        next : data => {
          this.users = data;
          this.usersDataSource = new MatTableDataSource(this.users);
          /*  this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.matSort;*/
        },
        error : err => {
          console.log(err);
        }
      });
  }


}
