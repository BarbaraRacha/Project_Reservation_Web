import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { ReactiveFormsModule, FormControl, FormGroup } from '@angular/forms';
import { InputRowComponent } from 'app/common/input-row/input-row.component';
import { ReservationsService } from 'app/reservations/reservations.service';
import { ReservationsDTO } from 'app/reservations/reservations.model';
import { ErrorHandler } from 'app/common/error-handler.injectable';


@Component({
  selector: 'app-reservations-add',
  standalone: true,
  imports: [CommonModule, RouterLink, ReactiveFormsModule, InputRowComponent],
  templateUrl: './reservations-add.component.html'
})
export class ReservationsAddComponent implements OnInit {

  reservationsService = inject(ReservationsService);
  router = inject(Router);
  errorHandler = inject(ErrorHandler);

  utilisateurValues?: Map<number,string>;
  seanceValues?: Map<number,string>;

  addForm = new FormGroup({
    statut: new FormControl(null),
    utilisateur: new FormControl(null),
    seance: new FormControl(null)
  }, { updateOn: 'submit' });

  getMessage(key: string, details?: any) {
    const messages: Record<string, string> = {
      created: $localize`:@@reservations.create.success:Reservations was created successfully.`
    };
    return messages[key];
  }

  ngOnInit() {
    this.reservationsService.getUtilisateurValues()
        .subscribe({
          next: (data) => this.utilisateurValues = data,
          error: (error) => this.errorHandler.handleServerError(error.error)
        });
    this.reservationsService.getSeanceValues()
        .subscribe({
          next: (data) => this.seanceValues = data,
          error: (error) => this.errorHandler.handleServerError(error.error)
        });
  }

  handleSubmit() {
    window.scrollTo(0, 0);
    this.addForm.markAllAsTouched();
    if (!this.addForm.valid) {
      return;
    }
    const data = new ReservationsDTO(this.addForm.value);
    this.reservationsService.createReservations(data)
        .subscribe({
          next: () => this.router.navigate(['/reservationss'], {
            state: {
              msgSuccess: this.getMessage('created')
            }
          }),
          error: (error) => this.errorHandler.handleServerError(error.error, this.addForm, this.getMessage)
        });
  }

}
