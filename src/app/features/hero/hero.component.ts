import { Component, inject } from '@angular/core';
import { NgOptimizedImage, NgIf } from '@angular/common'; // ✅ added NgIf import
import { ContentService } from '../../core/services/content.service';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [NgOptimizedImage, NgIf], // ✅ added NgIf here
  templateUrl: './hero.component.html',
  styleUrls: ['./hero.component.css']
})
export class HeroComponent {
  private cs = inject(ContentService);
  vm = () => this.cs.content()?.hero ?? null;
}
