import { Component } from '@angular/core';

@Component({
  selector: 'app-floating-actions',
  templateUrl: './floating-actions.component.html'
})
export class FloatingActionsComponent {
  scrollToTop(event: Event): void {
    event.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}
