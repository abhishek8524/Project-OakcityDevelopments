// src/app/app.component.ts

import { Component, OnInit, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';

// Feature components (standalone)
import { HeaderComponent } from './features/header/header.component';
import { HeroComponent } from './features/hero/hero.component';
import { OurServicesComponent } from './features/ourservices/ourservices.component';
import { AboutComponent } from './features/about/about.component';
import { ProjectsComponent } from './features/projects/projects.component';
import { TestimonialsComponent } from './features/testimonials/testimonials.component';
import { ContactComponent } from './features/contact/contact.component';
import { FooterComponent } from './features/footer/footer.component';
import { CertificationsComponent } from './shared/certifications/certifications.component';

// Service that loads site content from JSON
import { ContentService } from './core/services/content.service';

@Component({
  selector: 'app-root',
  standalone: true,
  // All sections imported as standalone components
  imports: [
    RouterOutlet,
    HeaderComponent,
    HeroComponent,
    CertificationsComponent,
    OurServicesComponent,
    AboutComponent,
    ProjectsComponent,
    TestimonialsComponent,
    ContactComponent,
    FooterComponent,
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {

  // Using inject() (Angular 16+ style) instead of constructor injection
  private content = inject(ContentService);

  /**
   * When the root component is initialized,
   * we trigger the loading of content.json.
   */
  ngOnInit() {
    this.content.load();
  }
}
