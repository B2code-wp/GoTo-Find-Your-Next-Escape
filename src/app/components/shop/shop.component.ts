import {
  Component,
  HostListener,
  OnInit,
  Renderer2,
  ViewChild,
  ElementRef,
  ChangeDetectionStrategy
} from '@angular/core';

import { Router, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatBadgeModule } from '@angular/material/badge';
import {
  MatSnackBar,
  MatSnackBarModule
} from '@angular/material/snack-bar';

import { IonContent, IonButton } from '@ionic/angular/standalone';

import { AlertController, IonicModule } from '@ionic/angular';

import {
  PLACES,
  Place,
  CartItem
} from './shop.model';

@Component({
  selector: 'app-shop',
  standalone: true,
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,

  imports: [
    CommonModule,
    FormsModule,
    MatToolbarModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatBadgeModule,
    MatSnackBarModule,
    IonicModule,
    RouterOutlet
],
})
export class ShopComponent implements OnInit {

  /* =========================================================
     VIEWCHILD
  ========================================================= */

  @ViewChild(IonContent)
  content!: IonContent;

  @ViewChild('cartPanel')
  cartPanel!: ElementRef;


  /* =========================================================
     CONSTRUCTOR
  ========================================================= */

  constructor(
    private router: Router,
    private renderer: Renderer2,
    private snackBar: MatSnackBar,
    private alertCtrl: AlertController
  ) {

  }

  /* =========================================================
     UI STATE
  ========================================================= */

  darkMode = false;
  isMenuOpen = false;
  showScrollTop = false;
  showCart = false;
  loading = true;

  /* =========================================================
     FILTER STATE
  ========================================================= */

  searchTerm = '';
  selectedCountry = '';
  selectedCategory = 'all';
  sortBy = 'rating';

  /* =========================================================
     DATA
  ========================================================= */

  places: Place[] = PLACES.map(place => ({
    ...place,
    liked: false,
    disliked: false,
    clicks: 0,
    addedToCart: 0,
  }));

  filteredPlaces: Place[] = [];
  countries: string[] = [];

  /* =========================================================
     CART
  ========================================================= */

  cart: CartItem[] = [];
  total = 0;

  /* =========================================================
     INIT
  ========================================================= */

  ngOnInit(): void {

    this.restoreTheme();

    this.countries = [
      '',
      ...new Set(this.places.map(place => place.country))
    ];

    this.restoreCart();

    this.filterPlaces();

    setTimeout(() => {
      this.loading = false;
    }, 700);
  }

  /* =========================================================
     WINDOW SCROLL
  ========================================================= */

  @HostListener('window:scroll')
  onScroll(): void {

    this.showScrollTop = window.scrollY > 350;
  }

  /* =========================================================
     WINDOW RESIZE
  ========================================================= */

  @HostListener('window:resize')
  onResize(): void {

    if (window.innerWidth > 768) {
      this.isMenuOpen = false;
    }
  }

  /* =========================================================
     CLOSE CART OUTSIDE CLICK
  ========================================================= */

  @HostListener('document:click', ['$event'])
  handleClickOutside(event: MouseEvent): void {

    if (!this.showCart) return;

    const target = event.target as HTMLElement;

    if (
      this.cartPanel &&
      !this.cartPanel.nativeElement.contains(target)
    ) {
      this.showCart = false;
    }
  }

  /* =========================================================
     ALERT
  ========================================================= */

