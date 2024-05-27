import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ReactiveFormsModule, FormControl, FormGroup } from '@angular/forms';
import { InputRowComponent } from 'app/common/input-row/input-row.component';
import { ReservationsService } from 'app/reservations/reservations.service';
import { ReservationsDTO } from 'app/reservations/reservations.model';
import { ErrorHandler } from 'app/common/error-handler.injectable';
import { updateForm } from 'app/common/utils';


@Component({
  selector: 'app-reservations-edit',
  standalone: true,
  imports: [CommonModule, RouterLink, ReactiveFormsModule, InputRowComponent],
  templateUrl: './reservations-edit.component.html'
})
export class ReservationsEditComponent implements OnInit {

  reservationsService = inject(ReservationsService);
  route = inject(ActivatedRoute);
  router = inject(Router);
  errorHandler = inject(ErrorHandler);

  utilisateurValues?: Map<number,string>;
  seanceValues?: Map<number,string>;
  currentId?: number;

  editForm = new FormGroup({
    id: new FormControl({ value: null, disabled: true }),
    statut: new FormControl(null),
    utilisateur: new FormControl(null),
    seance: new FormControl(null)
  }, { updateOn: 'submit' });

  getMessage(key: string, details?: any) {
    const messages: Record<string, string> = {
      updated: $localize`:@@reservations.update.success:Reservations was updated successfully.`
    };
    return messages[key];
  }

  ngOnInit() {
    this.currentId = +this.route.snapshot.params['id'];
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
    this.reservationsService.getReservations(this.currentId!)
        .subscribe({
          next: (data) => updateForm(this.editForm, data),
          error: (error) => this.errorHandler.handleServerError(error.error)
        });
  }

  handleSubmit() {
    window.scrollTo(0, 0);
    this.editForm.markAllAsTouched();
    if (!this.editForm.valid) {
      return;
    }
    const data = new ReservationsDTO(this.editForm.value);
    this.reservationsService.updateReservations(this.currentId!, data)
        .subscribe({
          next: () => this.router.navigate(['/reservationss'], {
            state: {
              msgSuccess: this.getMessage('updated')
            }
          }),
          error: (error) => this.errorHandler.handleServerError(error.error, this.editForm, this.getMessage)
        });
  }

}
