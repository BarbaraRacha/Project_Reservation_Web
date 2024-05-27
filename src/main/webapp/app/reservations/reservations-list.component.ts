import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavigationEnd, Router, RouterLink } from '@angular/router';
import { Subscription } from 'rxjs';
import { ErrorHandler } from 'app/common/error-handler.injectable';
import { ReservationsService } from 'app/reservations/reservations.service';
import { ReservationsDTO } from 'app/reservations/reservations.model';


@Component({
  selector: 'app-reservations-list',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './reservations-list.component.html'})
export class ReservationsListComponent implements OnInit, OnDestroy {

  reservationsService = inject(ReservationsService);
  errorHandler = inject(ErrorHandler);
  router = inject(Router);
  reservationses?: ReservationsDTO[];
  navigationSubscription?: Subscription;

  getMessage(key: string, details?: any) {
    const messages: Record<string, string> = {
      confirm: $localize`:@@delete.confirm:Do you really want to delete this element? This cannot be undone.`,
      deleted: $localize`:@@reservations.delete.success:Reservations was removed successfully.`    };
    return messages[key];
  }

  ngOnInit() {
    this.loadData();
    this.navigationSubscription = this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.loadData();
      }
    });
  }

  ngOnDestroy() {
    this.navigationSubscription!.unsubscribe();
  }
  
  loadData() {
    this.reservationsService.getAllReservationses()
        .subscribe({
          next: (data) => this.reservationses = data,
          error: (error) => this.errorHandler.handleServerError(error.error)
        });
  }

  confirmDelete(id: number) {
    if (confirm(this.getMessage('confirm'))) {
      this.reservationsService.deleteReservations(id)
          .subscribe({
            next: () => this.router.navigate(['/reservationss'], {
              state: {
                msgInfo: this.getMessage('deleted')
              }
            }),
            error: (error) => this.errorHandler.handleServerError(error.error)
          });
    }
  }

}
