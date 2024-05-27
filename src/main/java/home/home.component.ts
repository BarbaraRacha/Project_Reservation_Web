import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { environment } from 'environments/environment';
import { RouterLink } from '@angular/router';
import {MatCard} from "@angular/material/card";


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterLink, MatCard],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

  environment = environment;

}
