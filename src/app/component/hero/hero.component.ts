import { Component } from '@angular/core';

export interface HeroSlide {
  id: string;
  isBrandSlide?: boolean;
  eyebrow: string;
  titlePrefix: string;
  titleAccent: string;
  description: string;
  secondaryParagraph?: string;
  tagline?: string;
  whatsappUrl: string;
  icon: string;
  number: string;
}

@Component({
  selector: 'app-hero',
  templateUrl: './hero.component.html',
  styleUrls: ['./hero.component.css']
})
export class HeroComponent {
  readonly heroConsultantImageUrl = 'assets/hero-consultant.png';
  readonly sealBadgeUrl = 'assets/favicon.png';

  /** Tiempo entre banners (ms). Controla el temporizador visual y el avance automático. */
  readonly autoplayIntervalMs = 5000;

  activeSlideIndex = 0;
  isPaused = false;

  private touchStartX = 0;

  readonly slides: HeroSlide[] = [
    {
      id: 'aliado-estrategico',
      isBrandSlide: true,
      eyebrow: 'ASESORÍA CONTABLE Y FISCAL EN PANAMÁ',
      titlePrefix: 'Tu empresa merece más que un servicio contable.',
      titleAccent: 'Merece un aliado estratégico.',
      description:
        'En Barrios Contadores & Asociados trabajamos para que tengas el control de tus finanzas, cumplas con tus obligaciones y tomes decisiones respaldadas por información confiable.',
      secondaryParagraph:
        'Nosotros nos ocupamos de tus números, tú enfócate en hacer crecer tu negocio.',
      tagline: 'Tu aliado contable de confianza.',
      whatsappUrl:
        'https://wa.me/50762272263?text=Hola,%20deseo%20agendar%20una%20consulta%20contable%20con%20Barrios%20Contadores%20%26%20Asociados',
      icon: 'verified',
      number: '00'
    },
    {
      id: 'contabilidad-general',
      eyebrow: 'CONTABILIDAD EMPRESARIAL',
      titlePrefix: 'Contabilidad',
      titleAccent: 'general',
      description:
        'Gestionamos y organizamos la información contable de tu negocio, elaborando registros, estados financieros y reportes que te permiten conocer la situación económica de tu empresa y tomar mejores decisiones.',
      whatsappUrl:
        'https://wa.me/50762272263?text=Hola,%20deseo%20m%C3%A1s%20informaci%C3%B3n%20sobre%20el%20servicio%20de%20Contabilidad%20general',
      icon: 'account_balance',
      number: '01'
    },
    {
      id: 'impuestos-asesoria-fiscal',
      eyebrow: 'CUMPLIMIENTO TRIBUTARIO',
      titlePrefix: 'Impuestos y',
      titleAccent: 'asesoría fiscal',
      description:
        'Brindamos asesoramiento y gestión de obligaciones tributarias, declaraciones de renta, ITBMS y trámites ante la DGI, procurando el cumplimiento oportuno de las disposiciones fiscales vigentes en Panamá.',
      whatsappUrl:
        'https://wa.me/50762272263?text=Hola,%20deseo%20m%C3%A1s%20informaci%C3%B3n%20sobre%20Impuestos%20y%20asesor%C3%ADa%20fiscal',
      icon: 'request_quote',
      number: '02'
    },
    {
      id: 'asesoramiento-financiero',
      eyebrow: 'ESTRATEGIA Y RENTABILIDAD',
      titlePrefix: 'Asesoramiento',
      titleAccent: 'financiero',
      description:
        'Ayudamos a empresas y emprendedores a analizar sus finanzas, controlar sus ingresos y gastos, elaborar presupuestos y desarrollar estrategias que fortalezcan su rentabilidad y crecimiento.',
      whatsappUrl:
        'https://wa.me/50762272263?text=Hola,%20deseo%20m%C3%A1s%20informaci%C3%B3n%20sobre%20Asesoramiento%20financiero',
      icon: 'trending_up',
      number: '03'
    },
    {
      id: 'planilla-recursos-humanos',
      eyebrow: 'GESTIÓN LABORAL EN PANAMÁ',
      titlePrefix: 'Gestión de planilla y',
      titleAccent: 'recursos humanos',
      description:
        'Administramos los procesos de planilla, cálculos salariales, prestaciones laborales, décimo tercer mes, cuotas de la CSS y presentación de planillas ante el SIPE, garantizando un manejo ordenado y oportuno de las obligaciones laborales.',
      whatsappUrl:
        'https://wa.me/50762272263?text=Hola,%20deseo%20m%C3%A1s%20informaci%C3%B3n%20sobre%20Gesti%C3%B3n%20de%20planilla%20y%20recursos%20humanos',
      icon: 'badge',
      number: '04'
    },
    {
      id: 'auditoria-control-interno',
      eyebrow: 'TRANSPARENCIA Y CONFIANZA',
      titlePrefix: 'Auditoría y',
      titleAccent: 'control interno',
      description:
        'Evaluamos la información financiera, los procesos administrativos y los controles internos de las organizaciones para identificar riesgos, detectar oportunidades de mejora y fortalecer la transparencia y confiabilidad de sus operaciones.',
      whatsappUrl:
        'https://wa.me/50762272263?text=Hola,%20deseo%20m%C3%A1s%20informaci%C3%B3n%20sobre%20Auditor%C3%ADa%20y%20control%20interno',
      icon: 'verified_user',
      number: '05'
    }
  ];

  nextSlide(): void {
    this.activeSlideIndex = (this.activeSlideIndex + 1) % this.slides.length;
  }

  prevSlide(): void {
    this.activeSlideIndex =
      (this.activeSlideIndex - 1 + this.slides.length) % this.slides.length;
  }

  goToSlide(index: number): void {
    if (index >= 0 && index < this.slides.length) {
      this.activeSlideIndex = index;
    }
  }

  pauseAutoplay(): void {
    this.isPaused = true;
  }

  resumeAutoplay(): void {
    this.isPaused = false;
  }

  /**
   * El avance automático está sincronizado con la barra de progreso:
   * cuando la animación del temporizador termina, pasa al siguiente banner.
   * Así la pausa (hover/foco/touch) detiene ambos a la vez.
   */
  onProgressEnd(): void {
    this.nextSlide();
  }

  onKeyDown(event: KeyboardEvent): void {
    if (event.key === 'ArrowRight') {
      event.preventDefault();
      this.nextSlide();
    } else if (event.key === 'ArrowLeft') {
      event.preventDefault();
      this.prevSlide();
    }
  }

  onTouchStart(event: TouchEvent): void {
    this.pauseAutoplay();
    this.touchStartX = event.changedTouches[0]?.clientX ?? 0;
  }

  onTouchEnd(event: TouchEvent): void {
    const deltaX = (event.changedTouches[0]?.clientX ?? 0) - this.touchStartX;
    if (Math.abs(deltaX) > 45) {
      if (deltaX < 0) {
        this.nextSlide();
      } else {
        this.prevSlide();
      }
    }
    this.resumeAutoplay();
  }
}
