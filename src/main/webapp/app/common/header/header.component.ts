import { Component } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import {RouterLink, RouterOutlet} from '@angular/router';
import {AuthService} from "../../services/auth.service";
import {MatIcon} from "@angular/material/icon";
import {MatToolbar} from "@angular/material/toolbar";
import {MatButton, MatIconButton} from "@angular/material/button";
import {MatMenu, MatMenuTrigger} from "@angular/material/menu";
import {MatDrawerContainer} from "@angular/material/sidenav";
import {MatList, MatListItem} from "@angular/material/list";


@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, NgOptimizedImage, RouterLink, MatIcon, MatToolbar, MatIconButton, MatButton, MatMenuTrigger, MatMenu, MatDrawerContainer, MatList, RouterOutlet, MatListItem],
  templateUrl: './header.component.html'
})
export class HeaderComponent {
  constructor(public authService : AuthService) { }

  logout() {
    this.authService.logout();
  }
}
