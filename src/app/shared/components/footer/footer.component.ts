import { Component, HostListener } from '@angular/core';
import { faFacebook } from '@fortawesome/free-brands-svg-icons';
import { faTwitter } from '@fortawesome/free-brands-svg-icons';
import { faLinkedin } from '@fortawesome/free-brands-svg-icons';
import { faInstagram } from '@fortawesome/free-brands-svg-icons';
import { faAngleUp } from '@fortawesome/free-solid-svg-icons';


@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent {
  fafacebook = faFacebook
  fatwitter = faTwitter
  falinkedin = faLinkedin
  fainstagram = faInstagram
  faAngleUp = faAngleUp;

  scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  // Optional: You can also add a scroll event listener to show/hide the button dynamically.
  @HostListener('window:scroll', ['$event'])
  onWindowScroll() {
    const scrollY = window.scrollY;
    const backToTopButton = document.querySelector('.back-to-top');

    if (backToTopButton) {
      if (scrollY > 300) {
        backToTopButton.classList.add('show');
      } else {
        backToTopButton.classList.remove('show');
      }
    }
  }
}
