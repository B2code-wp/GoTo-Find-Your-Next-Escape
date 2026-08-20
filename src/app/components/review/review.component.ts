import { Component, OnInit, Input } from '@angular/core';
import {
  IonInfiniteScroll,
  IonInfiniteScrollContent,
  IonCard,
  IonAvatar,
  IonContent,
  IonHeader,
} from '@ionic/angular/standalone';

import { MatIcon } from '@angular/material/icon';
import { InfiniteScrollCustomEvent } from '@ionic/core';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatToolbar } from '@angular/material/toolbar';

interface Review {
  userName: string;
  rating: number;
  comment: string;
  date: string;
}

@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.scss'],
  standalone: true,
imports: [
    IonInfiniteScroll,
    IonInfiniteScrollContent,
    IonCard,
    IonAvatar,
    IonContent,
    MatIcon,
    CommonModule,
    RouterLink,
    IonHeader,
    MatToolbar,
  ],
})
export class ReviewComponent implements OnInit {
   isMenuOpen = false;

  // Reviews bound to template
  @Input() reviews: Review[] = [];

  constructor(private router: Router) {}

  ngOnInit() {
    // If no reviews passed in, generate mock ones
    if (this.reviews.length === 0) {
      this.generateReviews();
    }
  }

  /* GENERATE MOCK REVIEWS */
  private generateReviews() {
    const count = this.reviews.length + 1;
    for (let i = 0; i < 10; i++) {
      this.reviews.push({
        userName: `Traveler ${count + i}`,
        rating: Math.floor(Math.random() * 5) + 1,
        comment:
          'Amazing experience! Highly recommended for anyone who loves travel and adventure.',
        date: new Date().toLocaleDateString(),
      });
    }
  }

  toggleMenu(): void {
    this.isMenuOpen = !this.isMenuOpen;
  }

  closeMenu(): void {
    this.isMenuOpen = false;
  }

  /* INFINITE SCROLL */
  onIonInfinite(event: InfiniteScrollCustomEvent) {
    this.generateReviews();
    setTimeout(() => {
      event.target.complete();
    }, 600);
  }
}
