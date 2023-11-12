import { Component, ElementRef, ViewChild } from '@angular/core';
import { CartService } from '../servic/cart.service';
import { CartItem } from 'src/app/interface/CartItem';
import { ApiService } from '../servic/api.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import Swal from 'sweetalert2';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ProfileService } from 'src/app/profile/services/profile.service';

@Component({
  selector: 'app-cartpage',
  templateUrl: './cartpage.component.html',
  styleUrls: ['./cartpage.component.css'],
})

export class CartpageComponent {
  cartItems: Array<any> = [];
  total: number = 0; // Initialize the total price to 0
  clientId!: Number;
  pharmacyId!: Number;
  dividedTotal: number = 0;
  isLogged: boolean = false;
  credentials: any;
  userNotFound: boolean = false;

  @ViewChild('paymentRef', { static: true }) paymentRef!: ElementRef;

  
  // array of orderMedications:
  orderMedications: Array<object> = [];
  amount: any;
  payment: any;
  signinForm!: FormGroup;
  // users: any;
  // signupForm!: FormGroup;
  // emailFail: boolean = false;
  // passFail: boolean = false;
  // userFullNameFail: boolean = false;
  // notAllDataEntered: boolean = false;
  // userGovernFail: boolean = false;
  // isCity: boolean = false;
  // governorateID!: number;
  // cities: any;
  // governorates: any;
  // cityID!: number;
  // errors:any ={};
  // days: any;
  // daysArr: any = [];
  // selectedDays: { id: string; day: string }[] = [];


  constructor(
    private cartService: CartService,
    private api: ApiService,
    private router: Router,
    private http: HttpClient,
    private profileService: ProfileService,
  ){
    this.signinForm = new FormGroup({
      userEmail: new FormControl('', [Validators.required]),
      userPass: new FormControl('', [Validators.required])
    });
  }

  ngOnInit(): void {
   
   this.getCartItems()
    // this.cartItems = this.cartService.getCartItems();
    this.calculateTotalPrice();
    this.isLogged = (localStorage.getItem('token')) ? true : false;
    // get authorization data from local storage and service
    if (
      localStorage.getItem('role') &&
      localStorage.getItem('role') == 'client'
    ) {
      this.pharmacyId = this.cartService.pharmacyId;
      this.clientId = Number(localStorage.getItem('_id'));
      console.log(this.clientId);
    }

    console.log(this.pharmacyId)
    window.paypal
      .Buttons({
        style: {
          layout: 'horizontal',
          color: 'blue',
          shape: 'rect',
          label: 'paypal',
        },
        createOrder: (data: any, actions: any) => {
          return actions.order.create({
            purchase_units: [
              {
                amount: {
                  value: this.dividedTotal.toFixed(2).toString(), // Assuming total is the correct amount
                  currency_code: 'EUR',
                },
              },
            ],
          });
        },
        onApprove: (data: any, actions: any) => {
          return actions.order.capture().then((details: any) => {
            // console.log(details);
            if (details.status === 'COMPLETED') {
              Swal.fire({
                icon: 'success',
                title: 'Your transaction is successful',
                text: 'Your transaction ID is: ' + details.id,
              });
        
              this.payment.transactionID = details.id;
              this.submitOrder();
              this.router.navigate(['home']);
            }
            // You can handle the successful payment here, e.g., call a function to submit the order
          });
        },
        onError: (error: any) => {
          console.log(error);
          // Handle errors, e.g., show an alert to the user
          Swal.fire({
            icon: 'error',
            title: 'Payment Error',
            text: 'There was an error processing your payment. Please try again.',
          });
        },
      })
      .render(this.paymentRef.nativeElement);
  }

  getCartItems(){
    const data = sessionStorage.getItem('cart');
    if(data){
      this.cartItems = JSON.parse(data)
    } 
  }

  decreaseQuantity(item: CartItem) {
    if (item.quantity > 1) {
      this.cartService.updateCartItemQuantity(item.id, item.quantity - 1);
    } else {
      console.log('not working');
    }
    this.calculateTotalPrice();
   this.getCartItems()

  }
  
  increaseQuantity(item: CartItem) {
    this.cartService.updateCartItemQuantity(item.id, item.quantity + 1);
    this.calculateTotalPrice();
   this.getCartItems()

  }
  
  removeFromCart(item: CartItem) {
    this.cartService.removeItemFromCart(item.id);
    this.calculateTotalPrice();
   this.getCartItems()

  }

  calculateTotalPrice() {
    this.total = this.cartItems.reduce(
      (acc: any, item: any) => acc + item.medicine_price * item.quantity,
      0
    );
    this.calculateDividedTotal()

  }
  calculateDividedTotal() {
    this.dividedTotal = this.total / 33;
  }

  pushMedication(mId: number, amount: number) {
    let obj = { key: mId, value: amount };
    this.orderMedications.push(obj);
  }

  submitOrder() {
    let data = {
      client_id: this.clientId,
      pharmacy_id: this.pharmacyId,
      ordMedications: this.orderMedications,
    };

    this.api.createResource(data).subscribe((Response) => {
      console.log(Response);
    });
  }

  order() {
    this.orderMedications = [];

    this.cartItems.forEach((medication) => {
      let medId = medication.id;
      let amount = medication.quantity;
      let obj = { key: medId, value: amount };
      this.orderMedications.push(obj);
    });

    if (this.cartItems.length > 0) {
      Swal.fire({
        icon: 'success',
        title: 'Thanks for your purchase!',
        text: 'The order will be delivered soon.',
      }).then((result) => {
        if (result.isConfirmed) {
          this.submitOrder();
          this.cartService.clearCart();
          this.router.navigate(['/home']);
        }
      });
    } else {
      Swal.fire({
        icon: 'warning',
        title: 'Your cart is empty.',
        text: 'Add items before placing an order.',
      });
    }
  }
  test(){
    console.log(this.pharmacyId);
  }

