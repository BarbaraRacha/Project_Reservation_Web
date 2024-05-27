import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavigationEnd, Router, RouterLink } from '@angular/router';
import { Subscription } from 'rxjs';
import { ErrorHandler } from 'app/common/error-handler.injectable';
import { JurysService } from 'app/jurys/jurys.service';
import { JurysDTO } from 'app/jurys/jurys.model';


@Component({
  selector: 'app-jurys-list',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './jurys-list.component.html'})
export class JurysListComponent implements OnInit, OnDestroy {

  jurysService = inject(JurysService);
  errorHandler = inject(ErrorHandler);
  router = inject(Router);
  juryses?: JurysDTO[];
  navigationSubscription?: Subscription;

  getMessage(key: string, details?: any) {
    const messages: Record<string, string> = {
      confirm: $localize`:@@delete.confirm:Do you really want to delete this element? This cannot be undone.`,
      deleted: $localize`:@@jurys.delete.success:Jurys was removed successfully.`    };
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
    this.jurysService.getAllJuryses()
        .subscribe({
          next: (data) => this.juryses = data,
          error: (error) => this.errorHandler.handleServerError(error.error)
        });
  }

  confirmDelete(id: number) {
    if (confirm(this.getMessage('confirm'))) {
      this.jurysService.deleteJurys(id)
          .subscribe({
            next: () => this.router.navigate(['/juryss'], {
              state: {
                msgInfo: this.getMessage('deleted')
              }
            }),
            error: (error) => this.errorHandler.handleServerError(error.error)
          });
    }
  }

}
