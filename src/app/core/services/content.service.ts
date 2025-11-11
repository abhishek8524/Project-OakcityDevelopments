import { Injectable, computed, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SiteContent } from '../models/site-content';
import { catchError, of, switchMap } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ContentService {
  private readonly _content = signal<SiteContent | null>(null);
  readonly content = computed(() => this._content());

  constructor(private http: HttpClient) {}

  // Tries /assets/content.json, then /content.json (public/)
  load() {
    const tryAssets = this.http.get<SiteContent>('assets/content.json').pipe(
      catchError(() => of(null as unknown as SiteContent))
    );
    const tryPublic = this.http.get<SiteContent>('/content.json').pipe(
      catchError(() => of(null as unknown as SiteContent))
    );

    tryAssets
      .pipe(
        switchMap((a) => (a && a.nav ? of(a) : tryPublic))
      )
      .subscribe({
        next: (data) => {
          if (!data || !data.nav) {
            console.error('[ContentService] Could not load content.json from assets/ or public/.');
            return;
          }
          this._content.set(data);
        },
        error: (err) => console.error('[ContentService] load failed (both paths)', err)
      });
  }
}
