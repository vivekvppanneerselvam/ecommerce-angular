import { Component, OnInit, AfterViewInit, ElementRef, Inject, HostListener, ViewChild } from '@angular/core';
import {FormBuilder, FormGroup, Validators,FormControl,AbstractControl} from '@angular/forms';
import { DOCUMENT } from '@angular/platform-browser';
import { ShareDataService } from '../service/share-data.service';
import { IStoreProduct } from '../interfaces/storeproduct';
declare var jquery: any;
declare var $: any;

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent {
  addressFlg: boolean = true;
  paymentFlg: boolean = false;
  shippingFlg: boolean = false;
  reviewFlg: boolean = false;
  orderConfirmFlg: boolean = false;
  addToCartItems: IStoreProduct[] = [];
  subTotal: number = 0;
  cartItem = 1;
  activeIndex: number = 2;
  captchaCd: any;
  captcha:any;
  //Card section 
  svgname: string;
  svgnumber: string;
  svgnameback:string;
  svgsecurity:String;
  svgexpire:string;
  flip:boolean = false;
  cardPaymentForm: FormGroup;
  paypalPaymentForm: FormGroup;
  codPaymentForm:FormGroup;
  //DeliveryAddressSection
  viewAddressInputSec:boolean=false;
  _show_address_icon:boolean=false;
  _show_shipping_icon:boolean=false;
  _show_review_icon:boolean=false;


  @ViewChild('canvasEl') canvasEl: ElementRef;  
  /** Canvas 2d context */
  private context: CanvasRenderingContext2D; 
  
  constructor(private fb: FormBuilder, private shareDataService: ShareDataService, private elementRef: ElementRef, @Inject(DOCUMENT) private document: Document) { }

 

  ngOnInit() {
    this.toggleCheckout('address');
    this.shareDataService.addToCartItems.asObservable().subscribe((data) => {
      this.addToCartItems = data;
      this.subTotal = 0;
      for (var i = 0; i < this.addToCartItems.length; i++) {
        this.subTotal = this.subTotal + this.addToCartItems[i].productPrice;
      }
    });
    this.createCaptcha();

    this.cardPaymentForm = this.fb.group({
      cardName: ['', [Validators.required, Validators.pattern(/^([a-zA-Z]+[,.]?[0-9]?[ ]?|[a-zA-Z]+['-]?)+$/)]],
      cardExpDt: ['', [Validators.required]],
      cardNum:['', [Validators.required,Validators.minLength(16)]],
      cardCVV:['', [Validators.required,Validators.minLength(3)]]
    })


  }

  toggleCheckout(value) {
    this.addressFlg = false;
    this.paymentFlg = false;
    this.shippingFlg = false;
    this.reviewFlg = false;
    if (value === "address") {
      this.addressFlg = true;
      this.checkoutCompletionHighLights();
    } else if (value === 'shipping') {
      this.shippingFlg = true;
      this.checkoutCompletionHighLights();
    } else if (value === 'payment') {
      this.paymentFlg = true;
      this.checkoutCompletionHighLights();
    } else {
      this.reviewFlg = true;
      this.checkoutCompletionHighLights();
    }
  }

  _keyPress(event: any) {
    const pattern = /[1-9\+\ ]/;
    let inputChar = String.fromCharCode(event.charCode);
    if (!pattern.test(inputChar)) {
      // invalid character, prevent input
      event.preventDefault();
    }
  }


  //On Focus Events
  ngAfterViewInit() {    
    this.createCaptcha();
  }

  handleChange(evt) {
    var target = evt.target;
    if (target.checked && target.value === "_card") {
      this.activeIndex = 0;
    } else if (target.checked && target.value === "_paypal") {
      this.activeIndex = 1;
    } else {
      this.activeIndex = 2;
    }
  }


  createCaptcha() {
    //$('#InvalidCapthcaError').hide();
    var alpha = new Array('A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', '0', '1', '2', '3', '4', '5', '6', '7', '8', '9');
    var i;
    for (i = 0; i < 6; i++) {
      var a = alpha[Math.floor(Math.random() * alpha.length)];
      var b = alpha[Math.floor(Math.random() * alpha.length)];
      var c = alpha[Math.floor(Math.random() * alpha.length)];
      var d = alpha[Math.floor(Math.random() * alpha.length)];
      var e = alpha[Math.floor(Math.random() * alpha.length)];
      var f = alpha[Math.floor(Math.random() * alpha.length)];
    }
    this.captchaCd = a + ' ' + b + ' ' + c + ' ' + d + ' ' + e + ' ' + f;
    console.log(this.captchaCd);
    //$('#CaptchaImageCode').empty().append('<canvas id="CapCode" class="capcode" width="300" height="80"></canvas>')
    this.context = (this.canvasEl.nativeElement as HTMLCanvasElement).getContext('2d'); 
    var cw = (this.canvasEl.nativeElement as HTMLCanvasElement).width / 2
    var width = (this.canvasEl.nativeElement as HTMLCanvasElement).width;
    var height = (this.canvasEl.nativeElement as HTMLCanvasElement).height;
    this.draw(this.captchaCd, cw, width, height);  
    
  }
  
  private draw(text: any, cw: any, width, height) {
    let image = new Image();
    image.src = "https://pixelsharing.files.wordpress.com/2010/11/salvage-tileable-and-seamless-pattern.jpg";  
    this.context.drawImage(image, 0,0);    
    let pattern = this.context.createPattern(image, "repeat");
    this.context.fillStyle = pattern;
    this.context.fillRect(0, 0, width, height);  
    this.context.font = "46px Roboto Slab";
    this.context.fillStyle = '#cccc';     
    this.context.setTransform(1, -0.12, 0, 1, 0, 15);    
    this.context.fillText(text,cw, 55);
    this.context.textAlign = 'center';
  }

  //Mask the Credit Card Number Input
  cardnumber_mask={
  mask: [
      {
          mask: '0000 000000 00000',
          regex: '^3[47]\\d{0,13}',
          cardtype: 'american express'
      },
      {
          mask: '0000 0000 0000 0000',
          regex: '^(?:6011|65\\d{0,2}|64[4-9]\\d?)\\d{0,12}',
          cardtype: 'discover'
      },
      {
          mask: '0000 000000 0000',
          regex: '^3(?:0([0-5]|9)|[689]\\d?)\\d{0,11}',
          cardtype: 'diners'
      },
      {
          mask: '0000 0000 0000 0000',
          regex: '^(5[1-5]\\d{0,2}|22[2-9]\\d{0,1}|2[3-7]\\d{0,2})\\d{0,12}',
          cardtype: 'mastercard'
      },     
      {
          mask: '0000 000000 00000',
          regex: '^(?:2131|1800)\\d{0,11}',
          cardtype: 'jcb15'
      },
      {
          mask: '0000 0000 0000 0000',
          regex: '^(?:35\\d{0,2})\\d{0,12}',
          cardtype: 'jcb'
      },
      {
          mask: '0000 0000 0000 0000',
          regex: '^(?:5[0678]\\d{0,2}|6304|67\\d{0,2})\\d{0,12}',
          cardtype: 'maestro'
      },
      {
          mask: '0000 0000 0000 0000',
          regex: '^4\\d{0,15}',
          cardtype: 'visa'
      },
      {
          mask: '0000 0000 0000 0000',
          regex: '^62\\d{0,14}',
          cardtype: 'unionpay'
      },
      {
          mask: '0000 0000 0000 0000',
          cardtype: 'Unknown'
      }
  ],
  dispatch: function (appended, dynamicMasked) {
      var number = (dynamicMasked.value + appended).replace(/\D/g, '');

      for (var i = 0; i < dynamicMasked.compiledMasks.length; i++) {
          let re = new RegExp(dynamicMasked.compiledMasks[i].regex);
          if (number.match(re) != null) {
              return dynamicMasked.compiledMasks[i];
          }
      }
  }
}



//define the color swap function
// cswapColor(basecolor) {
//   this.document.querySelectorAll('.lightcolor')
//       .forEach(function (input) {
//           input.setAttribute('class', '');
//           input.setAttribute('class', 'lightcolor ' + basecolor);
//       });
//   this.document.querySelectorAll('.darkcolor')
//       .forEach(function (input) {
//           input.setAttribute('class', '');
//           input.setAttribute('class', 'darkcolor ' + basecolor + 'dark');
//       });
// };


//pop in the appropriate card icon when detected
// cardnumber_mask.on("accept", function () {
// console.log(cardnumber_mask.masked.currentMask.cardtype);
// switch (cardnumber_mask.masked.currentMask.cardtype) {
//     case 'american express':
//         ccicon.innerHTML = amex;
//         ccsingle.innerHTML = amex_single;
//         swapColor('green');
//         break;
//     case 'visa':
//         ccicon.innerHTML = visa;
//         ccsingle.innerHTML = visa_single;
//         swapColor('lime');
//         break;
//     case 'diners':
//         ccicon.innerHTML = diners;
//         ccsingle.innerHTML = diners_single;
//         swapColor('orange');
//         break;
//     case 'discover':
//         ccicon.innerHTML = discover;
//         ccsingle.innerHTML = discover_single;
//         swapColor('purple');
//         break;
//     case ('jcb' || 'jcb15'):
//         ccicon.innerHTML = jcb;
//         ccsingle.innerHTML = jcb_single;
//         swapColor('red');
//         break;
//     case 'maestro':
//         ccicon.innerHTML = maestro;
//         ccsingle.innerHTML = maestro_single;
//         swapColor('yellow');
//         break;
//     case 'mastercard':
//         ccicon.innerHTML = mastercard;
//         ccsingle.innerHTML = mastercard_single;
//         swapColor('lightblue');

//         break;
//     case 'unionpay':
//         ccicon.innerHTML = unionpay;
//         ccsingle.innerHTML = unionpay_single;
//         swapColor('cyan');
//         break;
//     default:
//         ccicon.innerHTML = '';
//         ccsingle.innerHTML = '';
//         swapColor('grey');
//         break;
// }

// });

// CREDIT CARD IMAGE JS

//On Input Change Events
onChangeCardName(){
  if (this.cardPaymentForm.get('cardName').value.length == 0) {
      this.svgname = 'John Doe';
      this.svgnameback = 'John Doe';
  } else {
      this.svgname = this.cardPaymentForm.get('cardName').value;
      this.svgnameback = this.cardPaymentForm.get('cardName').value;
  }
}

onChangeCardNum(){
  if (this.cardPaymentForm.get('cardNum').value.length == 0) {
      this.svgnumber = '0123 4567 8910 1112';
  } else {
    this.svgnumber = this.cardPaymentForm.get('cardNum').value;
  }
}

onChangeCardExpDt(){
  if (this.cardPaymentForm.get('cardExpDt').value.length == 0) {
      this.svgexpire = '01/23';
  } else {
    this.svgexpire = this.cardPaymentForm.get('cardExpDt').value;
  }
}

onChangeCardCVV(){
  if (this.cardPaymentForm.get('cardCVV').value.length == 0) {
      this.svgsecurity = '985';
  } else {
    this.svgsecurity = this.cardPaymentForm.get('cardCVV').value;
  }
}

//On Focus Events
onFocusOutCardFlipped(){
  this.flip = false;
}
onFocusCardFlipped(){
  this.flip = true;
}
onClickCardFlip(){
  this.flip = ! this.flip;
}

onCheckoutNext(){
  if(this.addressFlg){
    this.toggleCheckout('shipping');
  }else if(this.shippingFlg){
    this.toggleCheckout('review');
  }else if(this.reviewFlg){
    this.toggleCheckout('payment');
  }
}

onCheckoutPrev(){
  if(this.paymentFlg){
    this.toggleCheckout('review');
  }else if(this.reviewFlg){
    this.toggleCheckout('shipping');
  }else if(this.shippingFlg){
    this.toggleCheckout('address');
  }
}

checkoutCompletionHighLights(){
  this._show_address_icon=false;
  this._show_shipping_icon=false;
  this._show_review_icon=false;
  if(this.shippingFlg){
    this._show_address_icon = true;
  }else if(this.reviewFlg){
    this._show_address_icon = true;
    this._show_shipping_icon = true;
  }else if(this.paymentFlg){
    this._show_address_icon = true;
    this._show_shipping_icon = true;
    this._show_review_icon = true;   
  }
}

submit(){
  alert("");
  if(this.captcha === this.captchaCd){
    this.orderConfirmFlg = true;

  }
}
  
}



