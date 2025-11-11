import { Component, computed, inject, signal } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import { ContentService } from '../../core/services/content.service';

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [NgFor, NgIf],
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})
export class ProjectsComponent {
  private cs = inject(ContentService);

  // all projects from content
  projects = computed(() => this.cs.content()?.projects ?? []);

  // featured list (0..n)
  featured = computed(() => (this.projects() || []).filter(p => !!p.featured));

  // simple carousel state
  idx = signal(0);
  next() { if (this.featured().length) this.idx.set((this.idx()+1) % this.featured().length); }
  prev() { if (this.featured().length) this.idx.set((this.idx()-1+this.featured().length) % this.featured().length); }
}
