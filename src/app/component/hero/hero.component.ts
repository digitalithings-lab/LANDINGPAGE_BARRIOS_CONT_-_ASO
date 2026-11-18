import { Component } from '@angular/core';

@Component({
  selector: 'app-hero',
  templateUrl: './hero.component.html'
})
export class HeroComponent {
  readonly heroConsultantImageUrl = 'assets/hero-consultant.png';
  readonly sealBadgeUrl = 'assets/favicon.png';
}
