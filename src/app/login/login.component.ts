import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators,FormControl,AbstractControl} from '@angular/forms';
import {RegisterService} from '../service/register.service';
import {AuthenticationService} from '../service/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [RegisterService, AuthenticationService]  
})
export class LoginComponent implements OnInit {
  registrationForm: FormGroup;
  loginForm: FormGroup;
  formData:any;
  emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  flag :boolean = false;

  constructor(private fb: FormBuilder,private registerService: RegisterService, private authService: AuthenticationService, private router: Router) { }

  ngOnInit() { 
    this.loginForm = this.fb.group({
      custPassword: ['', Validators.required],
      custUserId: ['', Validators.required],
      //checkBoxValue: [false, Validators.pattern('true')],
    });

    this.registrationForm = this.fb.group({
      custFirstName: ['', [Validators.required, Validators.pattern(/^([a-zA-Z]+[,.]?[0-9]?[ ]?|[a-zA-Z]+['-]?)+$/)]],
      custLastName: ['', [Validators.required, Validators.pattern(/^[a-zA-Z '.-]*$/)]],
      custPhoneNum:['', [Validators.required,Validators.minLength(14)]],      
      passwords: this.fb.group({
      password:['', [Validators.required,Validators.pattern(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/)]],
      confirmPassword:['']
      },{validator: this.checkPasswords}),
      custEmailAddr: ['', [Validators.required,Validators.pattern(this.emailRegex)],[this.emailExisteValidation.bind(this)]]
    });
    
  }

  checkPasswords(c: AbstractControl): { MatchPassword: boolean } {
    console.log("checkPasswords()"+c.get('password').value);
      if (c.get('password').value !== c.get('confirmPassword').value) {
          return {MatchPassword: true};
      }
  }
  emailExisteValidation(fieldControl: AbstractControl){
    return new Promise ((resolve, reject) => {
                     this.registerService.checkEmail(fieldControl.value).subscribe(
                         (res: any) => {
                           if(res.text() == 'true'){
                            resolve({'emailExistant': true});
                           }else{
                              resolve(null);
                           }
                         },
                         err => { console.log(err) }
                     )
                 }
             );
    }

    gotoPasswordRecoveryPage= function () {
      this.router.navigateByUrl('/password-recovery');
    };

    loginCheck(){
      if(!this.loginForm.invalid){
         //this.loadingService.display(true);
        this.authService.login(this.loginForm.get('custUserId').value, this.loginForm.get('custPassword').value).subscribe(
        res =>{
          //this.loadingService.display(false);
          if(!res){
            this.flag= true;
          }
          this.router.navigate(['/home']);
        },error => {
          //this.loadingService.display(false);
          this.flag= true;
          this.router.navigate(['/home']);
          //this.toasterService.pop((error.status == 200) ? 'success':'error',error._body);
        })
       }
     }


    sendRegistrationForm(){
      if(this.registrationForm.valid){
     //  this.loaderService.display(true);
       var obj ={
        custFirstName: this.registrationForm.get('custFirstName').value ,
        custLastName: this.registrationForm.get('custLastName').value  ,        
        custPhoneNum:(this.registrationForm.get('custPhoneNum').value).replace(/[()\s-_]/g, ""),
        passwords: this.registrationForm.get('passwords').value,
        custEmailAddr: this.registrationForm.get('custEmailAddr').value
       }
        this.registerService.addRegistrationFormDetails(obj).subscribe(
        response =>{
      //  this.loaderService.display(false);
        console.log("Registration status :: "+response.text());
      //  this.toasterService.pop((response.status == 200) ? 'success':'error',response.text());
        this.ngOnInit();
        },
        error => {
       // this.loaderService.display(false);
        console.log("Error"+error);
     //   this.toasterService.pop('error',error._body);
        }
      );
      }
    }


}
