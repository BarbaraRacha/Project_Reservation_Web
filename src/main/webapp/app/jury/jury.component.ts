import {Component, OnInit} from '@angular/core';
import {MatButton, MatButtonModule} from "@angular/material/button";
import {MatCard, MatCardContent, MatCardHeader, MatCardModule, MatCardTitle} from "@angular/material/card";
import {MatDivider, MatDividerModule} from "@angular/material/divider";
import {MatIcon, MatIconModule} from "@angular/material/icon";
import {CommonModule, NgForOf} from "@angular/common";
import {Jury, Utilisateur} from "../model/reservation.model";
import {
  MatCell,
  MatCellDef,
  MatColumnDef,
  MatHeaderCell,
  MatHeaderRow, MatHeaderRowDef, MatRow, MatRowDef, MatTable,
  MatTableDataSource, MatTableModule
} from "@angular/material/table";
import {ReservationsService} from "../services/reservations.service";
import {Router} from "@angular/router";
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {MatInput, MatInputModule} from "@angular/material/input";
import {MatSort, MatSortHeader, MatSortModule} from "@angular/material/sort";

@Component({
  selector: 'app-jury',
  standalone: true,
  imports: [
    MatButtonModule,
    MatCardModule,
    MatDividerModule,
    MatIconModule,
    CommonModule,
    MatCell,
    MatCellDef,
    MatColumnDef,
    MatFormField,
    MatHeaderCell,
    MatHeaderRow,
    MatHeaderRowDef,
    MatInputModule,
    MatSortModule,
    MatTableModule
  ],
  templateUrl: './jury.component.html',
  styleUrl: './jury.component.scss'
})
export class JuryComponent implements OnInit{
  jury! : Array<Jury>;
  juryDataSource! : MatTableDataSource<Jury>;
  displayedColumns : string[] = ['id', 'nom', 'seances', 'modifier','supprimer'];
  /*@ViewChild(MatPaginator) paginator! : MatPaginator;
  @ViewChild(MatSort) matSort! : MatSort;*/

  constructor(private resrvationService: ReservationsService, private router : Router) {
  }
  ngOnInit(): void {
    this.resrvationService.getAllJury()
      .subscribe({
        next : data => {
          this.jury = data;
          this.juryDataSource = new MatTableDataSource(this.jury);
          /*  this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.matSort;*/
        },
        error : err => {
          console.log(err);
        }
      });
  }

  handleEdit(jury : Jury) {

  }

  handleDelete(jury : Jury) {

  }
}
