import { AfterViewInit, Component, HostListener, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit, AfterViewInit {
  isDarkMode = false;
  isMobileMenuOpen = false;
  activeSection = 'inicio';

  readonly logoUrl = 'assets/favicon.png';

  readonly navItems = [
    { id: 'inicio', label: 'Inicio' },
    { id: 'quienes-somos-resumen', label: 'Quiénes Somos' },
    { id: 'testimonios', label: 'Testimonios' },
    { id: 'servicios', label: 'Servicios' },
    { id: 'contacto', label: 'Contacto' }
  ];

  ngOnInit(): void {
    this.isDarkMode = document.documentElement.classList.contains('dark');
  }

  ngAfterViewInit(): void {
    setTimeout(() => this.updateActiveSectionOnScroll(), 0);
  }

  @HostListener('window:scroll')
  onWindowScroll(): void {
    this.updateActiveSectionOnScroll();
  }

  toggleDarkMode(): void {
    document.documentElement.classList.toggle('dark');
    this.isDarkMode = document.documentElement.classList.contains('dark');
    localStorage.setItem('theme', this.isDarkMode ? 'dark' : 'light');
  }

  toggleMobileMenu(): void {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
  }

  setActiveSection(section: string): void {
    this.activeSection = section;
    this.isMobileMenuOpen = false;
  }

  private updateActiveSectionOnScroll(): void {
    if (window.scrollY < 80) {
      this.activeSection = 'inicio';
      return;
    }

    const reachedBottom =
      window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 80;
    if (reachedBottom) {
      this.activeSection = 'contacto';
      return;
    }

    const triggerOffset = 160;
    let current = 'inicio';

    for (const item of this.navItems) {
      const el = document.getElementById(item.id);
      if (!el) {
        continue;
      }
      const rect = el.getBoundingClientRect();
      if (rect.top <= triggerOffset) {
        current = item.id;
      }
    }

    this.activeSection = current;
  }
}
