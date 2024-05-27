import {Component, OnInit} from '@angular/core';
import {MatCard, MatCardContent, MatCardHeader, MatCardModule} from "@angular/material/card";
import {MatFormField, MatFormFieldModule} from "@angular/material/form-field";
import {MatDatepicker, MatDatepickerModule, MatDatepickerToggle} from "@angular/material/datepicker";
import {MatOption, MatSelect, MatSelectModule} from "@angular/material/select";
import {MatOptionModule} from "@angular/material/core";
import {CommonModule} from "@angular/common";
import {FormBuilder, FormGroup, ReactiveFormsModule} from "@angular/forms";
import {ActivatedRoute} from "@angular/router";
import {ReservationsService} from "../services/reservations.service";
import {MatInput, MatInputModule} from "@angular/material/input";
import {MatProgressSpinner, MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {MatDivider, MatDividerModule} from "@angular/material/divider";
import {MatToolbar, MatToolbarModule} from "@angular/material/toolbar";
import {MatButton, MatButtonModule} from "@angular/material/button";

@Component({
  selector: 'app-new-user',
  standalone: true,
  imports: [
    MatCardModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatSelectModule,
    MatOptionModule,
    CommonModule,
    ReactiveFormsModule,
    MatInputModule,
    MatProgressSpinnerModule,
    MatDividerModule,
    MatToolbarModule,
    MatButtonModule
  ],
  templateUrl: './new-user.component.html',
  styleUrl: './new-user.component.scss'
})
export class NewUserComponent implements OnInit{
  userFormGroup!: FormGroup;
  userCode! : string;
  showProgress : boolean = false;

  constructor(private formBuilder: FormBuilder,
              private activatedRoute: ActivatedRoute,
              private reservationsService: ReservationsService) {
  }

  ngOnInit(): void {
    this.userFormGroup = this.formBuilder.group({
      nom : this.formBuilder.control(''),
      email: this.formBuilder.control(''),
    });
  }


  saveUser() {
    this.showProgress = true;
    let formData = new FormData();
    formData.set('userName', this.userFormGroup.value.nom);
    formData.set('userEmail', this. userFormGroup.value.email);
    this.reservationsService.saveUser(formData).subscribe({
      next: value => {
        this.showProgress = false;
        alert('Payment Saved Successfully !')
      },
      error: err => {
        console.log(err);
      }
    });
  }

}
