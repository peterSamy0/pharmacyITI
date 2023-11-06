import { Component } from '@angular/core';
import { faFacebook, faInstagram, faTwitter, faWhatsapp } from '@fortawesome/free-brands-svg-icons';

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.css']
})
export class ContactUsComponent {
  fafacebook = faFacebook
  fatwitter = faTwitter
  fawhatsapp = faWhatsapp
  fainstagram = faInstagram

}
