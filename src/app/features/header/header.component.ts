import { Component, inject } from '@angular/core';
import { NgIf } from '@angular/common';
import { ContentService } from '../../core/services/content.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [NgIf],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  content = inject(ContentService);

  hasSocials(): boolean {
    return !!this.content.content()?.socials?.length;
  }

  getSocialUrl(name: 'instagram' | 'tiktok' | 'facebook'): string | null {
    const list = this.content.content()?.socials;
    if (!list) return null;
    const hit = list.find(s => s.name === name);
    return hit ? hit.url : null;
  }
}
