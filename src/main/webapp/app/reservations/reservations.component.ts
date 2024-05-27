import {Component, OnInit} from '@angular/core';
import {MatButton, MatButtonModule, MatFabButton} from "@angular/material/button";
import {MatCard, MatCardContent, MatCardHeader, MatCardModule, MatCardTitle} from "@angular/material/card";
import {
  MatCell,
  MatCellDef,
  MatColumnDef,
  MatHeaderCell,
  MatHeaderRow,
  MatHeaderRowDef,
  MatRow, MatRowDef, MatTable, MatTableDataSource, MatTableModule
} from "@angular/material/table";
import {MatDivider, MatDividerModule} from "@angular/material/divider";
import {MatFormField, MatFormFieldModule, MatLabel} from "@angular/material/form-field";
import {MatIcon, MatIconModule} from "@angular/material/icon";
import {MatInput, MatInputModule} from "@angular/material/input";
import {MatSort, MatSortHeader, MatSortModule} from "@angular/material/sort";
import {Reservation, Utilisateur} from "../model/reservation.model";
import {ReservationsService} from "../services/reservations.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-reservations',
  standalone: true,
  imports: [
    MatButtonModule,
    MatCardModule,
    MatDividerModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatSortModule,
    MatTableModule
  ],
  templateUrl: './reservations.component.html',
  styleUrl: './reservations.component.scss'
})
export class ReservationsComponent implements OnInit {

  reservations! : Array<Reservation>;
  reservationsDataSource! : MatTableDataSource<Reservation>;
  displayedColumns : string[] = ['id', 'statut', 'utilisateur', 'seance','modifier', 'supprimer'];
  /*@ViewChild(MatPaginator) paginator! : MatPaginator;
  @ViewChild(MatSort) matSort! : MatSort;*/

  constructor(private resrvationService: ReservationsService, private router : Router) {
  }
  ngOnInit(): void {
    this.getReservations();
  }
  getReservations(){
    this.resrvationService.getAllReservations()
      .subscribe({
        next : data => {
          this.reservations = data;
          this.reservationsDataSource = new MatTableDataSource(this.reservations);
          console.log(data);
          /*  this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.matSort;*/
        },
        error : err => {
          console.log(err);
        }
      });
  }


  handleEdit(user : Reservation) {
    this.router.navigateByUrl(`/editReservation/${user.id}`);
  }

  handleDelete(reservation : Reservation ) {
    if (confirm("Are you sure?")) {
      this.resrvationService.deleteReservation(reservation).subscribe({
        next : value  => {
          // this.getProducts();
          //this.appState.productsState.products = this.appState.productsState.products.filter((p: { id: number; })=> p.id != product.id);
          this.getReservations();
        }
      })
    }
  }
}
