import { Component } from '@angular/core';
import { LegalTab } from './component/legal-modal/legal-modal.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  isLegalModalOpen = false;
  activeLegalTab: LegalTab = 'privacy';

  openLegalModal(tab: LegalTab): void {
    this.activeLegalTab = tab;
    this.isLegalModalOpen = true;
  }

  closeLegalModal(): void {
    this.isLegalModalOpen = false;
  }
}
