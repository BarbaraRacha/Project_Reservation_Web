import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { ReactiveFormsModule, FormControl, FormGroup } from '@angular/forms';
import { InputRowComponent } from 'app/common/input-row/input-row.component';
import { SeancesService } from 'app/seances/seances.service';
import { SeancesDTO } from 'app/seances/seances.model';
import { ErrorHandler } from 'app/common/error-handler.injectable';


@Component({
  selector: 'app-seances-add',
  standalone: true,
  imports: [CommonModule, RouterLink, ReactiveFormsModule, InputRowComponent],
  templateUrl: './seances-add.component.html'
})
export class SeancesAddComponent {

  seancesService = inject(SeancesService);
  router = inject(Router);
  errorHandler = inject(ErrorHandler);

  addForm = new FormGroup({
    date: new FormControl(null),
    heure: new FormControl(null),
    maxParticipants: new FormControl(null)
  }, { updateOn: 'submit' });

  getMessage(key: string, details?: any) {
    const messages: Record<string, string> = {
      created: $localize`:@@seances.create.success:Seances was created successfully.`
    };
    return messages[key];
  }

  handleSubmit() {
    window.scrollTo(0, 0);
    this.addForm.markAllAsTouched();
    if (!this.addForm.valid) {
      return;
    }
    const data = new SeancesDTO(this.addForm.value);
    this.seancesService.createSeances(data)
        .subscribe({
          next: () => this.router.navigate(['/seancess'], {
            state: {
              msgSuccess: this.getMessage('created')
            }
          }),
          error: (error) => this.errorHandler.handleServerError(error.error, this.addForm, this.getMessage)
        });
  }

}
