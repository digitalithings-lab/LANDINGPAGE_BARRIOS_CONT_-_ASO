import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';

interface ServiceItem {
  title: string;
  description: string;
  icon: string;
  iconBgClass: string;
  features: string[];
  whatsappUrl: string;
}

@Component({
  selector: 'app-services',
  templateUrl: './services.component.html'
})
export class ServicesComponent implements OnInit, OnDestroy {
  @ViewChild('servicesTrack') servicesTrack?: ElementRef<HTMLDivElement>;

  activeServicePage = 0;
  private autoplayTimer?: ReturnType<typeof setInterval>;
  private isPaused = false;

  readonly services: ServiceItem[] = [
    {
      title: 'Servicios Contables',
      description: 'Gestión meticulosa del flujo contable para empresas de servicios, retail e industria.',
      icon: 'account_balance',
      iconBgClass: 'bg-primary-fixed text-on-primary-fixed',
      features: [
        'Estados financieros bajo normas NIIF',
        'Contabilidad general mensual y anual',
        'Registro contable de compras y ventas',
        'Control y valorización de inventarios'
      ],
      whatsappUrl: 'https://wa.me/50762272263?text=Hola,%20me%20interesan%20los%20Servicios%20Contables'
    },
    {
      title: 'Trámites Legales & Aperturas',
      description: 'Formalización ágil ante entidades públicas para iniciar operaciones con plena validez.',
      icon: 'gavel',
      iconBgClass: 'bg-secondary-fixed text-on-secondary-fixed',
      features: [
        'Aviso de operación en Panamá Emprende',
        'Inscripción y constitución de sociedades',
        'Obtención de Personería Jurídica',
        'Actualizaciones de directiva y cierres'
      ],
      whatsappUrl: 'https://wa.me/50762272263?text=Hola,%20requiero%20Tr%C3%A1mites%20Legales%20y%20Aperturas'
    },
    {
      title: 'Declaraciones Fiscales',
      description: 'Protección tributaria con cálculo riguroso de impuestos para evitar contingencias.',
      icon: 'request_quote',
      iconBgClass: 'bg-primary-fixed text-on-primary-fixed',
      features: [
        'Declaración jurada de renta (DGI)',
        'Cálculo y presentación de ITBMS 7%',
        'Presentación de Planilla 03 anual',
        'Declaración municipal e informe de compras'
      ],
      whatsappUrl: 'https://wa.me/50762272263?text=Hola,%20necesito%20apoyo%20con%20Declaraciones%20Fiscales'
    },
    {
      title: 'Gestión Laboral',
      description: 'Manejo estructurado del personal con apego estricto al Código de Trabajo de Panamá.',
      icon: 'badge',
      iconBgClass: 'bg-secondary-fixed text-on-secondary-fixed',
      features: [
        'Confección de planillas quincenales',
        'Cálculo de liquidaciones y prestaciones',
        'Gestión ante Caja de Seguro Social (CSS)',
        'Administración de plataforma SIPE'
      ],
      whatsappUrl: 'https://wa.me/50762272263?text=Hola,%20deseo%20asesor%C3%ADa%20en%20Gesti%C3%B3n%20Laboral'
    },
    {
      title: 'Servicios Digitales & Facturación',
      description: 'Modernización y transformación digital de tu operativa contable obligatoria.',
      icon: 'point_of_sale',
      iconBgClass: 'bg-primary-fixed text-on-primary-fixed',
      features: [
        'Implementación de Facturación Electrónica',
        'Soporte permanente en e-Tax 2.0',
        'Habilitación y enlace del PAC',
        'Asistente contable virtual para dudas'
      ],
      whatsappUrl: 'https://wa.me/50762272263?text=Hola,%20deseo%20implementar%20Facturaci%C3%B3n%20Electr%C3%B3nica'
    }
  ];

  ngOnInit(): void {
    const prefersReducedMotion =
      typeof window !== 'undefined' &&
      window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;

    if (!prefersReducedMotion) {
      this.startAutoplay();
    }
  }

  ngOnDestroy(): void {
    this.stopAutoplay();
  }

  pauseAutoplay(): void {
    this.isPaused = true;
  }

  resumeAutoplay(): void {
    this.isPaused = false;
  }

  scrollServices(delta: number): void {
    const track = this.servicesTrack?.nativeElement;
    if (!track) {
      return;
    }
    track.scrollBy({ left: delta, behavior: 'smooth' });
  }

  goToServicePage(page: number): void {
    const track = this.servicesTrack?.nativeElement;
    this.activeServicePage = page;
    if (!track) {
      return;
    }
    const targetLeft = page === 0 ? 0 : track.scrollWidth;
    track.scrollTo({ left: targetLeft, behavior: 'smooth' });
  }

  onServicesScroll(): void {
    const track = this.servicesTrack?.nativeElement;
    if (!track) {
      return;
    }
    const maxScroll = track.scrollWidth - track.clientWidth;
    if (maxScroll <= 0) {
      return;
    }
    this.activeServicePage = track.scrollLeft > maxScroll * 0.45 ? 1 : 0;
  }

  private startAutoplay(): void {
    this.stopAutoplay();
    this.autoplayTimer = setInterval(() => {
      if (this.isPaused) {
        return;
      }
      const track = this.servicesTrack?.nativeElement;
      if (!track) {
        return;
      }
      const atEnd = track.scrollLeft + track.clientWidth >= track.scrollWidth - 12;
      if (atEnd) {
        track.scrollTo({ left: 0, behavior: 'smooth' });
      } else {
        const firstCard = track.firstElementChild as HTMLElement | null;
        const step = firstCard ? firstCard.offsetWidth + 24 : 380;
        track.scrollBy({ left: step, behavior: 'smooth' });
      }
    }, 4000);
  }

  private stopAutoplay(): void {
    if (this.autoplayTimer) {
      clearInterval(this.autoplayTimer);
      this.autoplayTimer = undefined;
    }
  }
}
