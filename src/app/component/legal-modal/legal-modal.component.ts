import { Component, EventEmitter, HostListener, Input, Output } from '@angular/core';

export type LegalTab = 'privacy' | 'terms';

@Component({
  selector: 'app-legal-modal',
  templateUrl: './legal-modal.component.html'
})
export class LegalModalComponent {
  @Input() isOpen = false;
  @Input() activeTab: LegalTab = 'privacy';
  @Output() closed = new EventEmitter<void>();
  @Output() tabChanged = new EventEmitter<LegalTab>();

  @HostListener('document:keydown.escape')
  onEscapeKey(): void {
    if (this.isOpen) {
      this.close();
    }
  }

  selectTab(tab: LegalTab): void {
    this.activeTab = tab;
    this.tabChanged.emit(tab);
  }

  close(): void {
    this.closed.emit();
  }
}