  async presentAlert(): Promise<void> {

    const alert = await this.alertCtrl.create({
      header: 'Trips Cart',
      message: `You currently have ${this.cart.length} trip(s) in your cart.`,
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
        },
        {
          text: 'View Cart',
          handler: () => {
            this.showCart = true;
          },
        },
      ],
    });

    await alert.present();
  }

  /* =========================================================
     DARK MODE
  ========================================================= */

  restoreTheme(): void {

    const savedTheme = localStorage.getItem('darkMode');

    if (savedTheme === 'true') {

      this.darkMode = true;

      this.renderer.addClass(
        document.body,
        'dark-theme'
      );
    }
  }

  toggleDarkMode(): void {

    this.darkMode = !this.darkMode;

    if (this.darkMode) {

      this.renderer.addClass(
        document.body,
        'dark-theme'
      );

      localStorage.setItem(
        'darkMode',
        'true'
      );

    } else {

      this.renderer.removeClass(
        document.body,
        'dark-theme'
      );

      localStorage.setItem(
        'darkMode',
        'false'
      );
    }
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
     NAVIGATION
  ========================================================= */

  navigate(path: string): void {

    this.router.navigate([path]);

    this.closeMenu();
  }

  signOut(): void {

    localStorage.removeItem('token');

    this.snackBar.open(
      'Signed out successfully',
      'Close',
      {
        duration: 2500,
      }
    );

    this.router.navigate(['/home']);
  }

  /* =========================================================
     CATEGORY
  ========================================================= */

  setCategory(category: string): void {

    this.selectedCategory = category;

    this.filterPlaces();
  }

  /* =========================================================
     FILTER + SORT
  ========================================================= */

  filterPlaces(): void {

    const search =
      this.searchTerm.trim().toLowerCase();

    let results = this.places.filter(place => {

      const matchesSearch =
        place.name.toLowerCase().includes(search) ||
        place.country.toLowerCase().includes(search);

      const matchesCountry =
        !this.selectedCountry ||
        place.country === this.selectedCountry;

      return matchesSearch && matchesCountry;
    });

    switch (this.selectedCategory) {

      case 'trending':
        results = results.filter(p => p.trending);
        break;

      case 'adventure':
        results = results.filter(p => p.adventure);
        break;

      case 'nature':
        results = results.filter(p => p.nature);
        break;

      case 'beach':
        results = results.filter(p => p.beach);
        break;

      case 'luxury':
        results = results.filter(p => p.luxury);
        break;

      case 'culture':
        results = results.filter(p => p.culture);
        break;
    }

    switch (this.sortBy) {

      case 'rating':
        results.sort((a, b) =>
          b.rating - a.rating
        );
        break;

      case 'days-low':
        results.sort((a, b) =>
          a.days - b.days
        );
        break;

      case 'days-high':
        results.sort((a, b) =>
          b.days - a.days
        );
        break;

      case 'name':
        results.sort((a, b) =>
          a.name.localeCompare(b.name)
        );
        break;
    }

    this.filteredPlaces = results.slice(0, 100);
  }

  /* =========================================================
     LIKE
  ========================================================= */

  toggleLike(place: Place): void {

    place.liked = !place.liked;

    if (place.liked) {
      place.disliked = false;
    }
  }

  toggleDislike(place: Place): void {

    place.disliked = !place.disliked;

    if (place.disliked) {
      place.liked = false;
    }
  }

  /* =========================================================
     CART
  ========================================================= */

  addToCart(place: Place): void {

    const existingItem = this.cart.find(
      item => item.name === place.name
    );

    if (existingItem) {

      existingItem.qty++;

    } else {

      this.cart.push({
        ...place,
        qty: 1
      });
    }

    place.addedToCart =
      (place.addedToCart ?? 0) + 1;

    this.updateTotal();

    this.showCart = true;

    this.saveCart();

    this.snackBar.open(
      `${place.name} added to cart`,
      'Close',
      {
        duration: 2000,
      }
    );
  }

  increaseQty(item: CartItem): void {

    item.qty++;

    this.updateTotal();

    this.saveCart();
  }

  decreaseQty(item: CartItem): void {

    if (item.qty > 1) {

      item.qty--;

    } else {

      this.removeItem(item);

      return;
    }

    this.updateTotal();

    this.saveCart();
  }

  removeItem(item: CartItem): void {

    this.cart = this.cart.filter(
      cartItem => cartItem.name !== item.name
    );

    this.updateTotal();

    this.saveCart();

    this.snackBar.open(
      `${item.name} removed`,
      'Close',
      {
        duration: 2000,
      }
    );
  }

  clearCart(): void {

    this.cart = [];

    this.total = 0;

    localStorage.removeItem('travel_cart');

    this.snackBar.open(
      'Cart cleared',
      'Close',
      {
        duration: 2000,
      }
    );
  }

  updateTotal(): void {

    this.total = this.cart.reduce(
      (sum, item) =>
        sum + ((item.days || 0) * item.qty),
      0
    );
  }

  saveCart(): void {

    localStorage.setItem(
      'travel_cart',
      JSON.stringify(this.cart)
    );
  }

  restoreCart(): void {

    const savedCart =
      localStorage.getItem('travel_cart');

    if (savedCart) {

      this.cart = JSON.parse(savedCart);

      this.updateTotal();
    }
  }

  toggleCart(): void {

    this.showCart = !this.showCart;
  }

  /* =========================================================
     CHECKOUT
  ========================================================= */

  buyItems(): void {

    if (!this.cart.length) {

      this.snackBar.open(
        'Your cart is empty',
        'Close',
        {
          duration: 2500,
        }
      );

      return;
    }

    this.snackBar.open(
      'Redirecting to payment...',
      'Close',
      {
        duration: 2500,
      }
    );

    this.router.navigate(['/payment']);
  }

  /* =========================================================
     SCROLL TOP
  ========================================================= */

  scrollTop(): void {

    this.content.scrollToTop(500);
  }

  /* =========================================================
     SCROLL BOTTOM
  ========================================================= */

  scrollBottom(): void {

    this.content.scrollToBottom(500);
  }

  /* =========================================================
     TRACK BY
  ========================================================= */

  trackByName(
    index: number,
    item: Place
  ): string {

    return item.name;
  }
}
