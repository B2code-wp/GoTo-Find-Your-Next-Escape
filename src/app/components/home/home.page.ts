import { Component } from '@angular/core';
import { IonToolbar, IonTitle, IonImg, IonCard, IonBadge, IonCardHeader, IonCardContent, IonCardTitle, IonButtons, IonMenu, IonMenuButton, IonContent, IonHeader, IonButton, IonList, IonIcon, IonLabel, IonListHeader, IonAlert, IonBreadcrumbs, IonBreadcrumb } from '@ionic/angular/standalone';
import { Router, RouterLink, RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from "@angular/material/card";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatButtonModule } from '@angular/material/button';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  standalone: true,
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  imports: [
    RouterModule,
    RouterLink,
    IonImg,
    IonCard,
    IonBadge,
    IonCardContent,
    IonButtons, IonMenu, IonMenuButton, IonTitle, IonToolbar,
    IonContent,
    IonHeader,
    IonButton,
    MatCardModule,
    IonList,
    IonIcon,
    IonLabel,
    IonAlert,
    MatIconModule,
    MatButtonModule,
    MatFormFieldModule,
    IonBreadcrumbs,
    IonBreadcrumb
],
})
export class HomePage {

  constructor(private router: Router,
    private alertCtrl: AlertController,
  ) {}

alertButtons = [
    {
      text: 'Cancel',
      role: 'cancel'
    },
    {
      text: 'Submit',
      handler: (data: any) => {
        console.log('User Recommendation:', data);
      }
    },

  ];

  alertInputs = [
    {
      name: 'name',
      type: 'text',
      placeholder: 'Your Name'
    },
    {
      name: 'destination',
      type: 'text',
      placeholder: 'Recommended Destination'
    },
    {
      name: 'message',
      type: 'textarea',
      placeholder: 'Why do you recommend it?'
    }
  ];
share() {
  if (navigator.share) {
    navigator.share({
      title: 'Check this out!',
      text: 'Cool content here',
      url: window.location.href
    });
  } else {
    alert('Sharing not supported on this browser.');
  }
}

  //go to login
  goToLogin() {
  this.router.navigate(['/login-in']);
}
  async presentAlert() {
    const alert = await this.alertCtrl.create({
      header: 'Share your recommendation',
     // inputs: this.alertInputs,
      buttons: this.alertButtons
    });

    await alert.present();
  }
}
