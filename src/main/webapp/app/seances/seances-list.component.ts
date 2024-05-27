import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavigationEnd, Router, RouterLink } from '@angular/router';
import { Subscription } from 'rxjs';
import { ErrorHandler } from 'app/common/error-handler.injectable';
import { SeancesService } from 'app/seances/seances.service';
import { SeancesDTO } from 'app/seances/seances.model';


@Component({
  selector: 'app-seances-list',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './seances-list.component.html'})
export class SeancesListComponent implements OnInit, OnDestroy {

  seancesService = inject(SeancesService);
  errorHandler = inject(ErrorHandler);
  router = inject(Router);
  seanceses?: SeancesDTO[];
  navigationSubscription?: Subscription;

  getMessage(key: string, details?: any) {
    const messages: Record<string, string> = {
      confirm: $localize`:@@delete.confirm:Do you really want to delete this element? This cannot be undone.`,
      deleted: $localize`:@@seances.delete.success:Seances was removed successfully.`,
      'seances.reservations.seance.referenced': $localize`:@@seances.reservations.seance.referenced:This entity is still referenced by Reservations ${details?.id} via field Seance.`,
      'seances.jurys.seances.referenced': $localize`:@@seances.jurys.seances.referenced:This entity is still referenced by Jurys ${details?.id} via field Seances.`
    };
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
    this.seancesService.getAllSeanceses()
        .subscribe({
          next: (data) => this.seanceses = data,
          error: (error) => this.errorHandler.handleServerError(error.error)
        });
  }

  confirmDelete(id: number) {
    if (confirm(this.getMessage('confirm'))) {
      this.seancesService.deleteSeances(id)
          .subscribe({
            next: () => this.router.navigate(['/seancess'], {
              state: {
                msgInfo: this.getMessage('deleted')
              }
            }),
            error: (error) => {
              if (error.error?.code === 'REFERENCED') {
                const messageParts = error.error.message.split(',');
                this.router.navigate(['/seancess'], {
                  state: {
                    msgError: this.getMessage(messageParts[0], { id: messageParts[1] })
                  }
                });
                return;
              }
              this.errorHandler.handleServerError(error.error)
            }
          });
    }
  }

}
