import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';

import { IonContent } from '@ionic/angular/standalone';
import { KeyValuePipe } from '@angular/common';

import { plans, PlanKey } from './payment-model';
import { FooterComponent } from "../../../shared/footer/footer.component";

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss'],
  standalone: true,
  imports: [
    ReactiveFormsModule,
    FormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatToolbarModule,
    IonContent,
    KeyValuePipe,
    FooterComponent
],
})
export class PaymentComponent implements OnInit {

  private router = inject(Router);

  /* ───── DATA ───── */
  plans = plans;
  selectedPlanKey: PlanKey = 'explorer';

  isAnnual = false;
  submitted = false;
  loading = false;

  paymentForm!: FormGroup;

  /* ───── MENU ───── */
  isMenuOpen = false;

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  closeMenu() {
    this.isMenuOpen = false;
  }

  /* ───── INIT ───── */
  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.paymentForm = this.fb.group({
      cardName: ['', Validators.required],
      cardNumber: ['', Validators.required],
      expiry: ['', Validators.required],
      cvv: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
    });
  }

  /* ───── PLAN ───── */
  get currentPlan() {
    return this.plans[this.selectedPlanKey];
  }

  get price() {
    return this.isAnnual ? this.currentPlan.annual : this.currentPlan.monthly;
  }

  get total() {
    return this.price;
  }

  selectPlan(plan: string) {
    if (plan in this.plans) {
      this.selectedPlanKey = plan as PlanKey;
    }
  }

  toggleBilling() {
    this.isAnnual = !this.isAnnual;
  }

  /* ───── FORM ───── */
  get f() {
    return this.paymentForm.controls;
  }

  formatCardNumber() {
    let v = this.f['cardNumber'].value.replace(/\D/g, '').substring(0, 16);
    this.f['cardNumber'].setValue(v.replace(/(.{4})/g, '$1 ').trim(), {
      emitEvent: false,
    });
  }

  formatExpiry() {
    let v = this.f['expiry'].value.replace(/\D/g, '').substring(0, 4);
    if (v.length >= 2) v = v.slice(0, 2) + '/' + v.slice(2);
    this.f['expiry'].setValue(v, { emitEvent: false });
  }

  /* ───── SUBMIT ───── */
  submit() {
    this.submitted = true;

    if (this.paymentForm.invalid) return;

    this.loading = true;

    const payload = {
      ...this.paymentForm.value,
      plan: this.selectedPlanKey,
      billing: this.isAnnual ? 'annual' : 'monthly',
      total: this.total,
    };

    console.log('PAYMENT:', payload);

    setTimeout(() => {
      this.loading = false;
      alert('Subscription Activated 🎉');
    }, 1500);
  }

  /* ───── NAVIGATION FIXED ───── */
  goTo(page: string) {
    this.closeMenu();
    this.router.navigate([`/${page}`]);
  }

  /* ───── Unsubscribe ───── */
  unsubscribe() {
  const confirmCancel = confirm('Are you sure you want to unsubscribe?');

  if (!confirmCancel) return;

  // Remove subscription (example: localStorage)
  localStorage.removeItem('subscription');

  // Optional: feedback
  alert('You have successfully unsubscribed.');

  // Optional: redirect
  this.router.navigate(['/shop']);
}

  /* ───── CART (FIXED - REMOVED BUGS) ───── */
  cart: any[] = [];

  buyItems() {
    console.log('Cart:', this.cart);

    this.cart = [];

    this.router.navigate(['/payment']);
  }

  signOut() {
    this.router.navigate(['/shop']);
  }
}
