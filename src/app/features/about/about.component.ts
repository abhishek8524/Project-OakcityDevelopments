import { Component, inject } from '@angular/core';
import { NgIf } from '@angular/common';
import { ContentService } from '../../core/services/content.service';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [NgIf],
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent {
  private cs = inject(ContentService);
  vm = () => this.cs.content()?.about ?? null;
}
