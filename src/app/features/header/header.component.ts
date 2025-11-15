// src/app/features/header/header.component.ts

import { Component, inject } from '@angular/core';
import { NgIf } from '@angular/common';
import { ContentService } from '../../core/services/content.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [NgIf],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
  /**
   * We inject ContentService and call it `content`.
   * In the template we use:
   *   content.content()?.contact?.phone
   * to build the tel: link for "CALL NOW" button.
   */
  content = inject(ContentService);

  /**
   * Returns true if socials are defined in content.json.
   * (You can use this later if you want to show header social icons.)
   */
  hasSocials(): boolean {
    return !!this.content.content()?.socials?.length;
  }

  /**
   * Helper to get URL of a specific social network from content.json.
   * Not used in the current header template, but ready for future icons.
   */
  getSocialUrl(
    name: 'instagram' | 'tiktok' | 'facebook'
  ): string | null {
    const list = this.content.content()?.socials;
    if (!list) return null;
    const hit = list.find((s) => s.name === name);
    return hit ? hit.url : null;
  }
}
