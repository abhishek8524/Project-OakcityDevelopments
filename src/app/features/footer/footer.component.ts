// src/app/features/footer/footer.component.ts

import { Component, inject } from '@angular/core';
import { NgFor, NgIf, NgClass } from '@angular/common';
import { ContentService } from '../../core/services/content.service';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [NgFor, NgIf, NgClass],
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css'],
})
export class FooterComponent {
  /** Current year for the copyright line. */
  readonly year = new Date().getFullYear();

  /** Inject ContentService to read contact + socials from content.json. */
  private cs = inject(ContentService);

  /** Returns the socials array (or empty array if undefined). */
  socials = () => this.cs.content()?.socials ?? [];

  /** Returns the contact info object (or null if not loaded yet). */
  info = () => this.cs.content()?.contact ?? null;

  /** Scrolls smoothly back to the top of the page. */
  scrollTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  /**
   * Maps a logical social name (instagram, facebook, etc.)
   * to Font Awesome icon classes for <i> elements.
   */
  getFaIcon(name: string): string {
    switch ((name || '').toLowerCase()) {
      case 'facebook':
        return 'fa-brands fa-facebook-f';
      case 'instagram':
        return 'fa-brands fa-instagram';
      case 'tiktok':
        return 'fa-brands fa-tiktok';
      case 'email':
        return 'fa-solid fa-envelope';
      case 'phone':
        return 'fa-solid fa-phone';
      case 'linkedin':
        return 'fa-brands fa-linkedin-in';
      case 'youtube':
        return 'fa-brands fa-youtube';
      default:
        return 'fa-solid fa-globe';
    }
  }
}
