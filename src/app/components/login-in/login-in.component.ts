import {
  Component,
  ElementRef,
  ViewChild
} from '@angular/core';

import {
  ReactiveFormsModule,
  FormBuilder,
  Validators,
  FormGroup
} from '@angular/forms';

import {
  Router,
  RouterLink
} from '@angular/router';

import { CommonModule } from '@angular/common';

/* ANGULAR MATERIAL */
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatToolbarModule } from '@angular/material/toolbar';

import {
  MatSnackBar,
  MatSnackBarModule
} from '@angular/material/snack-bar';

/* IONIC */
import {
  IonContent,
  IonHeader
} from '@ionic/angular/standalone';

/* COMPONENTS */
import { FooterComponent }
from '../../shared/footer/footer.component';

/* FIREBASE */
import { initializeApp } from 'firebase/app';

import {
  getAuth,
  signInWithEmailAndPassword
} from 'firebase/auth';

@Component({
  selector: 'app-login-in',

  standalone: true,

  templateUrl: './login-in.component.html',

  styleUrls: ['./login-in.component.scss'],

  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterLink,

    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatCheckboxModule,
    MatButtonModule,
    MatIconModule,
    MatProgressBarModule,
    MatToolbarModule,
    MatSnackBarModule,

    IonContent,
    IonHeader,

    FooterComponent
  ]
})

export class LoginInComponent {

  /* =========================================================
     FIREBASE
  ========================================================= */

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

  /* =========================================================
     FORM
  ========================================================= */

  form: FormGroup;

  /* =========================================================
     UI STATE
  ========================================================= */

  hide = true;

  loading = false;

  submitted = false;

  errorMessage = '';

  isLoggedIn = false;

  isMenuOpen = false;

  /* =========================================================
     REVIEW SLIDER
  ========================================================= */

  @ViewChild('slider')
  reviewsGrid!: ElementRef<HTMLDivElement>;

  /* =========================================================
     CONSTRUCTOR
  ========================================================= */

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private snackBar: MatSnackBar
  ) {

    this.form = this.fb.group({

      email: [
        '',
        [
          Validators.required,
          Validators.email
        ]
      ],

      password: [
        '',
        [
          Validators.required,
          Validators.minLength(6)
        ]
      ],

      newsletter: [false]

    });

  }

  /* =========================================================
     GETTERS
  ========================================================= */

  get email() {
    return this.form.get('email')!;
  }

  get password() {
    return this.form.get('password')!;
  }

  /* =========================================================
     MENU
  ========================================================= */

  toggleMenu(): void {
    this.isMenuOpen = !this.isMenuOpen;
  }

  closeMenu(): void {
    this.isMenuOpen = false;
  }

  /* =========================================================
     REVIEWS SLIDER
  ========================================================= */

  scrollLeft(): void {

    if (!this.reviewsGrid) return;

    this.reviewsGrid.nativeElement.scrollBy({
      left: -340,
      behavior: 'smooth'
    });

  }

  scrollRight(): void {

    if (!this.reviewsGrid) return;

    this.reviewsGrid.nativeElement.scrollBy({
      left: 340,
      behavior: 'smooth'
    });

  }

  /* =========================================================
     CARD ANIMATION
  ========================================================= */

  onCardHover(
    event: MouseEvent,
    rotateDeg: number
  ): void {

    const card =
      event.currentTarget as HTMLElement;

    card.style.transform =
      `translateY(-10px) rotate(${rotateDeg}deg)`;

    card.style.boxShadow =
      '0 24px 60px rgba(0,60,120,0.18)';
  }

  onCardLeave(event: MouseEvent): void {

    const card =
      event.currentTarget as HTMLElement;

    card.style.transform = '';

    card.style.boxShadow =
      '0 8px 32px rgba(0,60,120,0.10)';
  }

  /* =========================================================
     LOGIN
 ====== */

  async onSubmit(): Promise<void> {

  this.submitted = true;

  this.errorMessage = '';

  if (this.form.invalid) {

    this.form.markAllAsTouched();

    return;

  }

  this.loading = true;

  const {
    email,
    password
  } = this.form.getRawValue();

  try {

    const userCredential =
      await signInWithEmailAndPassword(
        this.auth,
        email,
        password
      );

    const user = userCredential.user;

    // SAVE TOKEN
    localStorage.setItem(
      'token',
      await user.getIdToken()
    );

    // SAVE USER
    localStorage.setItem(
      'user',
      JSON.stringify({
        uid: user.uid,
        email: user.email
      })
    );

    this.isLoggedIn = true;

    this.snackBar.open(
      'Login successful',
      'Close',
      {
        duration: 2500
      }
    );

    // REDIRECT
   this.router.navigate(['/shop']);

  } catch (error: any) {

    console.error(error);

    switch (error.code) {

      case 'auth/user-not-found':
        this.errorMessage =
          'User not found';
        break;

      case 'auth/wrong-password':
        this.errorMessage =
          'Incorrect password';
        break;

      case 'auth/invalid-credential':
        this.errorMessage =
          'Invalid email or password';
        break;

      default:
        this.errorMessage =
          'Login failed';
    }

    this.snackBar.open(
      this.errorMessage,
      'Close',
      {
        duration: 2500
      }
    );

  } finally {

    this.loading = false;

  }

}

  /* =========================================================
     LOGOUT
  ========================================================= */

  logout(): void {

    localStorage.removeItem('token');

    localStorage.removeItem('user');

    this.isLoggedIn = false;

    this.router.navigate(['/login']);

  }

}
