import {Component, OnInit} from '@angular/core';
import {MatTable, MatTableDataSource, MatTableModule} from "@angular/material/table";
import {ReservationsService} from "../services/reservations.service";
import {Router, UrlSerializer} from "@angular/router";
import {Utilisateur} from "../model/reservation.model";
import {MatIcon, MatIconModule} from "@angular/material/icon";
import {MatCard, MatCardContent, MatCardHeader, MatCardModule} from "@angular/material/card";
import {MatDivider, MatDividerModule} from "@angular/material/divider";
import {MatButton, MatButtonModule} from "@angular/material/button";
import {CommonModule} from "@angular/common";
import {MatSort, MatSortModule} from "@angular/material/sort";
import {MatFormField, MatFormFieldModule, MatLabel} from "@angular/material/form-field";
import {MatInput, MatInputModule} from "@angular/material/input";

@Component({
  selector: 'app-utilisateurs',
  standalone: true,
  imports: [
    MatIconModule,
    MatCardModule,
    MatDividerModule,
    MatButtonModule,
    CommonModule,
    MatTableModule,
    MatSortModule,
    MatFormFieldModule,
    MatInputModule
  ],
  templateUrl: './utilisateurs.component.html',
  styleUrl: './utilisateurs.component.scss'
})
export class UtilisateursComponent implements OnInit{

  users! : Array<Utilisateur>;
  usersDataSource! : MatTableDataSource<Utilisateur>;
  displayedColumns : string[] = ['id', 'nom', 'email', 'modifier','supprimer'];
  /*@ViewChild(MatPaginator) paginator! : MatPaginator;
  @ViewChild(MatSort) matSort! : MatSort;*/

  constructor(private resrvationService: ReservationsService, private router : Router) {
  }
  ngOnInit(): void {
    this.getUsers();
  }
  getUsers(){
    this.resrvationService.getAllUsers()
      .subscribe({
        next : data => {
          this.users = data;
          this.usersDataSource = new MatTableDataSource(this.users);
          console.log(data);
          /*  this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.matSort;*/
        },
        error : err => {
          console.log(err);
        }
      });
  }


  handleEdit(user : Utilisateur) {
    this.router.navigateByUrl(`/editProduct/${user.id}`);
  }

  handleDelete(user : Utilisateur ) {
    if (confirm("Are you sure?")) {
      this.resrvationService.deleteUser(user).subscribe({
        next : value  => {
          // this.getProducts();
          //this.appState.productsState.products = this.appState.productsState.products.filter((p: { id: number; })=> p.id != product.id);
          this.getUsers();
        }
      })
    }
  }
}
