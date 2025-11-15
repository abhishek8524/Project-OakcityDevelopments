// src/app/features/ourservices/ourservices.component.ts

import { Component, inject } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import { ContentService } from '../../core/services/content.service';

@Component({
  selector: 'app-ourservices',
  standalone: true,
  imports: [NgFor, NgIf],
  templateUrl: './ourservices.component.html',
  styleUrls: ['./ourservices.component.css'],
})
export class OurServicesComponent {
  private cs = inject(ContentService);

  /**
   * Returns the services block from SiteContent, or null if not loaded yet.
   * Used in template as: *ngIf="services() as s"
   */
  services = () => this.cs.content()?.services ?? null;

  /**
   * Converts a title into a "slug" to match image filenames.
   * e.g., "Custom Homes & Renovations" -> "custom-homes-and-renovations"
   */
  private slugify(s: string): string {
    return (s || '')
      .toLowerCase()
      .replace(/&/g, 'and')
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
  }

  /**
   * Resolves logo path for service items.
   * - If item.image is provided, uses that file name.
   * - Otherwise, builds a slug from title and uses `${slug}.png`.
   */
  imgFor(item: { title: string; image?: string }): string {
    if (item?.image) return `assets/images/logo/${item.image}`;
    const slug = this.slugify(item?.title ?? 'logo');
    return `assets/images/logo/${slug}.png`; // adjust to .svg/.jpg if needed
  }

  /**
   * Resolves logo path for value props.
   * Very similar to imgFor() but separate in case you want different folder/file rules.
   */
  propImgFor(p: { title: string; image?: string }): string {
    if (p?.image) return `assets/images/logo/${p.image}`;
    const slug = this.slugify(p?.title ?? 'prop');
    return `assets/images/logo/${slug}.png`;
  }

  /**
   * Fallback when logo fails to load: swap to a generic fallback logo.
   */
  onImgError(ev: Event) {
    const el = ev.target as HTMLImageElement;
    el.src = 'assets/images/logo/fallback.png'; // make sure this file exists
    el.classList.add('fallback');
  }

  /**
   * Simple trackBy that uses the index.
   * Prevents Angular from recreating DOM elements unnecessarily.
   */
  trackByIndex = (_: number) => _;
}