  checkUser() {
    let userEmail = this.signinForm.controls['userEmail'].value;
    let userPass = this.signinForm.controls['userPass'].value;
    this.credentials = {
      "email": userEmail,
      "password": userPass
    }
    this.logIn()
  }

  logIn(){
    this.http.post(`http://localhost:8000/api/auth/login`, this.credentials)
      .subscribe(
        (response: any) => {
          const role = response['role'];
          console.log(response)
          if (role) {
            localStorage.setItem('token', response['token']);
            localStorage.setItem('user_id', response['user_id']);
            localStorage.setItem('role', response['role']);
            localStorage.setItem('_id', response['_id']);
            window.location.href = '/cart';
          } else {
            Swal.fire({
              title: 'Error!',
              text: 'you are not a user',
              icon: 'error',
              confirmButtonText: 'Ok'
            })
          }
        },

        error => {
          console.log(error)
          Swal.fire({
            title: 'Error!',
            text: 'invaled email or password',
            icon: 'error',
            confirmButtonText: 'Ok'
          })
        }
      );
  }

  // addClient() {
  //   let userEmail = this.signupForm.controls['userEmail'].value;
  //   let userFullName = this.signupForm.controls['userFullName'].value;
  //   let userCity = this.signupForm.controls['userCity'].value;
  //   let userGovern = this.signupForm.controls['userGovern'].value;
  //   let userPhone = this.signupForm.controls['userPhone'].value;
  //   let userPass = this.signupForm.controls['userPass'].value;
  //   let emailPattern = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
  //   let fullNamePattern =
  //     /(^[A-Za-z]{3,16})([ ]{0,1})([A-Za-z]{3,16})?([ ]{0,1})?([A-Za-z]{3,16})?([ ]{0,1})?([A-Za-z]{3,16})/;
  //   let passPattern = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;

  //   console.log(this.signupForm)
  //   const body = {
  //     user: {
  //       "name": userFullName,
  //       "email": userEmail,
  //       "password": userPass,
  //     },
  //     client: {
  //       "governorate_id": this.governorateID,
  //       "city_id": this.cityID,
  //     },
  //     phone: [userPhone]
  //   };
 
  //   if (
  //     userEmail &&
  //     userFullName &&
  //     userGovern &&
  //     userCity &&
//       userPass
//     ) {    
//       this.userFullNameFail = false;
//       this.emailFail = false;
//       this.passFail = false;
//       this.userGovernFail = false;
      
//       const foundEmail = this.allClients.find(
//         (obj) => obj.client_email === userEmail
//       );
//       if (foundEmail) {
//         console.log(`'${userEmail}' is used in our DataBase`);
//         this.emailAlreadyUsed = true;
//       } else {
//         console.log(`'${userEmail}' is not used in our DataBase`);
//         this.emailAlreadyUsed = false;
//       }
//       if(!foundEmail){

//       this.http.post(`http://localhost:8000/api/clients`, body).subscribe(
//         (response:any) => {
//           localStorage.setItem('token', response['token']);
//           localStorage.setItem('role', response['role']);
//           localStorage.setItem('user_id', response['user_id']);
//           localStorage.setItem('_id', response['_id']);
//           window.location.href = '/cart';
//         },

//         (error) => {
//           Swal.fire({
//             title: 'Error!',
//             text: 'Check all fields',
//             icon: 'error',
//             confirmButtonText: 'Cool'
//           })
//         }
//       );
//       }
//     } else {
//       this.notAllDataEntered = true;
//       Swal.fire({
//         title: 'Error!',
//         text: 'All fields are required',
//         icon: 'error',
//         confirmButtonText: 'Cool'
//       })
//     }
//   }
//   getGovernorates() {
//     this.profileService.getGovernorates().subscribe(
//       (response: any) => {
//         this.governorates = response;
//         console.log(this.governorates);
//       },
//       (error) => console.log(error)
//     );
//   }

//   selectedGov(val: any) {
//     this.isCity = true;
//     this.governorateID = val;
//     console.log(this.governorateID);
//     this.profileService.selectedGov(val).subscribe(
//       (response: any) => {
//         this.cities = response.data;
//       },
//       (error) => console.log(error)
//     );
//   }

//   selectedCity(val: any) {
//     this.cityID = val;
//     console.log(this.cityID);
//   }

//   //checking if email or phone number were already used and added in the db
//   allClients!:Array<any>;
//   emailAlreadyUsed =false;
//   phoneAlreadyUsed = false;
//   getClients(){
//     this.profileService.getAllClients().subscribe((res:any)=>{
//       this.allClients = res.map((obj:any) => obj.data);
//       console.log(this.allClients)
//     })
//   }

//   getDays() {
//     this.http.get(`http://localhost:8000/api/days`).subscribe(
//       (response) => {
//         this.days = response;
//       },
//       (error) => console.log(error)
//     );
//   } 
//   chooseDay(val: any) {
//     const selectedDay = this.days.data.find((day: any) => day.id == val);
//     const isExists = this.daysArr.includes(+val);
//     if (!isExists && selectedDay) {
//       this.selectedDays.push(selectedDay);
//       this.daysArr.push(+val);
//     }
//   }
//   removeDay(val: any) {
//     this.selectedDays = this.selectedDays.filter((item) => item.id != val);
//     this.daysArr = this.daysArr.filter((item: any) => item.id != val);
//   }
// }
}
