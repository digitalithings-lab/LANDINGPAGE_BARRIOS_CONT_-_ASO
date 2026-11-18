import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './component/header/header.component';
import { HeroComponent } from './component/hero/hero.component';
import { AboutTestimonialsComponent } from './component/about-testimonials/about-testimonials.component';
import { ServicesComponent } from './component/servicios/services.component';
import { ContactComponent } from './component/contact/contact.component';
import { CtaBannerComponent } from './component/cta-banner/cta-banner.component';
import { FloatingActionsComponent } from './component/floating-actions/floating-actions.component';
import { FooterComponent } from './component/footer/footer.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HeroComponent,
    AboutTestimonialsComponent,
    ServicesComponent,
    ContactComponent,
    CtaBannerComponent,
    FloatingActionsComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
