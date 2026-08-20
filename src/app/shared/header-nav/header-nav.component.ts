import { Component, HostListener, OnInit } from '@angular/core';
import { MatIcon } from "@angular/material/icon";
import { IonHeader } from "@ionic/angular/standalone";
import { MatToolbar } from "@angular/material/toolbar";
import { Router } from '@angular/router';

@Component({
  selector: 'app-header-nav',
  templateUrl: './header-nav.component.html',
  styleUrls: ['./header-nav.component.scss'],
  imports: [MatIcon, IonHeader, MatToolbar],
})
export class HeaderNavComponent  {
  isMobile = false;

  constructor(private router: Router) {
    this.checkScreenSize();
  }

  // Detect screen size
  @HostListener('window:resize')
  checkScreenSize() {
    this.isMobile = window.innerWidth <= 768;
  }

  // Close menu logic (for future sidenav / drawer support)
  closeMenu(): void {
    // If you later add MatSidenav or IonMenu, close it here
    console.log('Menu closed (placeholder)');
  }

  // Navigation helpers (optional but clean)
  goToLogin(): void {
    this.closeMenu();
    this.router.navigate(['/login']);
  }

  goHome(): void {
    this.closeMenu();
    this.router.navigate(['/home']);
  }


}
