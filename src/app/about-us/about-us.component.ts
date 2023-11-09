import { Component } from '@angular/core';

@Component({
  selector: 'app-about-us',
  templateUrl: './about-us.component.html',
  styleUrls: ['./about-us.component.css'],
})
export class AboutUsComponent {
  users: any = [
    {
      id: 1,
      name: 'fadia saeed',
      gender: 'female',
      email: 'fadia@gmail.com',
      phone: '01234567890',
      city: 'New Beni-suef',
      image:'https://www.pngall.com/wp-content/uploads/5/Profile-Female-PNG-Image.png'
    },
    {
      id: 2,
      name: 'nehal saeed',
      gender: 'female',
      email: 'nehal@gmail.com',
      phone: '01234567890',
      city: 'New Beni-suef',
      image:'https://www.pngall.com/wp-content/uploads/5/User-Profile.png'
    },
    {
      id: 3,
      name: 'peter saeed',
      gender: 'male',
      email: 'peter@gmail.com',
      phone: '01234567890',
      city: 'New Beni-suef',
      image:'https://www.pngall.com/wp-content/uploads/5/Profile-Male-PNG-Free-Download.png'

    },
    {
      id: 4,
      name: 'husain saeed',
      gender: 'male',
      email: 'husain@gmail.com',
      phone: '01234567890',
      city: 'New Beni-suef',
      image:'https://www.pngall.com/wp-content/uploads/5/Profile-Transparent.png'

    },
    {
      id: 5,
      name: 'mhmd saeed',
      gender: 'male',
      email: 'mhmd@gmail.com',
      phone: '01234567890',
      city: 'New Beni-suef',
      image:'https://www.pngall.com/wp-content/uploads/5/Profile-Male-PNG.png'

    }
  ];
}
