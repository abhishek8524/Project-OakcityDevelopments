// src/app/features/contact/contact.component.ts

import { Component, inject, signal } from '@angular/core';
import { NgIf } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../enviroments/enviroments'; // your env file

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [ReactiveFormsModule, NgIf],
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css'],
})
export class ContactComponent {
  // Inject Angular services
  private fb = inject(FormBuilder);
  private http = inject(HttpClient);

  // ===== UI STATE (signals) =====
  sending = signal(false);             // true while request is in-flight
  done = signal(false);                // true after a successful send
  error = signal<string | null>(null); // error message if request fails
  msgCount = signal(0);                // character count for message textarea

  // ===== REACTIVE FORM DEFINITION =====
  // Non-nullable group: each control has a default value
  form = this.fb.nonNullable.group({
    name: ['', [Validators.required, Validators.minLength(2)]],
    email: ['', [Validators.required, Validators.email]],
    phone: [''],
    subject: ['quote', [Validators.required]],
    contactPreference: ['email', [Validators.required]],
    message: [
      '',
      [Validators.required, Validators.minLength(10), Validators.maxLength(1000)],
    ],
    website: [''], // honeypot field: should stay empty for real users
  });

  /**
   * Updates the message character counter based on current value length.
   * Called on (input) from the textarea.
   */
  updateCount() {
    this.msgCount.set(this.form.controls.message.value.length || 0);
  }

  /**
   * Handles form submission:
   * - Validates the form
   * - Checks honeypot
   * - Sends data to Formspree using HttpClient
   */
  async submit() {
    this.error.set(null);
    this.done.set(false);

    // If honeypot has value, it's likely a bot submission.
    if (this.form.controls.website.value) {
      this.error.set('Something went wrong. Please try again.');
      return;
    }

    // If form is invalid, mark all as touched to show errors.
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    // Endpoint from environment file (your Formspree form ID)
    const endpoint = `https://formspree.io/f/${environment.formspreeId}`;

    // Payload that will be sent to Formspree
    const payload = {
      name: this.form.value.name,
      email: this.form.value.email,
      phone: this.form.value.phone,
      subject: this.form.value.subject,
      contactPreference: this.form.value.contactPreference,
      message: this.form.value.message,
      _replyto: this.form.value.email,
      _subject: `[OakCity] ${this.form.value.subject} – ${this.form.value.name}`,
    };

    this.sending.set(true);

    try {
      await this.http
        .post(endpoint, payload, {
          headers: new HttpHeaders({ Accept: 'application/json' }),
        })
        .toPromise();

      // If request succeeds:
      this.done.set(true);
      this.form.reset({
        subject: 'quote',
        contactPreference: 'email',
        website: '',
      });
      this.msgCount.set(0);
    } catch {
      // If request fails:
      this.error.set('Could not send. Please try again.');
    } finally {
      this.sending.set(false);
    }
  }
}
