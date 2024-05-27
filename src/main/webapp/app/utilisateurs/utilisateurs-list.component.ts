import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavigationEnd, Router, RouterLink } from '@angular/router';
import { Subscription } from 'rxjs';
import { ErrorHandler } from 'app/common/error-handler.injectable';
import { UtilisateursService } from 'app/utilisateurs/utilisateurs.service';
import { UtilisateursDTO } from 'app/utilisateurs/utilisateurs.model';


@Component({
  selector: 'app-utilisateurs-list',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './utilisateurs-list.component.html'})
export class UtilisateursListComponent implements OnInit, OnDestroy {

  utilisateursService = inject(UtilisateursService);
  errorHandler = inject(ErrorHandler);
  router = inject(Router);
  utilisateurses?: UtilisateursDTO[];
  navigationSubscription?: Subscription;

  getMessage(key: string, details?: any) {
    const messages: Record<string, string> = {
      confirm: $localize`:@@delete.confirm:Do you really want to delete this element? This cannot be undone.`,
      deleted: $localize`:@@utilisateurs.delete.success:Utilisateurs was removed successfully.`,
      'utilisateurs.reservations.utilisateur.referenced': $localize`:@@utilisateurs.reservations.utilisateur.referenced:This entity is still referenced by Reservations ${details?.id} via field Utilisateur.`
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
    this.utilisateursService.getAllUtilisateurses()
        .subscribe({
          next: (data) => this.utilisateurses = data,
          error: (error) => this.errorHandler.handleServerError(error.error)
        });
  }

  confirmDelete(id: number) {
    if (confirm(this.getMessage('confirm'))) {
      this.utilisateursService.deleteUtilisateurs(id)
          .subscribe({
            next: () => this.router.navigate(['/utilisateurss'], {
              state: {
                msgInfo: this.getMessage('deleted')
              }
            }),
            error: (error) => {
              if (error.error?.code === 'REFERENCED') {
                const messageParts = error.error.message.split(',');
                this.router.navigate(['/utilisateurss'], {
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
