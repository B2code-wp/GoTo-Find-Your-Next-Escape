import { Component, OnInit } from '@angular/core';
import { MatIcon } from "@angular/material/icon";
import { IonHeader } from "@ionic/angular/standalone";
import { MatToolbar } from "@angular/material/toolbar";
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-propular-destinations',
  templateUrl: './propular-destinations.component.html',
  styleUrls: ['./propular-destinations.component.scss'],
  imports: [MatIcon, IonHeader, MatToolbar,RouterLink],
})
export class PropularDestinationsComponent  implements OnInit {

 // Track menu state
  isMenuOpen: boolean = false;

  constructor(private router: Router) {}

  ngOnInit(): void {
  }

  // Example: handle destination click (future expansion)
  viewDestination(name: string): void {
    console.log(`Viewing details for ${name}`);
    // Could navigate to a detail page or open a modal
  }
}
