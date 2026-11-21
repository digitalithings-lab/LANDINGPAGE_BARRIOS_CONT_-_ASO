import { AfterViewInit, Component } from '@angular/core';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html'
})
export class ContactComponent implements AfterViewInit {
  formSubmitted = false;
  mailtoUrl = '';
  whatsappFallbackUrl = '';

  ngAfterViewInit(): void {
    const id = 'sk-instagram-widget-script';
    if (!document.getElementById(id)) {
      const script = document.createElement('script');
      script.id = id;
      script.src = 'https://widgets.sociablekit.com/instagram-feed/widget.js';
      script.defer = true;
      document.body.appendChild(script);
    }
  }

  contactForm = {
    fullName: '',
    phone: '',
    email: '',
    serviceInterest: '',
    message: '',
    website: '' // Honeypot anti-spam field
  };

  private readonly serviceLabels: Record<string, string> = {
    contabilidad: 'Servicios Contables Generales',
    declaracion: 'Declaraciones de Renta & ITBMS (DGI)',
    tramites: 'Aviso de Operación & Trámites Legales',
    laboral: 'Planillas y Gestión Laboral (SIPE / CSS)',
    digitales: 'Facturación Electrónica & Soporte e-Tax',
    otro: 'Asesoría Integral Personalizada'
  };

  submitConsultation(): void {
    // Ignore automated bot submissions that fill the hidden honeypot field
    if (this.contactForm.website.trim().length > 0) {
      return;
    }

    const fullName = this.sanitizeSingleLine(this.contactForm.fullName, 100);
    const phone = this.sanitizeSingleLine(this.contactForm.phone, 25);
    const email = this.sanitizeSingleLine(this.contactForm.email, 120);
    const serviceKey = this.sanitizeSingleLine(this.contactForm.serviceInterest, 40);
    const serviceLabel = this.serviceLabels[serviceKey] || 'Consulta General';
    const message = this.sanitizeMessage(this.contactForm.message, 1000);

    if (!fullName || !phone || !email) {
      return;
    }

    const subject = `Consulta Web - ${serviceLabel} (${fullName})`;
    const bodyLines = [
      `Nombre: ${fullName}`,
      `Teléfono / WhatsApp: ${phone}`,
      `Correo: ${email}`,
      `Servicio de interés: ${serviceLabel}`,
      '',
      'Detalle de la consulta:',
      message || '(Sin mensaje adicional)'
    ];
    const bodyText = bodyLines.join('\n');

    this.mailtoUrl = `mailto:barrioscontadores@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(bodyText)}`;
    this.whatsappFallbackUrl = `https://wa.me/50762272263?text=${encodeURIComponent(
      `Hola, soy ${fullName}. Me interesa: ${serviceLabel}. ${message ? 'Detalle: ' + message : ''} (Tel: ${phone}, Correo: ${email})`
    )}`;

    this.formSubmitted = true;
    this.contactForm = {
      fullName: '',
      phone: '',
      email: '',
      serviceInterest: '',
      message: '',
      website: ''
    };

    window.location.href = this.mailtoUrl;
  }

  private sanitizeSingleLine(value: string, maxLength: number): string {
    return value
      .replace(/[\r\n\t\x00-\x1F\x7F]/g, ' ')
      .replace(/\s+/g, ' ')
      .trim()
      .slice(0, maxLength);
  }

  private sanitizeMessage(value: string, maxLength: number): string {
    return value
      .replace(/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/g, '')
      .trim()
      .slice(0, maxLength);
  }
}
