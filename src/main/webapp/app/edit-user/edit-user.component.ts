import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {ReservationsService} from "../services/reservations.service";
import {FormBuilder, FormGroup, ReactiveFormsModule} from "@angular/forms";
import {NgIf} from "@angular/common";
import {MatCard, MatCardContent, MatCardModule} from "@angular/material/card";
import {MatToolbar, MatToolbarModule} from "@angular/material/toolbar";
import {MatFormField, MatFormFieldModule} from "@angular/material/form-field";
import {MatDivider, MatDividerModule} from "@angular/material/divider";
import {MatInput, MatInputModule} from "@angular/material/input";
import {MatButton, MatButtonModule} from "@angular/material/button";

@Component({
  selector: 'app-edit-user',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    NgIf,
    MatCardModule,
    MatToolbarModule,
    MatCardContent,
    MatFormFieldModule,
    MatDividerModule,
    MatInputModule,
    MatButtonModule,


  ],
  templateUrl: './edit-user.component.html',
  styleUrl: './edit-user.component.scss'
})
export class EditUserComponent implements OnInit{
  userId!: Number;
  public userFormGroup!: FormGroup;
  constructor(private activatedRoute: ActivatedRoute,
              private reservationService:ReservationsService,
              private formBuilder: FormBuilder,
              ) {
  }
  ngOnInit(): void {
    this.userId = this.activatedRoute.snapshot.params['id'];
    this.reservationService.getUserById(this.userId).subscribe(
      {
        next: user => {
          this.userFormGroup = this.formBuilder.group({
            id: this.formBuilder.control(user.id),
            name: this.formBuilder.control(user.nom),
            email: this.formBuilder.control(user.email)


          })
          console.log(user)
        }
      })
    }


  editUser() {

    let user = this.userFormGroup.value;
    this.reservationService.editUser
    (user).subscribe (
      {
        next: data => {
          console.log(data)
          alert(JSON.stringify(data))
        },
        error: err => {
          console.log(err)
        }
      }
    )

  }
}
