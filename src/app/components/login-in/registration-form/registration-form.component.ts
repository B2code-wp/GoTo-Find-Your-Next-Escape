import { Component, inject } from '@angular/core';

import {
  ReactiveFormsModule,
  FormBuilder,
  Validators,
  FormGroup
} from '@angular/forms';

import {
  IonContent,
  IonHeader,
  ModalController
} from '@ionic/angular/standalone';

import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';

import {
  Router,
  RouterModule
} from '@angular/router';

import { FooterComponent }
from '../../../shared/footer/footer.component';

import { initializeApp } from 'firebase/app';

import {
  getAuth,
  createUserWithEmailAndPassword
} from 'firebase/auth';
import { AuthService } from '../authService';

@Component({
  selector: 'app-registration-form',

  templateUrl:
    './registration-form.component.html',

  standalone: true,

  imports: [
    ReactiveFormsModule,
    RouterModule,
    IonContent,
    IonHeader,
    MatIconModule,
    MatFormFieldModule,
    MatCardModule,
    MatInputModule,
    MatButtonModule,
    MatToolbarModule,
    FooterComponent
  ],

  styleUrls: [
    './registration-form.component.scss'
  ],
})

export class RegistrationFormComponent {

  private router = inject(Router);

  isMenuOpen = false;

  hidePassword = true;
  hideConfirmPassword = true;

  submitted = false;
  errorMessage = '';
  loading = false;

  registerForm: FormGroup;

  // FIREBASE CONFIG
  firebaseConfig = {
    apiKey: 'AIzaSyBGm2Gz7wUrMSpKppTlXj9OMy9hphe-kRA',
    authDomain: 'togo-login.firebaseapp.com',
    projectId: 'togo-login',
    storageBucket: 'togo-login.firebasestorage.app',
    messagingSenderId: '1074241514688',
    appId: '1:1074241514688:web:8f213b1d2bb32ad2fed125'
  };

  app = initializeApp(this.firebaseConfig);

  auth = getAuth(this.app);

  constructor(
    private modalCtrl: ModalController,
    private fb: FormBuilder,
    //private authService: AuthService
  ) {

    // FORM MUST BE INSIDE CONSTRUCTOR
    this.registerForm = this.fb.group({

      username: [
        '',
        Validators.required
      ],

      email: [
        '',
        [
          Validators.required,
          Validators.email
        ]
      ],

      enterPassword: [
        '',
        [
          Validators.required,
          Validators.minLength(6)
        ]
      ]

    });

  }

  // ============================
  // MENU
  // ============================

  toggleMenu(): void {
    this.isMenuOpen = !this.isMenuOpen;
  }

  closeMenu(): void {
    this.isMenuOpen = false;
  }

  // ============================
  // SUBMIT
  // ============================

  async onSubmit() {

    this.submitted = true;

    if (this.registerForm.invalid) {

      this.registerForm.markAllAsTouched();

      return;
    }

    this.loading = true;

    const email =
      this.registerForm.value.email;

    const password =
      this.registerForm.value.enterPassword;

    try {

  const userCredential =
    await createUserWithEmailAndPassword(
      this.auth,
      email,
      password
    );

  const user = userCredential.user;

  console.log(user);

  localStorage.setItem(
    'token',
    await user.getIdToken()
  );

  localStorage.setItem(
    'user',
    JSON.stringify({
      uid: user.uid,
      email: user.email
    })
  );

  alert('Account created successfully!');

  this.router.navigate(['/shop']);

} catch (error: any) {

  this.errorMessage = error.message;

  console.error(error);

}

  }

}
