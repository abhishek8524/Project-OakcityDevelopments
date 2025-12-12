// src/app/features/projects/projects.component.ts

import { Component, computed, inject, signal } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import { ContentService } from '../../core/services/content.service';

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [NgFor, NgIf],
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css'],
})
export class ProjectsComponent {
  private cs = inject(ContentService);

  /** All projects from content.json (empty array if not yet loaded). */
  projects = computed<any[]>(() => this.cs.content()?.projects ?? []);

  /**
   * Only projects where `featured: true`.
   * Used for the top carousel section.
   */
  featured = computed(() =>
    this.projects().filter((p) => !!p.featured)
  );

  /** Residential projects (segment === 'residential'). */
  residentialProjects = computed(() =>
    this.projects().filter((p) => p.segment === 'residential')
  );

  /** Commercial projects (segment === 'commercial'). */
  commercialProjects = computed(() =>
    this.projects().filter((p) => p.segment === 'commercial')
  );

  /** Carousel index for featured array. */
  idx = signal(0);

  /** Move to next featured project. */
  next() {
    const n = this.featured().length;
    if (n) {
      this.idx.set((this.idx() + 1) % n);
    }
  }

  /** Move to previous featured project. */
  prev() {
    const n = this.featured().length;
    if (n) {
      this.idx.set((this.idx() - 1 + n) % n);
    }
  }
}
