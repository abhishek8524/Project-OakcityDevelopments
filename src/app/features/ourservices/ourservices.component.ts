import { Component, inject } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import { ContentService } from '../../core/services/content.service';

@Component({
  selector: 'app-ourservices',
  standalone: true,
  imports: [NgFor, NgIf],
  templateUrl: './ourservices.component.html',
  styleUrls: ['./ourservices.component.css']
})
export class OurServicesComponent {
  private cs = inject(ContentService);
  services = () => this.cs.content()?.services ?? null;

  // Build a safe slug from a title (e.g., "Custom Homes" -> "custom-homes")
  private slugify(s: string): string {
    return (s || '')
      .toLowerCase()
      .replace(/&/g, 'and')
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
  }

  // Resolve a service card image path
  imgFor(item: { title: string; image?: string }): string {
    if (item?.image) return `assets/images/logo/${item.image}`;
    const slug = this.slugify(item?.title ?? 'logo');
    return `assets/images/logo/${slug}.png`;     // or .svg/.jpg if your files use those
  }

  // Resolve a value-prop image path
  propImgFor(p: { title: string; image?: string }): string {
    if (p?.image) return `assets/images/logo/${p.image}`;
    const slug = this.slugify(p?.title ?? 'prop');
    return `assets/images/logo/${slug}.png`;
  }

  // Optional: fallback symbol if image fails to load
  onImgError(ev: Event) {
    const el = ev.target as HTMLImageElement;
    el.src = 'assets/images/logo/fallback.png'; // add a small neutral fallback logo
    el.classList.add('fallback');
  }

  trackByIndex = (_: number) => _;
}
