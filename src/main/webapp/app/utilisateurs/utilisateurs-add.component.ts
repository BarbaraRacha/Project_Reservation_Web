import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { ReactiveFormsModule, FormControl, FormGroup, Validators } from '@angular/forms';
import { InputRowComponent } from 'app/common/input-row/input-row.component';
import { UtilisateursService } from 'app/utilisateurs/utilisateurs.service';
import { UtilisateursDTO } from 'app/utilisateurs/utilisateurs.model';
import { ErrorHandler } from 'app/common/error-handler.injectable';


@Component({
  selector: 'app-utilisateurs-add',
  standalone: true,
  imports: [CommonModule, RouterLink, ReactiveFormsModule, InputRowComponent],
  templateUrl: './utilisateurs-add.component.html'
})
export class UtilisateursAddComponent {

  utilisateursService = inject(UtilisateursService);
  router = inject(Router);
  errorHandler = inject(ErrorHandler);

  addForm = new FormGroup({
    nom: new FormControl(null, [Validators.maxLength(255)]),
    email: new FormControl(null, [Validators.maxLength(255)])
  }, { updateOn: 'submit' });

  getMessage(key: string, details?: any) {
    const messages: Record<string, string> = {
      created: $localize`:@@utilisateurs.create.success:Utilisateurs was created successfully.`
    };
    return messages[key];
  }

  handleSubmit() {
    window.scrollTo(0, 0);
    this.addForm.markAllAsTouched();
    if (!this.addForm.valid) {
      return;
    }
    const data = new UtilisateursDTO(this.addForm.value);
    this.utilisateursService.createUtilisateurs(data)
        .subscribe({
          next: () => this.router.navigate(['/utilisateurss'], {
            state: {
              msgSuccess: this.getMessage('created')
            }
          }),
          error: (error) => this.errorHandler.handleServerError(error.error, this.addForm, this.getMessage)
        });
  }

}
