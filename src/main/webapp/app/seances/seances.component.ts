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
import {Reservation, Seance} from "../model/reservation.model";
import {ReservationsService} from "../services/reservations.service";
import {Router} from "@angular/router";
import {CommonModule} from "@angular/common";

@Component({
  selector: 'app-seances',
  standalone: true,
  imports: [
    MatButtonModule,
    MatCardModule,
    MatDividerModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatSortModule,
    MatTableModule,
    CommonModule
  ],
  templateUrl: './seances.component.html',
  styleUrl: './seances.component.scss'
})
export class SeancesComponent implements OnInit {
  seances! : Array<Seance>;
  seancesDataSource! : MatTableDataSource<Seance>;
  displayedColumns : string[] = ['id', 'date', 'heure', 'maxParticipants', 'jury','modifier', 'supprimer'];
  /*@ViewChild(MatPaginator) paginator! : MatPaginator;
  @ViewChild(MatSort) matSort! : MatSort;*/

  constructor(private resrvationService: ReservationsService, private router : Router) {
  }
  ngOnInit(): void {
    this.getSeances();
  }
  getSeances(){
    this.resrvationService.getAllSeances()
      .subscribe({
        next : data => {
          this.seances = data;
          this.seancesDataSource = new MatTableDataSource(this.seances);
          console.log(data);
          /*  this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.matSort;*/
        },
        error : err => {
          console.log(err);
        }
      });
  }


  handleEdit(seance : Seance) {
    this.router.navigateByUrl(`/editSeance/${seance.id}`);
  }

  handleDelete(seance : Seance ) {
    if (confirm("Are you sure?")) {
      this.resrvationService.deleteSeance(seance).subscribe({
        next : value  => {
          // this.getProducts();
          //this.appState.productsState.products = this.appState.productsState.products.filter((p: { id: number; })=> p.id != product.id);
          this.getSeances();
        }
      })
    }
  }
}
