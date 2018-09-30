import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators,FormControl,AbstractControl} from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  registrationForm: FormGroup;
  formData:any;
  emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  constructor() { }

  ngOnInit() { 
    this.registrationForm = this.fb.group({
      firstName: ['', [Validators.required, Validators.pattern(/^([a-zA-Z]+[,.]?[0-9]?[ ]?|[a-zA-Z]+['-]?)+$/)]],
      lastName: ['', [Validators.required, Validators.pattern(/^[a-zA-Z '.-]*$/)]],
      companyName:['', [Validators.required]],
      phoneNumber:['', [Validators.required,Validators.minLength(14)]],      
      passwords: this.fb.group({
      password:['', [Validators.required,Validators.pattern(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/)]],
      confirmPassword:['']
      },{validator: this.checkPasswords}),
      email: ['', [Validators.required,Validators.pattern(this.emailRegex)],[this.emailExisteValidation.bind(this)]]
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


}
