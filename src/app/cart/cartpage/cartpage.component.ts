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
  orderid:any;
  ordernumber:any;

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
    this.getorder()
    this.getCartItems();
    this.calculateTotalPrice();
    this.isLogged = (localStorage.getItem('token')) ? true : false;
    // get authorization data from local storage and service
    sessionStorage.setItem('cart', JSON.stringify(this.cartItems));

    if (
      localStorage.getItem('role') &&
      localStorage.getItem('role') == 'client'
    ) {
      this.pharmacyId = this.cartService.pharmacyId;
      this.clientId = Number(localStorage.getItem('_id'));
    }

    // window.paypal
    //   .Buttons({
    //     style: {
    //       layout: 'horizontal',
    //       color: 'blue',
    //       shape: 'rect',
    //       label: 'paypal',
    //     },
    //     createOrder: (data: any, actions: any) => {
    //       return actions.order.create({
    //         purchase_units: [
    //           {
    //             amount: {
    //               value: this.dividedTotal.toFixed(2).toString(), // Assuming total is the correct amount
    //               currency_code: 'EUR',
    //             },
    //           },
    //         ],
    //       });
    //     },
    //     onApprove: (data: any, actions: any) => {
    //       return actions.order.capture().then((details: any) => {
    //         // console.log(details);
    //         if (details.status === 'COMPLETED') {
    //           Swal.fire({
    //             icon: 'success',
    //             title: 'Your transaction is successful',
    //             text: 'Your transaction ID is: ' + details.id,
    //           });
        
    //           this.payment.transactionID = details.id;
    //           this.submitOrder();
    //           this.router.navigate(['home']);
    //         }
    //         // You can handle the successful payment here, e.g., call a function to submit the order
    //       });
    //     },
    //     onError: (error: any) => {
    //       console.log(error);
    //       // Handle errors, e.g., show an alert to the user
    //       Swal.fire({
    //         icon: 'error',
    //         title: 'Payment Error',
    //         text: 'There was an error processing your payment. Please try again.',
    //       });
    //     },
    //   })
    //   .render(this.paymentRef.nativeElement);
  }

  getCartItems() {
    // Retrieve cart items from service and update local property
    this.cartItems = this.cartService.getCartItems() || [];

    // Optional: Save the updated cart items in sessionStorage
    sessionStorage.setItem('cart', JSON.stringify(this.cartItems));
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
    // Update local property directly
    this.cartItems = this.cartService.getCartItems() || [];
    this.calculateTotalPrice();
    this.cartService.removeItemFromCart(item.id);
    // Save the updated cart items in sessionStorage
    sessionStorage.setItem('cart', JSON.stringify(this.cartItems));
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
    this.orderid=this.ordernumber.length+1
    let data = {
        client_id: this.clientId,
        pharmacy_id: this.pharmacyId,
        ordMedications: this.orderMedications,
        totalPrice: this.total,
        orderid:this.orderid

    };

    this.api.createResource(data).subscribe(
        (response: any) => {
            console.log(response);
            if (response && response.order_id) {
                // Capture the order ID from the API response
                const orderId = response.order_id;
                console.log('Order ID:', orderId);

                // Include orderId in the data for additional processing
                const extendedData = {
                    ...data,
                    orderId: orderId,
                };

                // Log data to console
                console.log('Received data:', extendedData);

                // Store order ID and total price in session flash data
                sessionStorage.setItem('order_id', orderId);
                sessionStorage.setItem('total_price', this.total.toString());

                // Do additional processing or navigate to a success page with extendedData
                // this.router.navigate(['/order-success', extendedData]);
            }
            sessionStorage.removeItem('cart');
        },
        (error: any) => {
            console.error(error);
            // Handle error, show an alert, or navigate to an error page
        }
    );
}

orderpaid() {
  this.orderMedications = [];

  this.cartItems.forEach((medication) => {
    let medId = medication.id;
    let amount = medication.quantity;
    let obj = { key: medId, value: amount };
    this.orderMedications.push(obj);
  });

  if (this.cartItems.length > 0) {
    Swal.fire({
      icon: 'warning',
      title: 'You will redirect to Payment page!',
      text: 'Thanks for your purchase',
      showCancelButton: true,
      confirmButtonText: 'Go to Payment',
      cancelButtonText: 'Continue Shopping',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        this.submitOrderPaid();
        this.cartService.clearCart();
        // this.router.navigate(['/home']);
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

submitOrderPaid() {
  this.orderid=this.ordernumber.length+1
  let data = {
      client_id: this.clientId,
      pharmacy_id: this.pharmacyId,
      ordMedications: this.orderMedications,
      totalPrice: this.dividedTotal,
      orderid:this.orderid

  };

  this.api.createResource(data).subscribe(
      (response: any) => {
          console.log(response);
          if (response && response.orderid) {
              // Capture the order ID from the API response
              const orderId = response.orderid;
              console.log('Order ID:', orderId);
              window.location.href='http://localhost:8000/stripe/'+orderId

              // Include orderId in the data for additional processing
              const extendedData = {
                  ...data,
                  orderId: orderId,
              };

              // Log data to console
              console.log('Received data:', extendedData);

              // Store order ID and total price in session flash data
              sessionStorage.setItem('order_id', orderId);
              sessionStorage.setItem('total_price', this.dividedTotal.toString());

              // Do additional processing or navigate to a success page with extendedData
              // this.router.navigate(['/order-success', extendedData]);
          }
          sessionStorage.removeItem('cart');
      },
      (error: any) => {
          console.error(error);
          // Handle error, show an alert, or navigate to an error page
      }
  );
}

  getorder(){
    this.http.get('http://localhost:8000/api/orders').subscribe(res=>{
      this.ordernumber=res
      console.log(this.ordernumber.length)
    
    })
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
  // test(){
  //   console.log(this.pharmacyId);
  // }

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

  
}
