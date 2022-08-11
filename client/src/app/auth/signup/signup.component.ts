import { Component, OnInit } from '@angular/core';
import { FormGroup,FormControl,Validator, Validators} from '@angular/forms';
import { MatchPassword } from '../validators/match-password';
import { UniqueUsername } from '../validators/unique-username';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  authForm = new FormGroup({
    username: new FormControl('',
    [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(20),
      Validators.pattern('^[a-z0-9]+$')
    ], this.uniqueUsername.validate),
    password: new FormControl('',
    [
      Validators.required,
      Validators.minLength(4),
      Validators.maxLength(20),
    ]),
    passwordConfirmation: new FormControl('', [
      Validators.required,
      Validators.minLength(4),
      Validators.maxLength(20),
    ])

  },
  {validators: [this.matchPassword.validate]}
  );
  constructor(
    private matchPassword:MatchPassword, 
    private uniqueUsername:UniqueUsername,
    private authService:AuthService,
    private router:Router
    ) {}

  ngOnInit(): void {
  }
  onSubmit(){
    if(this.authForm.invalid){
      return;
    }
    let credentials = {
      username: this.authForm.value.username,
      password: this.authForm.value.password,
      passwordConfirmation: this.authForm.value.passwordConfirmation
    }
    this.authService.signUp(credentials).subscribe({
      // Navigate to another route
      next:(response)=>{
        this.router.navigateByUrl('/home')
      },
      error:(error)=>{
       if(!error.status){
        this.authForm.setErrors({noConnection:true});
       }
       else{
        this.authForm.setErrors({unknownError:true});
       }
      }
    });
  }

}
