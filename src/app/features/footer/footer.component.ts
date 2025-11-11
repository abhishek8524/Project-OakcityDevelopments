import { Component, inject } from '@angular/core';
import { NgFor, NgIf, NgClass } from '@angular/common';
import { ContentService } from '../../core/services/content.service';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [NgFor, NgIf, NgClass],
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent {
  readonly year = new Date().getFullYear();
  private cs = inject(ContentService);

  socials = () => this.cs.content()?.socials ?? [];
  info = () => this.cs.content()?.contact ?? null;

  scrollTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  // Returns Font Awesome classes
  getFaIcon(name: string): string {
    switch ((name || '').toLowerCase()) {
      case 'facebook':  return 'fa-brands fa-facebook-f';
      case 'instagram': return 'fa-brands fa-instagram';
      case 'tiktok':    return 'fa-brands fa-tiktok';
      case 'email':     return 'fa-solid fa-envelope';
      case 'phone':     return 'fa-solid fa-phone';
      case 'linkedin':  return 'fa-brands fa-linkedin-in';
      case 'youtube':   return 'fa-brands fa-youtube';
      default:          return 'fa-solid fa-globe';
    }
  }
}
