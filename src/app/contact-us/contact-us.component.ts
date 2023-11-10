import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { faFacebook, faInstagram, faTwitter, faWhatsapp,} from '@fortawesome/free-brands-svg-icons';
import { ContactUsService } from './contact-us.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.css'],
})
export class ContactUsComponent {
  contactusForm: FormGroup;
  fafacebook = faFacebook;
  fatwitter = faTwitter;
  fawhatsapp = faWhatsapp;
  fainstagram = faInstagram;
  successMessage: boolean = false;


  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router,
    private contactusservice: ContactUsService
  ) {
    this.contactusForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      message: ['', Validators.required],
    });
  }

  sendContactus(): void {
    if (this.contactusForm.valid) {
      const contactData = this.contactusForm.value;
      this.contactusservice.sendContactus(contactData).subscribe(
        () => {
          Swal.fire({
            icon: 'success',
            title: 'Thanks for contacting us!',
            text: 'You will be redirected to the home page shortly.',
          }).then((result) => {
            if (result.isConfirmed) {
              this.router.navigate(['/home']);
            }
          });
        },
        (err) => {
          console.error('Error sending Contactus:', err);
        }
      );
    }
  }
}
