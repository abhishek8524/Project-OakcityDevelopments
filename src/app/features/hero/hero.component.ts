// src/app/features/hero/hero.component.ts

import { Component, inject } from '@angular/core';
import { NgOptimizedImage, NgIf } from '@angular/common';
import { ContentService } from '../../core/services/content.service';

@Component({
  selector: 'app-hero',
  standalone: true,
  // We import:
  // - NgOptimizedImage for [ngSrc] and image optimization
  // - NgIf to use *ngIf in the template
  imports: [NgOptimizedImage, NgIf],
  templateUrl: './hero.component.html',
  styleUrls: ['./hero.component.css'],
})
export class HeroComponent {

  // Inject the ContentService (provides data from content.json)
  private cs = inject(ContentService);

  /**
   * View model helper for the template.
   * Returns the hero section data from the SiteContent,
   * or null if content is not yet loaded.
   *
   * Used in the template as:
   *   *ngIf="vm()"
   *   vm()!.image / vm()!.title / vm()!.subtitle
   */
  vm = () => this.cs.content()?.hero ?? null;
}
