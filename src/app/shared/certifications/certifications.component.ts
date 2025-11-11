import { Component, inject } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import { ContentService } from '../../core/services/content.service';

@Component({
  selector: 'app-certifications',
  standalone: true,
  imports: [NgFor, NgIf],
  templateUrl: './certifications.component.html',
  styleUrls: ['./certifications.component.css']
})
export class CertificationsComponent {
  private cs = inject(ContentService);
  list = () => this.cs.content()?.certifications ?? [];
}
