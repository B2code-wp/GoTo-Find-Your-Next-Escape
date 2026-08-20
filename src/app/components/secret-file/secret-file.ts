import { Component } from '@angular/core';
import { MatIcon } from "@angular/material/icon";
import { MatCardContent, MatCard, MatCardHeader, MatCardTitle } from "@angular/material/card";
import { MatToolbar } from "@angular/material/toolbar";
import { Router, RouterLink } from '@angular/router';
import { MenuController } from '@ionic/angular';
import { SKILLS_DATA } from './model.js';
import { IonHeader } from "@ionic/angular/standalone";


@Component({
  selector: 'app-secret-file',
  imports: [MatIcon, MatCardContent, MatCard, RouterLink,
    MatCardHeader, MatCardTitle, MatToolbar, IonHeader],
  templateUrl: './secret-file.html',
  styleUrl: './secret-file.scss',
})
export class SecretFile {
skills = SKILLS_DATA;
  isLoggedIn = false;
  isMenuOpen = false;

  constructor(
    private menuCtrl: MenuController,
    private router: Router
  ) {}

  closeMenu(): void {
    this.menuCtrl.close();
  }

  toggleMenu(): void {
    this.isMenuOpen = !this.isMenuOpen;
    this.isMenuOpen ? this.menuCtrl.open() : this.menuCtrl.close();
  }

  onSubmit(): void {
    this.router.navigate(['/home']);
  }
}
