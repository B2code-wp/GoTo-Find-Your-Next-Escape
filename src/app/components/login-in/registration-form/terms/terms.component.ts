import { Component, OnInit } from '@angular/core';
import { MatCardModule } from "@angular/material/card";
import { RouterModule } from '@angular/router';
import { IonButton, IonContent, IonTitle, IonToolbar, IonHeader } from "@ionic/angular/standalone";

@Component({
  selector: 'app-terms',
  templateUrl: './terms.component.html',
  styleUrls: ['./terms.component.scss'],
  imports: [MatCardModule, IonButton, IonContent, IonTitle, IonToolbar, IonHeader, RouterModule],
})
export class TermsComponent  implements OnInit {

  constructor() { }

  ngOnInit() {}

}
