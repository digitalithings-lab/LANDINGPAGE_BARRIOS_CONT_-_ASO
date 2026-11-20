import { Component, EventEmitter, Output } from '@angular/core';
import { LegalTab } from '../legal-modal/legal-modal.component';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html'
})
export class FooterComponent {
  @Output() openLegal = new EventEmitter<LegalTab>();

  readonly logoUrl =
    'https://lh3.googleusercontent.com/aida-public/AB6AXuClYnznyOjSMrkQ40YKb93Dieae67n00jBx770c-TQqEhM_UHzEwZXfymlNbbqtqK7OspSlEI417e2tgZQ1Zb6Sz1bqHq69OB3iXSR4bT-SI6-gYpQeKj4Tw5mxzPmOa9Ka1UDcincWRNw00zhf5q1qKMN4bxE0s1KWk6KJacLncB_V0747QSAnx5RdOUC78I83L4c4u_pioRUJ2WPZVvqQkVUrgk57pjm2p2r-lb66a-_BE9DCpYQ';

  onOpenLegal(tab: LegalTab): void {
    this.openLegal.emit(tab);
  }
}
