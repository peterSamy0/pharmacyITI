import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http'; // Import the HttpClient module for HTTP requests
import { faFacebook, faInstagram, faTwitter, faWhatsapp } from '@fortawesome/free-brands-svg-icons';

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.css']
})
export class ContactUsComponent {
  contactusForm: any;
  fafacebook = faFacebook
  fatwitter = faTwitter
  fawhatsapp = faWhatsapp
  fainstagram = faInstagram
  // ... Your other properties

  constructor(private fb: FormBuilder, private http: HttpClient) {
    this.contactusForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]], // Use Validators.email to validate email format
      message: ['', Validators.required],
    });
  }

  sendFeedback() {
    console.log(this.contactusForm);

    if (this.contactusForm.valid) {
      const name = this.contactusForm.get('name').value;
      const email = this.contactusForm.get('email').value;
      const message = this.contactusForm.get('message').value;

      // Create an object with the data to send to the server
      const newFeedback = {
        name: name,
        email: email,
        message: message,
      };

      // Use HttpClient to make an HTTP POST request to your server API
      this.http.post('your-server-api-endpoint', newFeedback).subscribe(
        (response) => {
          console.log('Feedback sent successfully');
          // You can handle the response from the server here
        },
        (error) => {
          console.error('Error sending feedback:', error);
        }
      );
    }
  }
}
