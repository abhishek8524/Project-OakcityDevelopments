// src/app/features/about/about.component.ts

import { Component, inject } from '@angular/core';
import { NgIf } from '@angular/common';
import { ContentService } from '../../core/services/content.service';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [NgIf],
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css'],
})
export class AboutComponent {
  // Inject ContentService to read About section data from content.json
  private cs = inject(ContentService);

  /**
   * View model for the template.
   * Returns `SiteContent.about` or null if not loaded yet.
   * Used with *ngIf="vm() as x" in the template.
   */
  vm = () => this.cs.content()?.about ?? null;
}
