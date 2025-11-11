import { Component, inject, signal } from '@angular/core';
import { NgIf } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../enviroments/enviroments'; // ✅ corrected path

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [ReactiveFormsModule, NgIf],
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent {
  private fb = inject(FormBuilder);
  private http = inject(HttpClient); // ✅ for Formspree requests

  // UI state
  sending = signal(false);
  done = signal(false);
  error = signal<string | null>(null);
  msgCount = signal(0);

  // Form (includes honeypot "website")
  form = this.fb.nonNullable.group({
    name: ['', [Validators.required, Validators.minLength(2)]],
    email: ['', [Validators.required, Validators.email]],
    phone: [''],
    subject: ['quote', [Validators.required]],
    contactPreference: ['email', [Validators.required]],
    message: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(1000)]],
    website: [''] // honeypot
  });

  updateCount() {
    this.msgCount.set(this.form.controls.message.value.length || 0);
  }

  async submit() {
    this.error.set(null);
    this.done.set(false);

    // Honeypot trip (spam bots)
    if (this.form.controls.website.value) {
      this.error.set('Something went wrong. Please try again.');
      return;
    }

    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const endpoint = `https://formspree.io/f/${environment.formspreeId}`;
    const payload = {
      name: this.form.value.name,
      email: this.form.value.email,
      phone: this.form.value.phone,
      subject: this.form.value.subject,
      contactPreference: this.form.value.contactPreference,
      message: this.form.value.message,
      _replyto: this.form.value.email,
      _subject: `[OakCity] ${this.form.value.subject} – ${this.form.value.name}`
    };

    this.sending.set(true);
    try {
      await this.http.post(endpoint, payload, {
        headers: new HttpHeaders({ 'Accept': 'application/json' })
      }).toPromise();

      // Success
      this.done.set(true);
      this.form.reset({ subject: 'quote', contactPreference: 'email', website: '' });
      this.msgCount.set(0);
    } catch {
      this.error.set('Could not send. Please try again.');
    } finally {
      this.sending.set(false);
    }
  }
}
