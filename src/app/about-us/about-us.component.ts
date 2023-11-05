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
      image:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRGQ6U069ab415EnAww4pNKZaG8lfGKAb6r1677sNerE3FTxEc3olNK2j945GfOnuR8VQU&usqp=CAU'
    },
    {
      id: 2,
      name: 'nehal saeed',
      gender: 'female',
      email: 'nehal@gmail.com',
      phone: '01234567890',
      city: 'New Beni-suef',
      image:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRL7kJnRQt30xNQ8zuOtmVdWh5QK9AZfx3WMR4r7iS2GLNhLeZPrD89K1UqTbJ1kSX3lws&usqp=CAU'
    },
    {
      id: 3,
      name: 'peter saeed',
      gender: 'male',
      email: 'peter@gmail.com',
      phone: '01234567890',
      city: 'New Beni-suef',
      image:'https://png.pngtree.com/png-vector/20190723/ourmid/pngtree-flat-profile-icon--vector-png-image_1583357.jpg'

    },
    {
      id: 4,
      name: 'husain saeed',
      gender: 'male',
      email: 'husain@gmail.com',
      phone: '01234567890',
      city: 'New Beni-suef',
      image:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQMqld_iJlscdWZ7mXFbyLoak9ov8fuIhgrPyH_VzM86YPTxeCsMKuuch4RcPdLjfIqM3A&usqp=CAU'

    },
    {
      id: 5,
      name: 'mhmd saeed',
      gender: 'male',
      email: 'mhmd@gmail.com',
      phone: '01234567890',
      city: 'New Beni-suef',
      image:'https://png.pngtree.com/png-clipart/20191122/original/pngtree-user-vector-icon-with-white-background-png-image_5168884.jpg'

    }
  ];
}
