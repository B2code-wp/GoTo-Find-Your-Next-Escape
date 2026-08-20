import { Component, HostListener } from '@angular/core';
import { IonApp, IonRouterOutlet } from '@ionic/angular/standalone';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: 'app.component.html',
  imports: [IonApp, IonRouterOutlet],
})
export class AppComponent {

  constructor(
  )  {}

    @HostListener('document:click')
  @HostListener('document:mousemove')
  @HostListener('document:scroll')
   @HostListener('document:keypress')
  @HostListener('document:keydown')

  activity(): void {

  // this.authService.resetTimer();
  }
  }
