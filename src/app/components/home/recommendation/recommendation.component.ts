import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import {  FormsModule } from '@angular/forms';
/* Angular Material */
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { IonHeader, IonContent } from "@ionic/angular/standalone";

/* ───────── INTERFACES ───────── */
interface Review {
  name: string;
  destination: string;
  reason: string;
  rating: number;
  date: string;
}

@Component({
  selector: 'app-recommendation',
  standalone: true,
  templateUrl: './recommendation.component.html',
  styleUrls: ['./recommendation.component.scss'],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterLink,
    MatIconModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatToolbarModule,
    FormsModule,
    IonHeader,
    IonContent
],
})
export class RecommendationComponent {

  /* ───────── FORMS ───────── */
  recommendationForm: FormGroup;

  chatForm = this.fb.group({
    message: ['']
  });

  /* ───────── STATE ───────── */
  reviews: Review[] = [];
  isChatOpen = false;
  chatMessage: string = '';

  /* ───────── FILE STATE ───────── */
  selectedFile: File | null = null;
  previewUrl: string | ArrayBuffer | null = null;

  constructor(private fb: FormBuilder) {
    this.recommendationForm = this.fb.group({
      name: ['', Validators.required],
      destination: ['', Validators.required],
      reason: ['', [Validators.required, Validators.minLength(10)]],
      title: [''],
      description: [''],
      file: [null]
    });
  }

  /* ───────── CHAT CONTROL ───────── */
  openChat(): void {
    this.isChatOpen = true;
  }

  closeChat(): void {
    this.isChatOpen = false;
  }

  sendMessage(): void {
    if (!this.chatMessage?.trim()) return;

    console.log('User message:', this.chatMessage);

    // future AI/backend integration here

    this.chatMessage = '';
  }

  /* ───────── FILE UPLOAD ───────── */
  onFileSelected(event: Event, source: 'camera' | 'upload') {
    const input = event.target as HTMLInputElement;

    if (!input.files?.length) return;

    const file = input.files[0];

    if (!file.type.startsWith('image/')) {
      alert('Only image files are allowed.');
      return;
    }

    this.selectedFile = file;
    this.recommendationForm.patchValue({ file });

    const reader = new FileReader();
    reader.onload = () => this.previewUrl = reader.result;
    reader.readAsDataURL(file);
  }

  /* ───────── ADD REVIEW ───────── */
  addRecommendation() {
    if (this.recommendationForm.invalid) return;

    const value = this.recommendationForm.value;

    const formData = new FormData();
    formData.append('name', value.name);
    formData.append('destination', value.destination);
    formData.append('reason', value.reason);
    formData.append('title', value.title);
    formData.append('description', value.description);

    if (this.selectedFile) {
      formData.append('image', this.selectedFile);
    }
    //add the chosen picture from the upload Image taken after submit

    const newReview: Review = {
      name: value.name,
      destination: value.destination,
      reason: value.reason,
      rating: this.generateRating(),
      date: new Date().toLocaleDateString(),
    };

    this.reviews.unshift(newReview);

    // Reset everything
    this.recommendationForm.reset();
    this.previewUrl = null;
    this.selectedFile = null;
  }

  /* ───────── DELETE ───────── */
  deleteReview(index: number) {
    this.reviews.splice(index, 1);
  }

  /* ───────── HELPERS ───────── */
  private generateRating(): number {
    return Math.floor(Math.random() * 5) + 1;
  }

  closeMenu() {}

  onIonInfinite(event: any) {
    setTimeout(() => {
      this.reviews.push({
        name: 'Traveler',
        destination: 'Unknown',
        reason: 'Amazing place!',
        rating: 4,
        date: new Date().toLocaleDateString(),
      });

      event.target.complete();
    }, 1000);
  }
}
