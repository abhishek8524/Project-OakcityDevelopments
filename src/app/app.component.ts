// src/app/app.component.ts
import { Component, OnInit, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './features/header/header.component';
import { HeroComponent } from './features/hero/hero.component';
import { OurServicesComponent } from './features/ourservices/ourservices.component';
import { ContentService } from './core/services/content.service';
import { AboutComponent } from './features/about/about.component';
import { ProjectsComponent } from './features/projects/projects.component';
import { TestimonialsComponent } from './features/testimonials/testimonials.component';
import { ContactComponent } from './features/contact/contact.component';
import { FooterComponent } from './features/footer/footer.component';
import { CertificationsComponent } from './shared/certifications/certifications.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, HeroComponent, OurServicesComponent,AboutComponent,ProjectsComponent,TestimonialsComponent,ContactComponent, FooterComponent,CertificationsComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  private content = inject(ContentService);
  ngOnInit(){ this.content.load(); }
}
