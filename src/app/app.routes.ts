import { Routes } from '@angular/router';

// Components
import { HomePage } from './components/home/home.page';
import { LoginInComponent } from './components/login-in/login-in.component';
import { ShopComponent } from './components/shop/shop.component';
import { RegistrationFormComponent } from './components/login-in/registration-form/registration-form.component';
import { PaymentComponent } from './components/shop/payment/payment.component';
import { TermsComponent } from './components/login-in/registration-form/terms/terms.component';
import { ReviewComponent } from './components/review/review.component';
import { ExploreComponent } from './components/explore/explore.component';
import { DestinationCardComponent } from './components/shop/destination-card/destination-card.component';
import { PropularDestinationsComponent } from './components/home/propular-destinations/propular-destinations.component';
import { RecommendationComponent } from './components/home/recommendation/recommendation.component';
import { FooterComponent } from './shared/footer/footer.component';
import { TaskComponent } from './components/secret-file/task/task.component';
import { SecretFile } from './components/secret-file/secret-file';

export const routes: Routes = [

  // HOME
  {
    path: 'home',
    component: HomePage
  },

  // REDIRECT ROOT → HOME
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },

  // PAGES
  {
    path: 'review',
    component: ReviewComponent,
  },
  {
    path: 'terms',
    component: TermsComponent,
  },
  {
    path: 'explore',
    component: ExploreComponent,
  },
  {
    path: 'login',
    component: LoginInComponent,
  },
  {
    path: 'registration-form',
    component: RegistrationFormComponent,
  },
  {
    path: 'propular-destinations',
    component: PropularDestinationsComponent,
  },
  {
    path: 'destination-card',
    component: DestinationCardComponent,
  },
  {
    path: 'recommendation',
    component: RecommendationComponent,
  },
  {
    path: 'task',
    component: TaskComponent,
  },
  {
    path: 'secret-file',
    component: SecretFile,
  },

  // PROTECTED ROUTES
  {
    path: 'shop',
    component: ShopComponent,
    //!canActivate: [authGuard],
    /*  children: [
      {
        path: 'feature',
        component: FeatuteComponent   //  child route
      }
    ]*/
  },
  {
    path: 'payment',
    component: PaymentComponent,
  //! canActivate: [authGuard],
  },

  // FOOTER (usually not a route, but kept as you had it)
  {
    path: 'footer',
    component: FooterComponent,
  },

  // FALLBACK
  {
    path: '**',
    redirectTo: 'home',
  },
];
