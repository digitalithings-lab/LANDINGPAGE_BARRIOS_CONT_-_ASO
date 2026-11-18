import { Component, ElementRef, ViewChild } from '@angular/core';

interface Testimonial {
  initial: string;
  avatarBgClass: string;
  name: string;
  role: string;
  quote: string;
}

interface PillarItem {
  title: string;
  description: string;
  icon: string;
  iconBgClass: string;
}

@Component({
  selector: 'app-about-testimonials',
  templateUrl: './about-testimonials.component.html'
})
export class AboutTestimonialsComponent {
  @ViewChild('testimonialsSlider') testimonialsSlider?: ElementRef<HTMLDivElement>;

  activeTestimonialIndex = 0;

  readonly collageTopImageUrl =
    'https://lh3.googleusercontent.com/aida-public/AB6AXuBRM1YLSlJFoQSgcy2yEp_P_ODFaNZeTI9sUy_vq0y-chddFNrXVTE3Tq2t-RVvPyOp2tqfGNdxUP1xkXzaobrcA0o1l9hhP-AwuBcc_eXrBae2NuqM67jGXofkl_npHK6OIoSIvaFIMiRfVi8r2gsTQ_paKB964pflzMBh9gk6pGXYdbKxVk_IiphPhW5Mx84pjL88yh-eK6jlVcgeQwyrfTAhxumVlGaNeDlnQSmeIef2HVI2wZQ';

  readonly collageBottomImageUrl =
    'https://lh3.googleusercontent.com/aida-public/AB6AXuCnP7WhVcRj9lOHWQjcZMJyXXWvDn8COJlA6uRioWjrkDe0J-cpacVFjFFgyxamx0LGCRtcxpJfB5hGIEO-eQcK5K0eIQZo2HuXj2_XgKXIcPtM9paQ-DOJpWWaD49wAV0qLPWtjZTsMmXUMZgGeaBfd9NpmueRqemvbllwwgIu7bCWTsAEA3GcNkSGAjidgY58TU4AIZdF5rnDWZtdIaB7O5mwR3UXJvoQkhNbhe6ybc0ZoU7AlOI';

  readonly testimonials: Testimonial[] = [
    {
      initial: 'M',
      avatarBgClass: 'bg-secondary-fixed text-on-secondary-fixed',
      name: 'María G.',
      role: 'Emprendedora',
      quote:
        '“Gracias a Barrios Contadores pude organizar mis finanzas y cumplir con la DGI sin estrés.”'
    },
    {
      initial: 'C',
      avatarBgClass: 'bg-primary-fixed text-on-primary-fixed',
      name: 'Carlos R.',
      role: 'Dueño de negocio',
      quote:
        '“Excelente atención y rapidez, me ayudaron con mi aviso de operación en tiempo récord.”'
    },
    {
      initial: 'A',
      avatarBgClass: 'bg-tertiary text-on-tertiary',
      name: 'Ana P.',
      role: 'Trabajadora independiente',
      quote:
        '“Muy profesionales, ahora llevo mi contabilidad al día.”'
    }
  ];

  readonly pillars: PillarItem[] = [
    {
      title: 'Confianza',
      description: 'Seguridad y ética fiduciaria en cada gestión contable.',
      icon: 'shield',
      iconBgClass: 'bg-primary-fixed text-primary'
    },
    {
      title: 'Transparencia',
      description: 'Cuentas claras e informes fiscales sin sorpresas.',
      icon: 'visibility',
      iconBgClass: 'bg-secondary-fixed text-on-secondary-fixed'
    },
    {
      title: 'Rapidez',
      description: 'Respuestas y trámites ágiles ante la DGI y CSS.',
      icon: 'bolt',
      iconBgClass: 'bg-primary-fixed text-primary'
    },
    {
      title: 'Profesionalismo',
      description: 'Idoneidad CPA y rigor técnico garantizado.',
      icon: 'military_tech',
      iconBgClass: 'bg-secondary-fixed text-on-secondary-fixed'
    }
  ];

  scrollTestimonials(direction: number): void {
    const nextIndex = Math.max(
      0,
      Math.min(this.testimonials.length - 1, this.activeTestimonialIndex + direction)
    );
    this.goToTestimonial(nextIndex);
  }

  goToTestimonial(index: number): void {
    const track = this.testimonialsSlider?.nativeElement;
    this.activeTestimonialIndex = index;
    if (!track) {
      return;
    }
    track.scrollTo({ left: track.clientWidth * index, behavior: 'smooth' });
  }

  onTestimonialsScroll(): void {
    const track = this.testimonialsSlider?.nativeElement;
    if (!track || track.clientWidth === 0) {
      return;
    }
    const index = Math.round(track.scrollLeft / track.clientWidth);
    if (index >= 0 && index < this.testimonials.length) {
      this.activeTestimonialIndex = index;
    }
  }
}
