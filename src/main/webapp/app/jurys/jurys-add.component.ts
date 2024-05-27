import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { ReactiveFormsModule, FormControl, FormGroup, Validators } from '@angular/forms';
import { InputRowComponent } from 'app/common/input-row/input-row.component';
import { JurysService } from 'app/jurys/jurys.service';
import { JurysDTO } from 'app/jurys/jurys.model';
import { ErrorHandler } from 'app/common/error-handler.injectable';


@Component({
  selector: 'app-jurys-add',
  standalone: true,
  imports: [CommonModule, RouterLink, ReactiveFormsModule, InputRowComponent],
  templateUrl: './jurys-add.component.html'
})
export class JurysAddComponent implements OnInit {

  jurysService = inject(JurysService);
  router = inject(Router);
  errorHandler = inject(ErrorHandler);

  seancesValues?: Map<number,string>;

  addForm = new FormGroup({
    nom: new FormControl(null, [Validators.maxLength(255)]),
    seances: new FormControl([])
  }, { updateOn: 'submit' });

  getMessage(key: string, details?: any) {
    const messages: Record<string, string> = {
      created: $localize`:@@jurys.create.success:Jurys was created successfully.`
    };
    return messages[key];
  }

  ngOnInit() {
    this.jurysService.getSeancesValues()
        .subscribe({
          next: (data) => this.seancesValues = data,
          error: (error) => this.errorHandler.handleServerError(error.error)
        });
  }

  handleSubmit() {
    window.scrollTo(0, 0);
    this.addForm.markAllAsTouched();
    if (!this.addForm.valid) {
      return;
    }
    const data = new JurysDTO(this.addForm.value);
    this.jurysService.createJurys(data)
        .subscribe({
          next: () => this.router.navigate(['/juryss'], {
            state: {
              msgSuccess: this.getMessage('created')
            }
          }),
          error: (error) => this.errorHandler.handleServerError(error.error, this.addForm, this.getMessage)
        });
  }

}
