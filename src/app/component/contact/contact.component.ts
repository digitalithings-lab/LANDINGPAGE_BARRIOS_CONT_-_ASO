import { Component } from '@angular/core';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html'
})
export class ContactComponent {
  formSubmitted = false;

  contactForm = {
    fullName: '',
    phone: '',
    email: '',
    serviceInterest: '',
    message: ''
  };

  submitConsultation(): void {
    this.formSubmitted = true;
    this.contactForm = {
      fullName: '',
      phone: '',
      email: '',
      serviceInterest: '',
      message: ''
    };
  }
}
