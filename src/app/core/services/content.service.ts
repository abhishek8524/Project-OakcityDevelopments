// src/app/core/services/content.service.ts

import { Injectable, computed, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SiteContent } from '../models/site-content';
import { catchError, of, switchMap } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class ContentService {
  private url =environment.url;
  

  /**
   * Private signal that holds the full content.json data.
   * Starts as null until the HTTP call finishes.
   */
  private readonly _content = signal<SiteContent | null>(null);

  /**
   * Public readonly computed signal exposed to components.
   * Components will use `content()` to get the latest data.
   */
  readonly content = computed(() => this._content());

  constructor(private http: HttpClient) {}

  /**
   * Loads `content.json` from:
   *  1. `/assets/content.json`  (Angular assets folder)
   *  2. If not found, falls back to `/content.json` in `public/`
   *
   * Once loaded, it updates the `_content` signal.
   */
  load() {
    // Try to load from assets folder
    const tryAssets = this.http.get<SiteContent>('assets/content.json').pipe(
      // If HTTP fails, convert error to `null` instead of throwing
      catchError(() => of(null as unknown as SiteContent))
    );

    // Fallback: try root path (public/content.json)
    const tryPublic = this.http.get<SiteContent>('/content.json').pipe(
      catchError(() => of(null as unknown as SiteContent))
    );

    // First attempt assets; if nav is missing, try public
    tryAssets
      .pipe(
        switchMap((a) => (a && a.nav ? of(a) : tryPublic))
      )
      .subscribe({
        next: (data) => {
          // If both URLs failed or content.json doesn't have nav, log an error
          if (!data || !data.nav) {
            console.error(
              '[ContentService] Could not load content.json from assets/ or public/.'
            );
            return;
          }

          // ✅ Successfully loaded: update our signal
          this._content.set(data);
        },
        error: (err) =>
          console.error('[ContentService] load failed (both paths)', err),
      });
  }
}
