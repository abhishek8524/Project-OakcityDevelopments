import { Component, inject } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import { ContentService } from '../../core/services/content.service';

@Component({
  selector: 'app-testimonials',
  standalone: true,
  imports: [NgFor, NgIf],
  templateUrl: './testimonials.component.html',
  styleUrls: ['./testimonials.component.css']
})
export class TestimonialsComponent {
  private cs = inject(ContentService);
  list = () => this.cs.content()?.testimonials ?? [];
}
