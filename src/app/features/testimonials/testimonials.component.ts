// src/app/features/testimonials/testimonials.component.ts

import { Component, inject } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import { ContentService } from '../../core/services/content.service';

@Component({
  selector: 'app-testimonials',
  standalone: true,
  imports: [NgFor, NgIf],
  templateUrl: './testimonials.component.html',
  styleUrls: ['./testimonials.component.css'],
})
export class TestimonialsComponent {
  private cs = inject(ContentService);

  /**
   * Returns the testimonials array from content.json,
   * or an empty array if it's not loaded yet.
   */
  list = () => this.cs.content()?.testimonials ?? [];
}
